define(function(require, exports, module) {
	var UI ={};
	/*
    *提示(创建一般的提示信息，或者实现上浮然后消失的提示)
    */
    UI.tips = function(mes,type){
		if(!$) return false;
		if(typeof mes !='string') return false;
		var content = $('<div class="tip_info1">');
		content.html(mes);
		$("body").append(content);
		
		if(type ==='animate'){
			content.animate({
				opacity: 0,
				top: '13%'
			}, 1000,function(){
				content.remove();
			});
		}		
	};
	/*
	*创建带着按钮的弹窗
	*/
	UI.tips2 = function(mes,type){
		if(!$) return false;
		if(typeof mes !='string') return false;
		var content = $('<div class="tip_info2">');
		content.html(mes);
		$("body").append(content);
	}
	
	/*
	*创建遮罩
	*/
	UI.createMask = function(){
		if(!$) return false;
		var mask = $('<div class="t_mask"></div>');
		$("body").append(mask);
	}
	
	/*
	*关闭遮罩
	*/
	UI.closeMask = function(str){
		if(!$) return false;
		if(typeof str !='string') return false;
		$(str).animate({
			opacity: 0,
		},50,function(){
			$(this).remove();
			$('.t_mask').remove();
		});
		
	}
	
	module.exports = UI;
})