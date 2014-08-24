
'use strict';

require.config({
	baseUrl: 'js/lib',
	paths: {
		'app': '../app',
	}
});

require(['jquery', 'env', 'app/countdown'], function($, Env, Countdown){
	Env.onReady(function(){
		var $list = $('.vars');

		$list.append($('<li>').text(
			'static: ' + Env.get('static')
		));

		$list.append($('<li>').text(
			'myAjaxService: ' + Env.get('myAjaxService')
		));
	});

	Countdown();
});
