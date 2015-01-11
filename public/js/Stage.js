/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery', 'Config'], function($, Config) {
	function Stage() {
		this.elm = $('#stage');

		this.size = {
			width: Config.stage.size.width,
			height: Config.stage.size.height
		};

		this.elm.css({
			width: this.size.width,
			height: this.size.height
		});
	};

	return Stage;
});
