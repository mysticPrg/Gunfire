/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config', 'Particle'], function ($, Config, Particle) {

	var POWER_RANGE = 2;
	var POWER_HALF = POWER_RANGE / 2;

	function ParticleManager(count) {
		this.count = count;
		this.particles = [];

		this.direction = {
			x: 0,
			y: 0,
			target_x: (Math.random() * POWER_RANGE) - POWER_HALF,
			target_y: (Math.random() * POWER_RANGE) - POWER_HALF,
			sign_x: 1,
			sign_y: 1,
			changing_x: true,
			changing_y: true
		};

		if ( this.direction.x < this.direction.target_x) {
			this.direction.sign_x = 1;
		} else {
			this.direction.sign_x = -1;
		}

		if ( this.direction.y < this.direction.target_y) {
			this.direction.sign_y = 1;
		} else {
			this.direction.sign_y = -1;
		}

		var i;
		for (i = 0; i < count; i++) {
			this.particles.push(new Particle(100));
		}
	}

	ParticleManager.prototype.destroy = function() {
		var i;
		for (i = 0; i < this.count; i++) {
			this.particles[i].destroy();
		}
	};

	ParticleManager.prototype.animate = function (power) {
		var i;
		for (i = 0; i < this.count; i++) {
			this.particles[i].animate(this.direction.x, this.direction.y, power);
		}

		if (this.direction.changing_x === false && this.direction.changing_y === false) {

			var invoke = Math.round(Math.random() * 50);
			if (invoke !== 0) {
				return;
			}

			this.direction.changing_x = true;
			this.direction.changing_y = true;

			this.direction.target_x = (Math.random() * POWER_RANGE) - POWER_HALF;
			this.direction.target_y = (Math.random() * POWER_RANGE) - POWER_HALF;

			if ( this.direction.x < this.direction.target_x) {
				this.direction.sign_x = 1;
			} else {
				this.direction.sign_x = -1;
			}

			if ( this.direction.y < this.direction.target_y) {
				this.direction.sign_y = 1;
			} else {
				this.direction.sign_y = -1;
			}

			return;
		}

		if (this.direction.changing_x) {
			this.direction.x += 0.008 * this.direction.sign_x;

			if (Math.abs(Math.abs(this.direction.x) - Math.abs(this.direction.target_x)) <= 0.1) {
				this.direction.changing_x = false;
			}
		}
		if (this.direction.changing_y) {
			this.direction.y += 0.008 * this.direction.sign_y;

			if (Math.abs(Math.abs(this.direction.y) - Math.abs(this.direction.target_y)) <= 0.1) {
				this.direction.changing_y = false;
			}
		}

	};

	return ParticleManager;
});