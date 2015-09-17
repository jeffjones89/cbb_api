(function(){
  var directives = angular.module('playerDirectives', []);
  directives.directive('player', ['Player', '$routeParams', '$location', function(Player, $routeParams, $location){
    return{
      templateUrl: "views/players/_player.html",
      replace: true,
      link: function(scope, element, attributes){
        // add player for show view
        if($routeParams.id){
          Player.get({id:$routeParams.id}).$promise.then(function(player){
            scope.player = player;
            updateStats(scope);
          });
        } else {
          // index
          updateStats(scope);

        }
        console.log(scope)
        var d3Data = [ scope.TS, scope.eFG, scope.player.pts,scope.player.fga, scope.player.threePtMade, scope.player.eFG ];
        d3.select(element[0].querySelector(".graph")).selectAll('div').data(d3Data).enter().append("div").
                              style("width", function(d){
                                return d + 'px';
                              }).text(function(d){return d;}).
                              style("background", function(d) {
                                  return "rgb(100, 200, " + (d * 50) + ")";
                                });
        }
    };
  }
]);
  function updateStats(directiveScope){
    var player = directiveScope.player;
    // console.log("2player", player);
    //effective field goal % is a function of three pointers made weighted for the additional point, two pointers made and total field goals attempted
    directiveScope.eFG = (((Number(player.threePtMade) * 0.5  + Number(player.fgm))/ Number(player.fga)) * 100).toFixed(1);
    //true shooting attempts is a metric used to calculate true shooting %
    directiveScope.TSA =  (0.44 * Number(player.fta)) + Number(player.fga);
    //true shooting % is a function of total point scored and true shooting attempts
    directiveScope.TS = ((Number(player.pts)/(2 * directiveScope.TSA)) * 100).toFixed(1);
  }

  function collectData(scope){
    console.log(this.data)
  }

})();
