function getAddressListTorrent() {
  return './list_torrent.json';
}

function abstraction(data) {
  myTab = new Array();
  var i = 0;
  angular.forEach(data, function(d){
    myTab[i] = new Object();
    myTab[i].id_dl = d.id;
    myTab[i].status = d.status;
    myTab[i].name = d.name;
    myTab[i].size_tot = d.size_tot;
    myTab[i].size_dl = d.size_dl;
    myTab[i].speed = d.speed;
    myTab[i].date_ajout = d.date_ajout;
    ++i;
  });
  return myTab;
}

function conversOctet(size) {
  if (size < 1024) return size + 'Ko';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'Mo';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'Go';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'To';
}


function listTorrentCtrl($scope, $http) {
  $http.get(getAddressListTorrent()).success(function(data){
    $scope.downloads = abstraction(data);
    angular.forEach($scope.downloads, function(download) {
      //calcul pourcentage et status bar
      download.bar = (download.size_dl / download.size_tot) * 100
      if (download.bar == 100) {
        download.bar_type = 'bar-success';
        if(download.status == 'send') 
          download.bar_status == 'progress-striped active';
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
    });
  });

  /*  function getDownloads() {
      myTab = new Array();
      $http.get(getAddressListTorrent()).success(function(data){
      var i = 0;
      angular.forEach(data, function(d){
      myTab[i] = new Object();
      myTab[i].id_dl = d.id_dl;
      myTab[i].status = d.status;
      myTab[i].name = d.name;
      myTab[i].size_tot = d.size_tot;
      myTab[i].size_dl = d.size_dl;
      myTab[i].speed = d.speed;
      myTab[i].date_ajout = d.date_ajout;
      })
      })
      return myTab;
    }*/

    $scope.orders = [
      {name: 'id' , value:'id_dl'},
      {name: 'date d\'ajout' , value:'date_ajout'},
      {name: 'progression' , value: 'bar'}
      ];
    $scope.order = $scope.orders[0];
    $scope.custumFilter = function(download) {
      return download.status == 'pause';
    }
  }
