function sendActive(msg) {
  chrome.tabs.query({active: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

var app = angular.module('scroll', []);
app.controller('ScrollController', function($scope) {
    $scope.speed = 0;
    $scope.started = false;

    //Get currently active scroll
    chrome.tabs.query({active: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"type":"startup"}, function(response){
        $scope.speed = response.speed;
        $scope.started = response.started;
        $scope.$apply();
      });
    });

    $scope.scroll = function(state){
      if(state){
        sendActive({"type":"scroll", "speed":$scope.speed, "action":"start"});
      }
      else{
        sendActive({"type":"scroll", "speed":$scope.speed, "action":"stop"});
      }

      $scope.started = state;
    };
});