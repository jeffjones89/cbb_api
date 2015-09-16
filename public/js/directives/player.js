(function(){
  var directives = angular.module('playerDirectives', []);

  directives.directive('player', ['Player', '$routeParams', '$location', function(Player){
    return{
      templateUrl: "views/players/_player.html",
      replace: true,
      link: function($scope){
        var player = $scope.player
        //effective field goal % is a function of three pointers made weighted for the additional point, two pointers made and total field goals attempted
        $scope.eFG = (((Number(player.threePtMade) * 0.5  + Number(player.fgm))/ Number(player.fga)) * 100).toFixed(1);
        //true shooting attempts is a metric used to calculate true shooting %
        $scope.TSA =  (0.44 * Number(player.fta)) + Number(player.fga)
        //true shooting % is a function of total point scored and true shooting attempts
        $scope.TS = ((Number(player.pts)/(2 * $scope.TSA)) * 100).toFixed(1)
      }
    };
  }

]);

})();
