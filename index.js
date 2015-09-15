var express = require("express");
var mongojs = require('mongojs');
var bodyParser = require("body-parser");
var routes = require('./app/routes.js');
var db = mongojs('playersdb', ['players'])
var playersController = require('./app/controllers/players.js');
var app = express();


app.use(bodyParser.json());

app.listen(4000, function(){
  console.log("app is listening on port 4000")
});

app.get("/", function(req, res){
  res.send("It's a start");
});

app.get("/players", function(req,res){
 db.players.find({}, function(err, players){
   if(err) return
   var response = {
     players: players
   }
   res.json(response);
 });
});

app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});
