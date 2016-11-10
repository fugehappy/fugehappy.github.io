define(function(require, exports, module) {
	var preload = require('preloadImg');
    var shake = require('shake');
	var $ = require('fx');
	function triggerShake() {
		if(!$('.moveTel').hasClass('none')) {
			//create a new instance of shake.js.
			var myShakeEvent = new Shake({
				threshold: 15
			});

			// start listening to device motion
			myShakeEvent.start();

			// register a shake event
			window.addEventListener('shake', shakeEventDidOccur, false);
		}
	}
	
	function shakeEventDidOccur () {

		//put your own code here etc.
		//$('.moveTel').addClass('none');
		var arr=['1','2','3','4'];
		var i=Math.ceil(Math.random()*5);
		alert(arr[i]);
	}	
	
	window.onload = function() {

		triggerShake();
	};
	
	//图片预加载
    preload.init({
		imgs: [
			'./images/jinmao-load.png'
		],
		callback: function(o) {
			$('.loading .bar').width(o.progress + '%');
			setTimeout(function() {
				$('.loading').remove()
			}, 200)
		}
	});

})