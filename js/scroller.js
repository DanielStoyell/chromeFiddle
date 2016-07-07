var intervalID = -1;
var speed = 0;
var endConfig = "Continue";

function updatePopup(){
  var started = (intervalID != -1);
  chrome.runtime.sendMessage({"speed":speed, "endConfig":endConfig, "started":started});
}

function stop(){
  clearInterval(intervalID);
  intervalID = -1;
}

function scroll(num){
  var delay;
  var pixels;
  var direction;

  stop();
  if(num === 0){
    pixels = 0;
    delay = 1;
  }
  else{
    direction = num < 0 ? -1 : 1;
    num = Math.abs(num);
    // Yay for magic numbers!
    //Small delays can't achieve needed speeds, so slowly increase the pixel skips
    //This is kept as small as possible for smooth scrolling
    pixels = Math.ceil(num/(31-num));
    //Equation that marks an intuitive speed change per step
    delay = Math.round((300-(num*10))/num);
  }
  intervalID = setInterval(function(){
    window.scrollBy(0,direction*pixels);
    if((window.innerHeight + window.scrollY >= document.body.scrollHeight || window.scrollY === 0) && speed !== 0){
      switch(endConfig){
        case "Bounce":
          stop();
          speed = -speed;
          scroll(speed);
          updatePopup();
          break;
        case "Continue":
          break;
        case "Stop":
          stop();
          updatePopup();
          break;
        case "Wrap":
          if(window.scrollY === 0){
            window.scrollTo(0,document.body.scrollHeight - window.innerHeight);
          }
          else{
            window.scrollTo(0,0);
          }
          break;
      }
    }
  }, delay);
}

chrome.extension.onMessage.addListener(function(info, sender, sendResponse){
  switch (info.type) {
    case "startup":
      var started = (intervalID != -1);
      sendResponse({"speed":speed, "started":started, "endConfig":endConfig});
      break;
    case "scroll":
      speed = info.speed;
      info.action == "start" ? scroll(speed) : stop();
      break;
    case "endConfig":
      endConfig = info.config;
      break;
    default:
      console.log("This should never happen");
  }
});