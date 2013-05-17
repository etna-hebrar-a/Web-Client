function getAddressListTorrent() {
  return './list_torrent.json';
}

function listTorrentCtrl($scope, $http) {
    $scope.downloads = getDownloads();
    angular.forEach($scope.downloads, function(download) {
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

    });

  function getDownloads() {
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
  }

  $scope.orderId = 'id_dl';
  $scope.custumFilter = function(download) {
   return download.status == 'pause';
 }
}