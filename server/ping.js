
var io = require('socket.io-client');
var socket = io.connect('http://pacific-springs-32410.herokuapp.com/', {reconnect: true});

socket.on('connect', function (socket) {
    console.log('Connected!');
});


socket.on('CH01', function(d){

  console.log(d);

});
socket.emit('00000012340987011', 'me', 'test msg');
