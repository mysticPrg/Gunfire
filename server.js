/**
 * Created by mysticprg on 15. 1. 11.
 */


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var Config = {
	width: 1200,
	height: 800
};

var players = {};
var count = 0;

io.on('connection', function (socket) {

	if (count >= 2) {
		socket.disconnect();
		return;
	}

	players[socket.client.id] = {
		id: socket.client.id,
		socket: socket,
		other: null,
		x: Math.random() * Config.width,
		y: Math.random() * Config.height
	};
	count++;
	console.log('player ' + count + ' connected');

	if (count == 2) {
		var k;
		var arr = [];
		for (k in players) {
			arr.push(players[k]);
		}
		arr[0].other = arr[1];
		arr[1].other = arr[0];

		for (k in players) {
			players[k].socket.emit('start', {
				width: Config.width,
				height: Config.height,
				x: players[k].x,
				y: players[k].y,
				enemy_x: players[k].other.x,
				enemy_y: players[k].other.y
			});
		}
	}

	socket.on('disconnect', function () {
		var target = players[socket.client.id].other;
		if (target) {
			target.socket.emit('stop');
		}

		delete players[socket.client.id];
		console.log('player ' + count + ' disconnected');
		count--;
	});

	socket.on('gameover', function() {
		var target = players[socket.client.id].other;
		if (target) {
			target.socket.emit('gameover');
		}
	});

	socket.on('move', function (data) {
		var target = players[socket.client.id].other;
		if (target) {
			target.socket.emit('move', data);
		}
	});

	socket.on('togglePause', function () {
		var target = players[socket.client.id].other;
		if (target) {
			target.socket.emit('togglePause');
		}
	});

	socket.on('shoot', function(data) {
		var target = players[socket.client.id].other;
		if (target) {
			target.socket.emit('shoot', data);
		}
	});
});

http.listen(8080, function () {
	console.log('Server is Running...')
});
