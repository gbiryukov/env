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
		_callbacks:[],
		_bind: function(callback){
			this._callbacks.push(callback);
		},
		_extendEnv: function(obj) {
			for (var key in obj){
				env[key] = obj[key];
			}
		},
		ready: function () {
			for (var i in this._callbacks){
				this._callbacks[i].call(this);
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
			if (typeof(callback) === 'function') {
				if (this._isReady) {
					// if event handler attached after env initialization
					// invoke it immediately
					callback.call(this);
				} else {
					this._bind(callback);
				}
			}
		},
		clear: function () {
			env = {};
		}
	};
}));
