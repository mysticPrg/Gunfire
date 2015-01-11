/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery'], function($) {
	var cur = {
		x: 0,
		y: 0
	};

	var gameElm = null;

	function getX() {
		return cur.x;
	}

	function getY() {
		return cur.y;
	}

	$(document).ready(function() {

		gameElm = $('#game');

		gameElm.on('mousemove', function (e) {
			cur.x = e.clientX;
			cur.y = e.clientY;
		});

		gameElm.on('mousedown', function(e) {
			return false;
		});

		gameElm.on('mouseup', function(e) {
			return false;
		});

	});

	function setOnClick(callback) {
		gameElm.off('mousedown');
		gameElm.on('mousedown', function(e) {
			callback(e.clientX, e.clientY);
			return false;
		});
	};

	return {
		getX: getX,
		getY: getY,
		setOnClick: setOnClick
	};
});