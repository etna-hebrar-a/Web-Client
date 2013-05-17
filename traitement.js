$scope.filtre = null;
function getAddressListTorrent() {
  return './list_torrent.json';
}

function listTorrentCtrl($scope, $http) {
  $http.get(getAddressListTorrent()).success(function(data) {
    $scope.downloads = data;
    angular.forEach($scope.downloads, function(download) {
      download.bar = (download.size_dl / download.size_tot) * 100
    })
  });

  $scope.orderId = 'id_dl';
  $scope.custumFilter = function(download) {
   return download.status == 'pause';
 }
}