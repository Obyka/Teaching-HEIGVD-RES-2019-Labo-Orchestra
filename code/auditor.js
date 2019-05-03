// TCP server inspired from https://gist.github.com/tedmiston/5935757
const protocol = require('./orchestra-protocol');
const dgram = require('dgram');
var net = require('net');

var musiciansMap = new Map();
const s = dgram.createSocket('udp4');
s.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});
var message;
s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    message = JSON.parse(msg);
    musiciansMap.set(message.uuid, message);
});

function checkActiveMusician(){

}

function logMapElements(value, key, map) {
    console.log(`m[${key}] = ${value}`);
  }


var server = net.createServer(function(socket) {
	socket.write(message);
	socket.pipe(socket);
});

server.listen(2205, '127.0.0.1');