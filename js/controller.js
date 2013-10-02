var listTorrentCtrl = function($scope, $http, Base64) {
  $scope.downloads = [];
  $http(getAddressListTorrent()).
  success(function(data){
  $scope.toto = 'succes';
    $scope.downloads = abstractionDownloads(data);
    angular.forEach($scope.downloads, function(download) {
      //calcul pourcentage et status bar
      download.bar = (download.size_dl / download.size_tot) * 100
      if (download.bar == 100) {
        download.bar_type = 'bar-success';
        if(download.status == 'send') 
          download.bar_status = 'progress-striped active';
      }
      else if (download.status == 'pause') {
        download.bar_type = 'bar-warning ';
        download.bar_status = 'progress-striped'
      }
      else if(download.status == 'stop')
        download.bar_type = 'bar-danger';
      else
        download.bar_status = 'progress-striped active';
      // convertion unite en patant du principe que l'unité de base est le Ko
      download.size_tot = conversOctet(download.size_tot);
      download.size_dl = conversOctet(download.size_dl);
      download.collapse = true;
    });
  }).
  error(function() {
    $scope.toto = 'error';
  });

    $scope.collapse = function(downloads, id) {
        angular.forEach(downloads, function(download) {
          download.collapse = ((download.id_dl != id) ? true : download.collapse);
        });
    }
    $scope.orders = [
      {name: 'date d\'ajout' , value:'date_ajout'},
      {name: 'progression' , value: 'bar'},
      {name: "vitesse de téléchargement" , value: 'speed'}
      ];
    $scope.order = $scope.orders[0];
    $scope.desc = false;
    $scope.pair = ['pair', 'impair'];
    $scope.test = 'all';
    $scope.start = function(id) {
      $http({
	methode: get,
	url: 'http://eip.pnode.fr:8000/torrents/'+id+'/start',
      }).
      succes().
      error();
    };
    $scope.stop = function(id) {
      $http({
	methode: get,
	url: 'http://eip.pnode.fr:8000/torrents/'+id+'/stop',
      }).
      succes().
      error();
    };
    $scope.delete = function(id) {
      $http({
	methode: DELETE,
	url: 'http://eip.pnode.fr:8000/torrents/'+id,
      }).
      succes().
      error();
    };
    
    
}

var ajoutTelechargementCtrl = function ($scope) {

  $scope.alerts = [];

  $scope.open = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.close = function () {
    $scope.shouldBeOpen = false;
  };

  $scope.send = function () {
    $scope.alerts.push({type: 'success', msg: 'Telechargement envoyer'});
    $scope.shouldBeOpen = false;
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.addlTorrent = function(urlt) {
    $http(
      {
        methode: 'POST',
        url: 'http://eip.pnode.fr:8000/torrents',
     }, url);
    $scope.close();
  }
  $scope.items = ['item1', 'item2'];

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

};

var adminDeamonCtrl = function($scope, $http) {
  $http.get(getAddressAdmin()).success(function(data){
    $scope.data = abstractionAdmin(data)
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

var loginCtrl = function($scope,$http,$location,Base64) {
  $scope.connect = function() {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.login + ':' + $scope.pwd);
    $http({
        method: 'GET',
        url: 'http://eip.pnode.fr:8000/torrents',
      })
      .success(function(){
        $location.path('/downloads');
      })
      .error(function() {
        $scope.error = 'erreur d\'identification';
        $scope.login = '';
        $scope.pwd = '';
      });
  }
}

angular
.module('ClientWeb.controllers', [])
.controller('listTorrentCtrl', ['$scope', '$http', 'Base64', listTorrentCtrl])
.controller('ajoutTelechargementCtrl', ['$scope',ajoutTelechargementCtrl])
.controller('ConfigCtrl', ['$scope', '$http', adminDeamonCtrl])
