/**
 * Created by mysticprg on 15. 1. 11.
 */

require.config({
	baseUrl: 'js/',

	paths: {
		'jquery': '../libs/jquery.min',
		'screenfull': '../libs/screenfull.min',
		'Socket': '/socket.io/socket.io'
	},

	shim: {
		'screenfull': {
			exports: 'screenfull'
		},
		'Socket': {
			exports: 'Socket'
		}
	},

	deps: ['main']
});