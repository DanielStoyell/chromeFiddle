var intervalID = -1;
var speed = 0;

function stop(){
  clearInterval(intervalID);
  intervalID = -1;
}

function scroll(speed){
  stop();
  intervalID = setInterval(function(){window.scrollBy(0,speed);}, 100-(speed*10));
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