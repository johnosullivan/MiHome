var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect('mongodb://mogilska:homework@ds137730.mlab.com:37730/heroku_zdq7nd1v')

var Payload = require('./payload');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/data', function(req, res){
  Payload.find({}, function (err, data) {
    res.json(data);
  });
});

app.post('/dx', function(req, res){
  console.log(req.body);
  res.json({'status':true});
});

app.get('/ping', function(req, res){
  console.log("ping");
  res.json({'pong':true});
});

app.post('/', function(req, res){
  var time = req.body.published_at;
  var payload = JSON.parse(req.body.data);
  var temp_load = new Payload(payload);
  temp_load['datetime'] = time;
  temp_load.save(function(err) {
    if (err) throw err;
    console.log(temp_load);
    res.json(temp_load);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('MiHome API Running')
})
