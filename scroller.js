var intervalID;

function stop(){
  clearInterval(intervalID);
}

function scroll(speed){
  stop();
  intervalID = setInterval(function(){window.scrollBy(0,speed);}, 100-(speed*10));
}

chrome.extension.onMessage.addListener(function(info, sender){
  if(info.action == "start"){
    scroll(info.speed);
  }
  else{
    stop();
  }
});