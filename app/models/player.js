var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//player schema
var playerSchema = new Schema({
  name: String,
  school: String,
  fga: Number,
  pts: Number,
  fgm: Number,
  threePtAtt: Number,
  threePtMade: Number,
  twoPtMade: Number,
  twoPtAtt: Number,
  ft: Number,
  fta: Number,
  img: String
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
