var express = require("express");
var mongojs = require('mongojs');
var bodyParser = require("body-parser");
var path = require('path');
var routes = require('./app/routes.js');
var db = mongojs('playersdb', ['players'])
var playersController = require('./app/controllers/players.js');
var app = express();

app.use("/", express.static(path.join(__dirname + "/public")));

app.use(bodyParser.json());

app.listen(4000, function(){
  console.log("app is listening on port 4000")
});

app.get("/", function(request, response){
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/players", function(req,res){
 db.players.find({}, function(err, players){
   if(err) return;
   var response = players;
   res.json(response);
 });
});

app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});
