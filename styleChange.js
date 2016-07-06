console.log("Content script executing");

//Whatever code you put here is run at the current page

function scroll(speed){
    setInterval(function(){window.scrollBy(0,1);}, 30-(speed*3));
}

console.log(chrome);

chrome.extension.onMessage.addListener(function(speed, sender){
  console.log("Message received! Starting the scroll");
  scroll(speed);
});