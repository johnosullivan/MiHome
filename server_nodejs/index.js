// Import DotEnv Configs
require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const http = require("http");

const { 
  authController,
  dataController
} = require('./controllers');

const app = express();
app.use(bodyParser.json());

app.get('/ping', authController.ping);

app.post('/data', dataController.data);

const port = process.env.PORT || 8080;

const server = app.listen(port, function() {
  console.log('MiHome Endpoint Server Listening Port:', port);
});

function shutdown() {
  server.close();
};

module.exports = {
  server,
  shutdown
};