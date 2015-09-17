var express = require("express");
var Player = require("./app/models/player")
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var path = require('path');
var playersController = require('./app/controllers/players.js');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI );

app.use("/", express.static(path.join(__dirname + "/public")));

app.use(bodyParser.json());
mongojs(process.env.MONGOLAB_URI)
app.listen(4000, function(){
  console.log("app is listening on port 4000")
});

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
