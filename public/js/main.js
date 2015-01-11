/**
 * Created by mysticprg on 15. 1. 11.
 */

require([
	'jquery',
	'screenfull',
	'Socket',
	'Config',
	'Player',
	'Enemy',
	'Stage',
	'Keyboard',
	'Mouse',
	'ParticleManager',
	'Bullet'
], function ($,
             screenfull,
             Socket,
             Config,
             Player,
             Enemy,
             Stage,
             Keyboard,
             Mouse,
             ParticleManager,
             Bullet) {
	var player = null;
	var enemy = null;
	var stage = null;
	var pm = null;
	var socket = null;

	var interval_key = null;
	var pauseElm = null;
	var gameElm = null;

	var waitElm = null;
	var gameoverElm = null;

	var maxDist = Math.sqrt(Math.pow(Config.stage.size.height, 2) + Math.pow(Config.stage.size.width, 2));

	$(document).ready(function () {
		stage = new Stage();
		socket = Socket();

		socket.on('start', start);
		socket.on('move', move);
		socket.on('togglePause', togglePause);
		socket.on('shoot', enemyShoot);
		socket.on('stop', stop);
		socket.on('gameover', function () {
			gameover(false);
		});

		waitElm = $('<div/>', {
			width: Config.stage.size.width,
			height: Config.stage.size.height
		}).appendTo($('#game'));

		waitElm.css({
			'background-color': 'black',
			opacity: 0.8,
			'z-index': 300,
			color: 'white',
			'text-align': 'center',
			'font-size': '200px',
			'font-family': 'monospace',
			'font-weight': 'bold'
		});

		waitElm.text('Wait for other Player...');

		pauseElm = $('#pause');
		pauseElm.css({
			width: Config.stage.size.width,
			height: Config.stage.size.height
		});

		Keyboard.setHotKey(Keyboard.Key.P, function () {
			socket.emit('togglePause');
			togglePause();
		});
		Keyboard.setHotKey(Keyboard.Key.F, toggleFullScreen);

		Mouse.setOnClick(shoot);
	});

	function start(data) {

		Config.stage.size.width = data.width;
		Config.stage.size.height = data.height;

		waitElm.remove();
		waitElm = null;

		if (gameoverElm) {
			gameoverElm.remove();
			gameoverElm = null;
		}

		player = new Player(data.x, data.y);
		enemy = new Enemy(data.enemy_x, data.enemy_y);
		pm = new ParticleManager(100);

		gameElm = $('#game');
		gameElm.css({
			width: Config.stage.size.width,
			height: Config.stage.size.height
		});

		interval_key = setInterval(loop, Config.fps);
	}

	function move(data) {
		enemy.moveTo(data.x, data.y, data.angle);
	}

	function stop() {
		player.destroy();
		enemy.destroy();
		pm.destroy();
		Bullet.destroy();

		clearInterval(interval_key);
		interval_key = null;

		waitElm = $('<div/>', {
			width: Config.stage.size.width,
			height: Config.stage.size.height
		}).appendTo($('#game'));

		waitElm.css({
			'background-color': 'black',
			opacity: 0.8,
			'z-index': 300,
			color: 'white',
			'text-align': 'center',
			'font-size': '200px',
			'font-family': 'monospace',
			'font-weight': 'bold'
		});

		waitElm.text('Wait for other Player...');
	}

	function gameover(loose) {
		player.destroy();
		enemy.destroy();
		pm.destroy();
		Bullet.destroy();

		clearInterval(interval_key);
		interval_key = null;

		gameoverElm = $('<div/>', {
			width: Config.stage.size.width,
			height: Config.stage.size.height
		}).appendTo($('#game'));

		gameoverElm.css({
			'background-color': 'black',
			opacity: 0.8,
			'z-index': 300,
			color: 'white',
			'text-align': 'center',
			'font-size': '200px',
			'font-family': 'monospace',
			'font-weight': 'bold'
		});

		if (loose) {
			socket.emit('gameover');
			gameoverElm.html('You Lose!<br>Press F5');
		} else {
			gameoverElm.html('You Win!<br>Press F5');
		}
	}

	function loop() {
		if (Keyboard.isPressed(Keyboard.Key.W)) {
			player.moveUp();
		}
		if (Keyboard.isPressed(Keyboard.Key.S)) {
			player.moveDown();
		}
		if (Keyboard.isPressed(Keyboard.Key.A)) {
			player.moveLeft();
		}
		if (Keyboard.isPressed(Keyboard.Key.D)) {
			player.moveRight();
		}

		player.rotateTo(Mouse.getX(), Mouse.getY());

		var dist_x = enemy.pos.x - player.pos.x;
		var dist_y = enemy.pos.y - player.pos.y;
		var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y) / maxDist;
		dist *= 5;
		pm.animate(dist);
		Bullet.animate();
		enemy.animate();

		if (Bullet.checkCollision(player.center.x, player.center.y, player.size)) {
			gameover(true);
		}

		socket.emit('move', {
			x: player.pos.x,
			y: player.pos.y,
			angle: player.angle
		});
	}

	function togglePause() {
		if (interval_key) {
			pauseElm.removeClass('hidden');
			clearInterval(interval_key);
			interval_key = null;
		} else {
			pauseElm.addClass('hidden');
			interval_key = setInterval(loop, Config.fps);
		}
	}

	function toggleFullScreen() {
		if (screenfull.enabled) {
			screenfull.toggle($('body')[0]);
		}
	}

	function shoot(x, y) {
		if (interval_key) {
			Bullet.createBullet(player.center.x, player.center.y, Math.atan2(y - player.center.y, x - player.center.x));
			socket.emit('shoot', {
				x: x,
				y: y
			});
		}
	}

	function enemyShoot(data) {
		var x = data.x;
		var y = data.y;

		if (interval_key) {
			Bullet.createBullet(enemy.center.x, enemy.center.y, Math.atan2(y - enemy.center.y, x - enemy.center.x));
		}
	}
});