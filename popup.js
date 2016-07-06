console.log("popup js executing");

var app = angular.module('scroll', []);
app.controller('ScrollController', function($scope) {
    $scope.speed = 0;

    $scope.startScroll = function(){
      console.log("Scrolling!");
      chrome.tabs.query({active: true}, function(tabs){
        var id = tabs[0].id;
        chrome.tabs.sendMessage(id, $scope.speed, function(msg){
          console.log(msg);
        });
      });
    };
});