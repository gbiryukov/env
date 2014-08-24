/*
 * env
 * https://github.com/gbiryukov/env
 *
 * Copyright (c) 2014 George Biryukov
 * Licensed under the MIT license.
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
		_extendEnv: function(obj) {
			for (var key in obj){
				env[key] = obj[key];
			}
		},
		ready: function () {
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
		set: function (key, value) {
			if (typeof(key) === 'object') {
				this._extendEnv(key);
			} else {
				env[key] = value;
			}
		},
		get: function (key) {
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
