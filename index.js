var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var routes = require('./app/routes.js');
var db	 = require('./app/config/db');

app.use(bodyParser.json());

app.listen(4000, function(){
  console.log("app listening on port 4000")
});

app.get("/", function(req, res){
  res.send(db);
})

mongoose.connect(db.url);

app.use(function(req, res, next){
   res.status(404);
   res.json({ error: 'Invalid URL' });
});
