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

	var env;
	var isReady;
	var callbacks;
	var resolveStatus;
	var status;

	function reset() {
		env = {};
		isReady = false;
		callbacks = [];
		status = new Promise(function(resolve) {
			resolveStatus = resolve;
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
			for (var i in callbacks){
				callbacks[i].call(this);
			}

			isReady = true;
			resolveStatus();
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

			return status;
		},
		isReady: function() {
			return isReady;
		},
		reset: reset
	};
}));
