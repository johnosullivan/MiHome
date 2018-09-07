var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var payloadSchema = new Schema({
  temperature: Number,
  humidity: Number,
  co2: Number,
  voc: Number,
  visible: Number,
  light: Number,
  UV: Number,
  IR: Number,
  pressure: Number,
  datetime:Date,
  nodeID:String
});

var payload = mongoose.model('Payload', payloadSchema);
module.exports = payload;
