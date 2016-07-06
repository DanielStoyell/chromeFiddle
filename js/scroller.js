var intervalID = -1;
var speed = 0;

function stop(){
  clearInterval(intervalID);
  intervalID = -1;
}

function scroll(num){
  stop();
  if(num === 0){
    pixels = 0;
    delay = 1;
  }
  else{
    // Yay for magic numbers!
    //Small delays can't achieve needed speeds, so slowly increase the pixel skips
    //This is kept as small as possible for smooth scrolling
    var pixels = Math.ceil(num/(31-num));
    //Equation that marks an intuitive speed change per step
    var delay = Math.round((300-(num*10))/num);
  }
  intervalID = setInterval(function(){window.scrollBy(0,pixels);}, delay);
}

chrome.extension.onMessage.addListener(function(info, sender, sendResponse){
  if(info.type == "startup"){
    var started = (intervalID != -1);
    sendResponse({"speed":speed, "started":started});
  }
  else{
    speed = info.speed;
    if(info.action == "start"){
      scroll(speed);
    }
    else{
      stop();
    }
  }
});