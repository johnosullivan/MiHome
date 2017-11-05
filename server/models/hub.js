var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hubSchema = new Schema({
  name:String,
  firmware:String,
  encrypted:Boolean,
  connected:Boolean,
  nodeID:String
});

var hub = mongoose.model('Hub', hubSchema);
module.exports = hub;
