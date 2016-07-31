function sendActive(msg) {
  chrome.tabs.query({active: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

var app = angular.module('scroll', []);
app.controller('ScrollController', function($scope) {
  $scope.speed = 0;
  $scope.started = false;
  $scope.endConfig = "Continue";

  //Get currently active scroll
  chrome.tabs.query({active: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {"type":"startup"}, function(info){
      $scope.speed = info.speed;
      $scope.started = info.started;
      $scope.endConfig = info.endConfig;
      $scope.shortcuts = info.shortcut;
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

  $scope.toggleShortcuts = function () {
    sendActive({"type":"shortcut", "config":$scope.shortcuts});
  };

  $scope.selectEndConfig = function(){
    sendActive({"type":"endConfig", "config":$scope.endConfig});
  };

  chrome.runtime.onMessage.addListener(function(info, sender){
    $scope.speed = info.speed;
    $scope.endConfig = info.endConfig;
    $scope.started = info.started;
    $scope.$apply();
  });
});