/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config'], function ($, Config) {

	var bullets = {};
	var count = 0;
	var gameElm = null;

	$(document).ready(function () {
		gameElm = $('#game');
	});

	function Bullet(id, x, y, angle) {
		this.id = id;
		this.pos = {
			x: x,
			y: y
		};
		this.force = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
		this.pos.x += this.force.x * 40;
		this.pos.y += this.force.y * 40;

		this.size = 10;
		this.center = {
			x: this.pos.x + this.size,
			y: this.pos.y + this.size
		};
		this.angle = angle;

		this.elm = $('<div/>', {
			class: 'bullet'
		}).appendTo(gameElm);

		this.elm.css({
			left: x,
			top: y,
			width: this.size,
			height: this.size
		});
	}

	Bullet.prototype.animate = function () {
		this.pos.x += this.force.x * Config.bullet.speed;
		this.pos.y += this.force.y * Config.bullet.speed;
		this.center.x = this.pos.x + this.size;
		this.center.y = this.pos.y + this.size;

		this.elm.css({
			left: this.pos.x,
			top: this.pos.y
		});

		if (this.pos.x < 0 || this.pos.x > Config.stage.size.width) {
			return true;
		} else if (this.pos.y < 0 || this.pos.y > Config.stage.size.height) {
			return true;
		}

		return false;

	};

	Bullet.prototype.checkCollision = function (x, y, size) {
		var dist_x = this.center.x - x;
		var dist_y = this.center.y - y;
		var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

		if (dist < size) {
			this.destroy();
			return true;
		}

		return false;
	};

	Bullet.prototype.destroy = function () {
		this.elm.remove();
	};

	Bullet.createBullet = function (x, y, angle) {
		bullets[count] = new Bullet(count, x, y, angle);
		count++;
		if (count >= 10000) {
			count = 0;
		}
	};

	Bullet.checkCollision = function (x, y, size) {
		var k;
		size -= 30;
		var result = false;
		for (k in bullets) {
			if (bullets[k].checkCollision(x, y, size)) {
				delete bullets[k];
				result = true;
			}
		}

		return result;
	};

	Bullet.destroy = function () {
		var k;
		for (k in bullets) {
			bullets[k].destroy();
		}
		bullets = [];
	};

	Bullet.animate = function () {
		var k;
		for (k in bullets) {
			if (bullets[k].animate()) {
				bullets[k].destroy();
				delete bullets[k];
			}
		}
	};

	return Bullet;
});