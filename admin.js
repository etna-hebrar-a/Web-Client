angular.module('ClientWeb', ['ui.bootstrap']);
function getAddressAdmin() {
  return './admin.json';
}

Array.prototype.unset = function(val){
    var index = this.indexOf(val)
    if(index > -1){
        this.splice(index,1)
    }
}

function abstraction(data) {
  myTab = new Object();
  myTab.ip = data[0].ip;
  myTab.users = data[0].users;
  return myTab;
}

function adminDeamonCtrl($scope, $http) {
  $http.get(getAddressAdmin()).success(function(data){
    $scope.data = abstraction(data)
  })
  .error(function(data){
    $scope.ip = 'error';
  });
  $scope.addUser = '';
  $scope.add = function() {
    $scope.data.users.push($scope.addUser.name);
    $scope.addUser.name = '';
    $scope.addUser.mdp = '';
    //voir avec Nicolas pour l'ahout d'utilisateur
  };
  
  $scope.suppr = function(user) {
    $scope.data.users.unset(user);
    //voir avec nicolas pour la suppression d'utilisateur
  };
  
  $scope.change_mdp = function(user) {
    prompt('Tapez le nouveau mot de passe pour' + user,'Mot de passe');
    //Voir avec nicolas pour les changements de mots de passe
  };
}