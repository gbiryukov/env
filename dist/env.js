/*! 
* env - v1.0.0 - 2014-08-23
* https://github.com/gbiryukov/env
* Copyright (c) 2014 George Biryukov
* Licensed MIT 
*/

(function(exports, envModule) {

	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD environment
		define('env', [], envModule);
	} else if (typeof exports === 'object') {
		// CommonJS environment
		module.exports = envModule();
	} else {
		// Browser environment
		exports.env = envModule();
	}

}(typeof exports === 'object' && exports || this, function(){

	'use strict';

	var env = {};

	return {
		_isReady: false,
		_bind: function(callback){
			var self = this;

			function runCallback(){
				if (typeof(callback) === 'function') {
					callback.call(self);
				}
			}

			if (document.addEventListener) {
				document.addEventListener('envReady', runCallback, false);
			} else {
				document.attachEvent('onenvReady', runCallback);
			}
		},
		_ready: function () {
			// The custom event that will be created
			var event;

			if (document.createEvent) {
				event = document.createEvent('HTMLEvents');
				event.initEvent('envReady', true, true);
			} else {
				event = document.createEventObject();
				event.eventType = 'envReady';
			}

			event.eventName = 'envReady';

			if (document.createEvent) {
				document.dispatchEvent(event);
			} else {
				document.fireEvent('on' + event.eventType, event);
			}

			this._isReady = true;
		},
		set: function (vars) {
			env = vars;
			this._ready();
		},
		getVar: function (key) {
			if (typeof(env[key]) !== 'undefined') {
				return env[key];
			} else {
				return false;
			}
		},
		onReady: function (callback) {
			// if event handler attached after env initialization
			// invoke it immediately
			if (this._isReady && typeof(callback) === 'function') {
				callback.call(this);
			} else {
				this._bind(callback);
			}
		}
	};
}));
