/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config'], function ($, Config) {

	var count = 0;
	var divElm = null;

	$(document).ready(function () {
		count = 0;
		divElm = $('#particles');
	});

	function Particle(maxDistance) {

		this.maxDistance = maxDistance;
		this.index = count;
		this.elm = $('<div/>', {
			class: 'particle'
		}).appendTo(divElm);
		count++;

		this.init();
	}

	Particle.prototype.destroy = function() {
		this.elm.remove();
	};

	Particle.prototype.init = function () {
		this.distance = Math.floor(Math.random() * this.maxDistance);

		// 5 ~ 25
		this.size = 5 + this.distance / 5;


		this.pos = {
			x: Math.floor(Math.random() * Config.stage.size.width),
			y: Math.floor(Math.random() * Config.stage.size.height)
		};

		var alpha = (this.size - 5) / 25;

		this.elm.css({
			width: this.size,
			height: this.size,
			opacity: 0,
			left: this.pos.x,
			top: this.pos.y
		});

		this.elm.animate({
			opacity: alpha
		}, 'slow', 'linear');
	};

	Particle.prototype.getCount = function () {
		return count;
	};

	Particle.prototype.animate = function (x, y, power) {

		var force = this.size / 5 * power;
		var force_x = force * x;
		var force_y = force * y;

		this.pos.x += force_x;
		this.pos.y += force_y;

		if (this.pos.x < 0 || this.pos.x > (Config.stage.size.width - this.size)) {
			this.init();
			return;
		}

		if (this.pos.y < 0 || this.pos.y > (Config.stage.size.height - this.size)) {
			this.init();
			return;
		}

		this.elm.css({
			left: this.pos.x,
			top: this.pos.y
		});
	};

	return Particle;
});