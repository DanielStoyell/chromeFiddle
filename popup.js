console.log("popup js executing");

function queryActive(msg) {
  chrome.tabs.query({active: true}, function(tabs){
    var id = tabs[0].id;
    chrome.tabs.sendMessage(id, msg);
  });
}

var app = angular.module('scroll', []);
app.controller('ScrollController', function($scope) {
    $scope.speed = 0;

    $scope.startScroll = function(){
      queryActive({"speed":$scope.speed, "action":"start"});
    };

    $scope.stopScroll = function() {
      queryActive({"speed":$scope.speed, "action":"stop"});
    };
});