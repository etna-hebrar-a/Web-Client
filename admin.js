angular.module('ClientWeb', ['ui.bootstrap']);
function getAddressAdmin() {
  return './admin.json';
}

function abstraction(data) {
  myTab = new Object();
  myTab.ip = data.ip;
  myTab.users = data.users;
  return myTab;
}

function adminCtrl($scope, $http) {
  $http.get(getAddressAdmin()).success(function(data){
    $scope.admin = data.ip;
    
  });
}