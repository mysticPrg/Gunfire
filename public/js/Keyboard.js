/**
 * Created by mysticprg on 15. 1. 11.
 */

define(['jquery'], function ($) {
	var KEYS = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,

		P: 80,
		F: 70,

		W: 87,
		S: 83,
		A: 65,
		D: 68
	};

	var key_state = {};
	for (var k in KEYS) {
		key_state[KEYS[k]] = false;
	}

	var hot_keys = {};

	$(document).ready(function () {

		$(document).on('keypress', function (e) {
			var keyCode = e.keyCode;
			//console.log(keyCode);
			if (keyCode > 94) {
				keyCode -= 32;
			}
			var callback = hot_keys[keyCode];
			if (callback && (typeof callback) === 'function') {
				callback();
			}
		});

		$(document).on('keydown', function (e) {
			if (e.keyCode in key_state) {
				key_state[e.keyCode] = true;
				return false; // keypress 발동시키지 않기 위해 false 반환
			}
		});

		$(document).on('keyup', function (e) {
			if (e.keyCode in key_state) {
				key_state[e.keyCode] = false;
				return false; // keypress 발동시키지 않기 위해 false 반환
			}
		});

	});

	function isPressed(key) {
		return (key_state[key]);
	}

	function setHotKey(key, func) {
		delete key_state[key];

		hot_keys[key] = func;
	}

	return {
		isPressed: isPressed,
		setHotKey: setHotKey,
		Key: KEYS
	}
});