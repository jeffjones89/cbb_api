var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = require('../config/db.js');

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/players", function(req, res){
  console.log(db)
});

module.exports = router;
