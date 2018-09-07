var socket = require('socket.io-client')('http://192.168.50.52:8888');
socket.on('connect', function(){
  console.log("Connect");
});
socket.on('event', function(data){
  console.log(data);
});
socket.on('disconnect', function(){
  console.log("Disconnect");
});
