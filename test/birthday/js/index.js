define(function(require, exports, module) {
    var shake = require('shake');
	var $ = require('fx');
	window.onload = function() {

		//create a new instance of shake.js.
		var myShakeEvent = new Shake({
			threshold: 15
		});

		// start listening to device motion
		myShakeEvent.start();

		// register a shake event
		window.addEventListener('shake', shakeEventDidOccur, false);

		//shake event callback
		function shakeEventDidOccur () {

			//put your own code here etc.
			alert('1!');
		}
	};
})