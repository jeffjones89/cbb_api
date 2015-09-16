(function(){
  var statsControllers = angular.module('statsControllers', ['ngRoute']);


  //index controller
  statsControllers.controller('statsController', ['Player', function(Player){
    this.players = Player.query();
  }]);
})();
