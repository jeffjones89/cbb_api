var express = require("express");
var Player = require("./app/models/player")
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var bodyParser = require("body-parser");
var path = require('path');
var playersController = require('./app/controllers/players.js');
var app = express();

// mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost:27017/playersdb');
//
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
               replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = (process.env.MONGOLAB_URI ||'mongodb://localhost:27017/playersdb')
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

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
