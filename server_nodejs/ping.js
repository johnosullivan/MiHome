// Mirror
//var socket = require('socket.io-client')('http://localhost:8888');

var io = require('socket.io-client')
var socket = io.connect('https://pacific-springs-32410.herokuapp.com/', {reconnect: true});

socket.on('connect', function(){
  console.log(socket.id);
  socket.on('00000012340987011_RES_HUB', function(data){
    console.log("00000012340987011_RES_HUB");
    console.log(data);
  });
  socket.emit('send',{ 'emit':'00000012340987011', 'payload': {'command':'info','payload':null} });
  socket.emit('send',{ 'emit':'00000012340987011', 'payload': {'command':'ping','payload':null} });
});
