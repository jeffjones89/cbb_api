(function(){
  var statsControllers = angular.module('statsControllers', ['ngRoute']);


  //index controller
  statsControllers.controller('statsController', ['Player', function(Player){
    this.players = Player.query()
    this.eFG = function(){
      
    }
    // Player.get().$promise.then(function(response){
    //     return response.players
    // }).then(function(players){
    //   this.players = players;
    // });
  }]);
})();
