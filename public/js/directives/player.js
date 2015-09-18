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
        //data visualization for both default and scoped player data...need to abstract this somewhere...better than this.

        var d3Data = [ {title: "TS%", value: scope.TS}, {title: "eFG%", value: scope.eFG}, {title: "Points", value: scope.player.pts},{title: "FGA", value: scope.player.fga}, {title: "3PM", value: scope.player.threePtMade}, {title: "3PA", value: scope.player.threePtAtt} ];
        var d3DataMax = [scope.ts, scope.eFG, scope.player.pts, scope.player.fga, scope.player.threePtAtt, scope.player.threePtMade]
        var x = d3.scale.linear().domain([0, d3.max(d3DataMax)]).range([0, 450]);
        console.log(d3.max(d3DataMax))
        d3.select(element[0].querySelector(".graph")).selectAll('div').data(d3Data).enter().append("div").
                              classed("statBar", true).
                              style("width", function(d){
                                return x(d.value) + 'px';
                              }).text(function(d){ if (d.value > 5){
                                return d.title + ': ' + d.value;
                              }
                            }).
                              style("background", function(d) {
                                  return "rgb(100, 200, " + (d.value * 50) + ")";
                                })
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
