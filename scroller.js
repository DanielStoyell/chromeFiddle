console.log("Content script executing");

//Whatever code you put here is run at the current page

var intervalID;

function stop(){
  clearInterval(intervalID);
}

function scroll(speed){
  stop();
  intervalID = setInterval(function(){window.scrollBy(0,speed);}, 100-(speed*10));
}

console.log(chrome);

chrome.extension.onMessage.addListener(function(info, sender){
  console.log("Message received!");
  if(info.action == "start"){
    scroll(info.speed);
  }
  else{
    stop();
  }
});