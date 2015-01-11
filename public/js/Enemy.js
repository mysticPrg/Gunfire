/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config'], function($, Config) {

	var gameElm = null;

	$(document).ready(function() {
		gameElm = $('#game');
	});

	function Enemy(x, y) {
		this.elm = $('<div/>', {
			id: 'enemy'
		}).appendTo(gameElm);

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

		this.elm.css({
			width: this.size,
			height: this.size,
			left: this.pos.x,
			top: this.pos.y,
			position: 'absolute',
			'background-image': 'url("imgs/enemy.png")',
			'background-size': 'contain',
			'z-index': 2
		});
	}

	Enemy.prototype.destroy = function() {
		this.elm.remove();
	};

	Enemy.prototype.animate = function() {
		this.elm.css({
			left: this.pos.x,
			top: this.pos.y,
			transform: 'rotate(' + this.angle + 'rad)'
		});
	};

	Enemy.prototype.moveTo = function(x, y, angle) {
		this.pos.x = x;
		this.pos.y = y;
		this.center.x = this.pos.x + this.size / 2;
		this.center.y = this.pos.y + this.size / 2;
		this.angle = angle;
	};

	return Enemy;
});