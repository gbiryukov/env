
'use strict';

define(['jquery'], function($){
	return function(){
		var count = 3,
			$conter = $('.countdown'),
			intervalId = setInterval(function(){
				count--;
				$conter.text(count);
				if (count === 0) {
					clearInterval(intervalId);
				}
		}, 1000);
	};
});
