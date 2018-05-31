var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var Payload = require('../models/payload');
var User = require('../models/user');
var tokenMiddleware = require('../middleware/token');
var router = express.Router();
const Influx = require('influxdb-nodejs');
const client = new Influx('http://127.0.0.1:8086/mydb');

router.get('/', function(req, res){
  /*Payload.find({}, function (err, data) {
    res.json({'size':data.length,'data':data});
  });*/

  client.query('sensor_points').then((data) => {
      console.log(data.results[0].series[0]);
      var s = data.results[0].series[0];
      res.json(s);
  }).catch(console.error);
});



router.post('/find', tokenMiddleware.verifyToken, function(req, res){
  if (req.body.start === undefined || req.body.end === undefined) {
    res.json({success: false, message:'Time Frame Required'});
  }
  if (req.body.types === undefined) {
    Payload.find({ "datetime" : { $lt: new Date(req.body.end), $gte: new Date(req.body.start) } }, function (err, data) {
      if (data !== undefined) {
        res.json({success: true, size:data.length, data :data});
      } else {
        res.json({success: true, size :0, data:[]});
      }
    });
  } else {
    var types = req.body.types.split(',');
    var selectquery = '';
    for (i = 0; i < types.length; i++) {
      if (i === types.length - 1) {
        selectquery += types[i];
        selectquery += " ";
        selectquery += "datetime";
      } else {
        selectquery += types[i];
        selectquery += " ";
      }
    }
    Payload.find({ "datetime" : { $lt: new Date(req.body.end), $gte: new Date(req.body.start) }}).select(selectquery).exec(function (err, data) {
      if (data !== undefined) {
        res.json({success: true, size:data.length, data:data});
      } else {
        res.json({success: true, size:0, data:[]});
      }
    });
  }
});

router.post('/connection_test', function(req, res){ res.json({'status':true}); });
router.get('/ping', function(req, res){ res.json({'response':'pong'}); });

router.post('/', function(req, res){
  /*var temp_load = new Payload(req.body);
  temp_load['datetime'] = new Date();
  temp_load.save(function(err) {
    if (err) throw err;
    res.json(temp_load);
  });*/
  client.write('sensor_points')
    .field({
      use: 100,
      bytes: 2000,
      url: '',
    })
    .then(() => {
      console.info('write point success')
      res.json({message:'write point success'});
    })
    .catch(console.error);

});

module.exports = router;
