var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var Payload = require('../models/payload');
var Hub = require('../models/hub');
var tokenMiddleware = require('../middleware/token');
var router = express.Router();

router.post('/devices', tokenMiddleware.verifyToken, function(req, res){
  Hub.find({ "userID" : req.body.userID }, function (err, data) {
    if (data !== undefined) {
      res.json({success: true, size:data.length, data :data});
    } else {
      res.json({success: false });
    }
  });
});

router.post('/add', tokenMiddleware.verifyToken, function(req, res){
  var hub = Hub(req.body);
  hub.save(function(err) {
    if (err) throw err;
    res.json(hub);
  });
});

module.exports = router;
