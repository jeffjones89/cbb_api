var express = require("express");
var Player = require("./app/models/player")
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var path = require('path');
var playersController = require('./app/controllers/players.js');
var app = express();

mongoose.connect('mongodb://heroku_xhww8k9r:dm80401pa75ppivfsdk3hlfdba@ds031407.mongolab.com:31407/heroku_xhww8k9r');

app.use("/", express.static(path.join(__dirname + "/public")));

app.use(bodyParser.json());

app.get("/", function(request, response){
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/players", function(req,res){
  Player.find({}, function(err, players){
    if(err) throw err;
    res.json(players);
  });
});

app.get("/api/players/:id", function(req, res){
  Player.findById(req.params.id, function(err, player){
    if(err) throw err;
    res.json(player);
  });
});

app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
  console.log("app is listening on " + app.get('port'));
});
