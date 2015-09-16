(function(){
  var directives = angular.module('playerDirectives', []);

  directives.directive('player', ['Player', '$routeParams', '$location', function(Player){
    return{
      templateUrl: "views/players/_player.html",
      link: function($scope){
        var player = $scope.player
        $scope.eFG = (((Number(player.threePtMade) * 0.5  + Number(player.fgm))/ Number(player.fga)) * 100).toFixed(1);
        $scope.TSA =  (0.44 * Number(player.FTA)) + Number(player.fga)
        $scope.TS = ((Number(player.pts)/(2 * $scope.TSA)) * 100).toFixed(1)
      }
    };
  }

]);

})();
