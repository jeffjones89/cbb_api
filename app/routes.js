var mongoose = require('mongoose');
var playerSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  school: {type: String, trim: true},
  fga: Number,
  pts: Number,
  fgm: Number,
  threePtAtt: Number,
  threePtMade: Number,
  twoPtMade: Number,
  twoPtAtt: Number,
  FT: Number,
  FTA: Number
},
{collection: 'player'}

);
var PlayerModel = mongoose.model('Player', playerSchema);
