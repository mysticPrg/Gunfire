/**
 * Created by mysticprg on 15. 1. 11.
 */

define([], function() {
	var config = {
		stage: {
			size: {
				width: 1200,
				height: 800
			}
		},

		player: {
			speed: 5,
			size: 50
		},

		bullet: {
			speed: 10
		},

		fps: 1000/60
	};

	return config;
});