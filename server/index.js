var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors')
var CONFIG = require('./config.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mogilska:homework@ds137730.mlab.com:37730/heroku_zdq7nd1v', {
    useMongoClient: true,
    promiseLibrary: global.Promise
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var usersRoutes = require('./routes/users');
var dataRoutes = require('./routes/data');

app.use('/api/users', usersRoutes);
app.use('/api/data', dataRoutes);

var server = app.listen(process.env.PORT || CONFIG.server.port, function () {
  console.log('MiHome API Running');
  var port = server.address().port;
  console.log('Server listening at http://localhost:%s', port);
})
