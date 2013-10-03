var listTorrentCtrl = function($scope, $http, Base64, $location) {
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.alerts.push({msg: 'Telechargement en cours de recuperation...'});
  $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('shunt' + ':' + 'secret');
  $scope.downloads = [];
  $http(getAddressListTorrent()).
  success(function(data){
  $scope.alerts.push({type: 'success', msg: 'succes'});
    $scope.downloads = abstractionDownloads(data);
    angular.forEach($scope.downloads, function(download) {
      //calcul pourcentage et status bar
      download.bar = (download.size_dl / download.size_tot) * 100
      download.bar = download.bar.toFixed(2);
      if (download.bar == 100) {
        download.bar_type = 'bar-success';
        if(download.status == 'DOWNLOAD') 
          download.bar_status = 'progress-striped active';
      }
      else if (download.status == 'DOWNLOAD') {
        download.bar_status = 'progress-striped active';
      }
      else if (download.status == 'pause') {
        download.bar_type = 'bar-warning ';
        download.bar_status = 'progress-striped'
      }
      else
        download.bar_type = 'bar-danger';
      /*else
        download.bar_status = 'progress-striped active';*/
      // convertion unite en patant du principe que l'unité de base est le Ko
      download.size_tot = conversOctet(download.size_tot);
      download.size_dl = conversOctet(download.size_dl);
      download.speed = conversOctet(download.speed) + '/s';
      download.added_date = Date(download.added_date).toString("dd/mm/yy");
      download.collapse = true;
    });
  }).
  error(function() {
    $scope.alerts.push({type: 'error', msg: 'error'});
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
	method: 'GET',
	url: 'http://eip.pnode.fr:8000/torrents/'+id+'/start',
      }).
      succes().
      error();
    };
    $scope.stop = function(id) {
      $http({
	method: 'GET',
	url: 'http://eip.pnode.fr:8000/torrents/'+id+'/stop',
      }).
      succes().
      error();
    };
    $scope.delete = function(id) {
      $http({
	method: 'DELETE',
	url: 'http://eip.pnode.fr:8000/torrents/'+id,
      }).
      succes().
      error();
    };
    
  $scope.addTorrent = function(urlt) {
    $http(
      {
        method: 'POST',
        url: 'http://eip.pnode.fr:8000/torrents',
        torrent: urlt
     });
        $location.path('/downloads');
  }
}

var ajoutTelechargementCtrl = function($scope, $http, Base64) {

  

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
    document.getElementById('connect').style.display = 'none';
    document.getElementById('throbber').style.display = 'inline';
    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.login + ':' + $scope.pwd);
    $http({
        method: 'GET',
        url: 'http://eip.pnode.fr:8000/torrents',
      })
      .success(function(){
        $location.path('/downloads');
      })
      .error(function() {
        document.getElementById('connect').style.display = 'inline';
        document.getElementById('throbber').style.display = 'none';
        $scope.error = 'erreur d\'autentification';
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
