(function(){
  var router = angular.module('statsRouter', []);
    router.config([
      '$routeProvider',
      function($routeProvider){
      $routeProvider.when("/players", {
        templateUrl: 'views/players/index.html',
        controller: 'statsController',
        controllerAs: 'statsCtrl'
      });
    }
  ]);
})();
