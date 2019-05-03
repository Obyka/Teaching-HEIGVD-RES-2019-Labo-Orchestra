// TCP server inspired from https://gist.github.com/tedmiston/5935757
const protocol = require('./orchestra-protocol');
const dgram = require('dgram');
var net = require('net');
var activeMusician;

var musiciansMap = new Map();
const s = dgram.createSocket('udp4');
s.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});
var message;
s.on('message', function(msg, source) {
    //console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    message = JSON.parse(msg);

    musiciansMap.set(message.uuid, message);
});

function checkActiveMusician(){
  var arr = [];
  for (var [key, value] of musiciansMap.entries()) {
    var diff = new Date() - new Date(value.date);
    if(diff <= 5000){
    arr.push(value);
    }
  }
  activeMusician = JSON.stringify(arr,null, 0);
  console.log(activeMusician);
}


var server = net.createServer(function(socket) {
  socket.write(activeMusician);
  socket.write("\r\n");
  socket.end();
});

server.listen(2205, '0.0.0.0');
setInterval(checkActiveMusician, 1000);

