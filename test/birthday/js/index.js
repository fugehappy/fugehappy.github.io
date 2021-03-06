define(function(require, exports, module) {
	var preload = require('preloadImg');
	var shake = require('shake');
	var $ = require('fx');
	//create a new instance of shake.js.
	var myShakeEvent = new Shake({
		threshold: 15
	});
	function triggerShake() {		
		
		// start listening to device motion
		myShakeEvent.start();

		// register a shake event
		window.addEventListener('shake', shakeEventDidOccur, false);		
	}
	
	function shakeEventDidOccur () {

		//put your own code here etc.
		if(index == 6){
			alert('end~');
			myShakeEvent.stop();
			return false;
		}
		var arr=['1','2','3','4','5'];
		var i=Math.floor(Math.random()*5);
		alert(arr[i]);
		index++;
	}
	
	//所有的资源加载完毕才开启玩摇一摇功能
	var index = 0;
	window.onload = function() {
		triggerShake();
	};
	//判断手机横竖屏状态：
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {  
		if (window.orientation === 180 || window.orientation === 0) {   
			//alert('竖屏状态！');
			$('.mask').hide();
			myShakeEvent.start();			
		}   
		if (window.orientation === 90 || window.orientation === -90 ){   
			//alert('横屏状态！');
			$('.mask').show();
			myShakeEvent.stop();
		}    
	}, false);
	
	//图片预加载
	preload.init({
		imgs: [
			'./images/jinmao-load.png'
		],
		callback: function(o) {
			$('.loading .bar').width(o.progress + '%');
			$('.progress-text').html(o.progress+'%,玩命加载中...');
			setTimeout(function() {
				$('.loading').remove();
				$('.page1').removeClass('none');
				
			}, 200)
		}
	});

})