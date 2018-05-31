var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var http = require("http");
var mongoose = require('mongoose');
var cors = require('cors')
var CONFIG = require('./config.json');

const Influx = require('influxdb-nodejs');
const client = new Influx('http://127.0.0.1:8086/mydb');

const fieldSchema = {
  use: 'i',
  bytes: 'i',
  url: 's',
};

client.schema('sensor_points', fieldSchema, {
  stripUnknown: true,
});

mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.database.address, { useMongoClient: true, promiseLibrary: global.Promise });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/users'));
app.use('/api/data', require('./routes/data'));
app.use('/api/hardware', require('./routes/hardware'));


var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket) {
    //console.log('Connected: ' + socket.id);
    socket.on('send', function(data) {
      io.emit(data.emit,data.payload);
    });
});

io.on('disconnected', function(socket) {
    console.log('Disconnected: ' + socket.id);
});

server.listen(process.env.PORT || CONFIG.server.port, function() {
    console.log('Server listening on port: ', CONFIG.server.port);
});

/*
app.listen(process.env.PORT || CONFIG.server.port, function () {
  //var port = server.address().port;
  console.log('MiHome API Running');
  console.log('Server listening at http://localhost:%s', "port");
})
*/
