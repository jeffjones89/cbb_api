(function(){
  var statsServices = angular.module('statsServices', ['ngResource']);
  statsServices.factory('Player', ['$resource', function($resource){
    return $resource('/api/players/:id', {
      update: {method: 'PUT'}
    });

  }]);

})();
