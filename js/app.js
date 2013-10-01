angular.module('ClientWeb',['ui.bootstrap', 'ClientWeb.controllers', 'ClientWeb.service'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'login.html',controller: loginCtrl}).
      when('/downloads', {templateUrl: 'download.html', controller: listTorrentCtrl}).
      when('/admin', {templateUrl: 'admin.html', controller: adminDeamonCtrl}).
      otherwise({redirectTo: '/downloads'});
}]);