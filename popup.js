function queryActive(msg) {
  chrome.tabs.query({active: true}, function(tabs){
    var id = tabs[0].id;
    chrome.tabs.sendMessage(id, msg);
  });
}

var app = angular.module('scroll', []);
app.controller('ScrollController', function($scope) {
    $scope.speed = 0;
    $scope.started = false;

    $scope.scroll = function(state){
      if(state){
        queryActive({"speed":$scope.speed, "action":"start"});
      }
      else{
        queryActive({"speed":$scope.speed, "action":"stop"});
      }

      $scope.started = state;
    };
});