angular.module('ClientWeb', ['ui.bootstrap']);
function getAddressAdmin() {
  return './admin.json';
}

function abstraction(data) {
  myTab = new Object();
  myTab.ip = data[0].ip;
  myTab.users = data[0].users;
  return myTab;
}

function adminDeamonCtrl($scope, $http) {
  $http.get(getAddressAdmin()).success(function(data){
    $scope.donnee = abstraction(data)
  })
  .error(function(data){
    $scope.ip = 'error';
  });
  $scope.addUser = '';
  $scope.add = function() {
    $scope.donnee.users.push($scope.addUser);
    $scope.addUser = '';
  };
}