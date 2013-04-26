function Ctrl2 ($scope) {
	$scope.nbTorrent = 2;

	$scope.torrents = [
		{ text:'Torrent 1'},
		{ text:'Torrent 2'}
	];



	$scope.addTorrent = function () {
		$scope.torrents.push({text:'Torrent'});
	}
}