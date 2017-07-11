/*! 
* env - v1.2.1 - 2017-07-11
* https://github.com/gbiryukov/env
* Copyright (c) 2017 George Biryukov
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

	var env;
	var isReady;
	var callbacks;
	var readyState;
	var resolveReadyState;

	function reset() {
		env = {};
		isReady = false;
		callbacks = [];
		readyState = new Promise(function(resolve) {
			resolveReadyState = function() {
				isReady = true;
				resolve();
			};
		});
	}

	function addListener(callback){
		callbacks.push(callback);
	}

	function extendEnv(obj) {
		for (var key in obj){
			if (obj.hasOwnProperty(key)) {
				env[key] = obj[key];
			}
		}
	}

	reset();

	return {
		ready: function () {
			resolveReadyState();

			for (var i in callbacks){
				callbacks[i].call(this);
			}
		},
		set: function (key, value) {
			if (typeof(key) === 'object') {
				extendEnv(key);
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
		getAsync: function(key) {
			var self = this;

			return readyState.then(function() {
				return self.get(key);
			});
		},
		onReady: function (callback) {
			if (typeof(callback) === 'function') {
				if (isReady) {
					/**
					 * if event handler attached after env initialization
					 * invoke it immediately
					 */
					callback.call(this);
				} else {
					addListener(callback);
				}
			}

			return readyState;
		},
		isReady: function() {
			return isReady;
		},
		reset: reset
	};
}));
