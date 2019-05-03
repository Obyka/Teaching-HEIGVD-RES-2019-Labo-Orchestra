var dgram = require('dgram');
const uuidv4 = require('uuid');
var s = dgram.createSocket('udp4');

const protocol = require("./orchestra-protocol")

function Musician(instrument, sound, uuid) {
    this.uuid = uuid;
	this.instrument = instrument;
    this.sound = sound;

  Musician.prototype.makeNoise = function() {
        this.date =  new Date();
		var payload = JSON.stringify(this);

		message = new Buffer(payload);
		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
			console.log("Sending payload: " + payload + " via port " + s.address().port);
		});

	}

	setInterval(this.makeNoise.bind(this), 500);

}


var map = new Map();

map.set("piano", "ti-ta-ti'");
map.set("trumpet", "pouet");
map.set("flute", "trulu");
map.set("violin", "gzi-gzi");
map.set("drum", "boum-boum");
var musician = new Musician(process.argv[2], map.get(process.argv[2]), uuidv4());

