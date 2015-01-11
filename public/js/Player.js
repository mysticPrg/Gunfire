/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config'], function ($, Config) {

	var gameElm = null;

	$(document).ready(function() {
		gameElm = $('#game');
	});

	function Player(x, y) {
		this.size = Config.player.size;

		this.pos = {
			x: x,
			y: y
		};

		this.center = {
			x: this.pos.x + this.size / 2,
			y: this.pos.y + this.size / 2
		};

		this.angle = 0;

		this.elm = $('<div/>', {
			id: 'player'
		}).appendTo(gameElm);

		this.elm.css({
			width: this.size,
			height: this.size,
			left: this.pos.x,
			top: this.pos.y,
			position: 'absolute',
			'background-image': 'url("imgs/player.png")',
			'background-size': 'contain',
			'z-index': 2
		});
	}

	Player.prototype.destroy = function() {
		this.elm.remove();
	};

	Player.prototype.moveUp = function () {
		this.pos.y -= Config.player.speed;
		if (this.pos.y < 0) {
			this.pos.y = 0;
		}
		this.elm.css('top', this.pos.y);

		this.center.y = this.pos.y + this.size / 2;

	};

	Player.prototype.moveDown = function () {
		this.pos.y += Config.player.speed;

		var stageMax = Config.stage.size.height - this.size;
		if (this.pos.y > stageMax) {
			this.pos.y = stageMax;
		}
		this.elm.css('top', this.pos.y);

		this.center.y = this.pos.y + this.size / 2;
	};

	Player.prototype.moveLeft = function () {
		this.pos.x -= Config.player.speed;
		if (this.pos.x < 0) {
			this.pos.x = 0;
		}
		this.elm.css('left', this.pos.x);

		this.center.x = this.pos.x + this.size / 2;
	};

	Player.prototype.moveRight = function () {
		this.pos.x += Config.player.speed;

		var stageMax = Config.stage.size.width - this.size;
		if (this.pos.x > stageMax) {
			this.pos.x = stageMax;
		}
		this.elm.css('left', this.pos.x);

		this.center.x = this.pos.x + this.size / 2;
	};

	Player.prototype.rotateTo = function (x, y) {
		this.angle = Math.atan2(y - this.center.y, x - this.center.x);
		this.elm.css({
			transform: 'rotate(' + this.angle + 'rad)'
		});
	};

	return Player;
});