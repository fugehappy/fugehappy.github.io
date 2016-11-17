define(function(require, exports, module) {
	var shake = require('shake');
	var $ = require('fx');
	var swiperJS = require('swiper');
	$(function(){
		 var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			direction: 'vertical',
			autoplay: 1500,
		});
	})
	
	//处理摇动
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
		var arr=['1','2','3','4'];
		var i=Math.floor(Math.random()*5);
		//
		alert(arr[i]);
	}	
	
	window.onload = function() {
		triggerShake();
	};
	
	//预设值
	
	var pageDom = {
		$wheels: $('.screen .wheels'),
		$wheels_wrap: $('.screen .wheels_wrap')
	}
	
	$('.axle .portrait').on('click',function(){
		//swing('unaward');//未中奖
		//swing('success');//完善信息-提交成功
		//swing('unfinished');//心盘尚未满3个
		//swing('done');//不要贪心哟，已经许下了6个愿望
		//swing('timeout');//时间不到
		
		swing('start');//摇一摇
	
	})
	
	$('.axle .pre_realize').on('click',function(){
		axleStart('pre');		
	})
	
	//删除商品
	$('.wrapper .close').on('click',function(){
		var obj =$(this).parent();
		var oImg = obj.find('img');
		var origin = oImg.attr('data-origin');
		obj.hide();
		obj.parent().removeClass('star_bg2').addClass('star_bg1');
		oImg.attr("src",origin);
	})
	
	//摇动弹框出来
	function swing(type) {
		$('.dialog').removeClass('hide').addClass('dialog_open');
		$('.dialog_wrap').hide();
		$('.dialog_content').addClass('waiting');
		var time;
		//模拟网络延迟
		setTimeout(function(){
			$('.dialog_content').removeClass('waiting'); 
			loadContent(type);
			$('.dialog_wrap').addClass('dialog_wrap1').show();
			
			//自动关闭
			if(type==='success'){
				time =setTimeout(function(){
					$('.dialog').addClass('hide').removeClass('dialog_open');
					clearTimeout(time);
				},2000);
			}
		},200);
	}
	
	//星星收缩动画
	function axleStart(type) {
		var time,time1;
		if(!pageDom.$wheels.hasClass('animation')){
			pageDom.$wheels.addClass('animation');
						
			var time =setTimeout(function(){
				pageDom.$wheels_wrap.css('opacity','0');
				
				if(type ==='pre'){
					$('.pre_realize').addClass('scaleStart');
					$('.tel').addClass('hide');
					
					$('.pre_realize').addClass('light_star');
					

					
					
					time1 =setTimeout(function(){
						$('.dialog').removeClass('hide').addClass('dialog_open');
						$('.dialog_wrap').hide();
						$('.dialog_content').addClass('waiting');
						
						
						//模拟网络延迟
						setTimeout(function(){
							$('.dialog_content').removeClass('waiting'); 
							loadContent(type);
							$('.dialog_wrap').addClass('dialog_wrap2').show();
						},200);
						
						clearTimeout(time1);//清定时器
					},1500);
					
				}else {
					$('.dialog').removeClass('hide').addClass('dialog_open');
					$('.dialog_wrap').hide();
					$('.dialog_content').addClass('waiting');
					
					
					//模拟网络延迟
					setTimeout(function(){
						$('.dialog_content').removeClass('waiting'); 
						loadContent(type);
						$('.dialog_wrap').addClass('dialog_wrap1').show();
						
						
						//设置弹出页面的礼物图片
						
						
	
					},2000);
					
				}
				
				clearTimeout(time);//清定时器
				
			},600);
		}
		
	}
	
	//根据类型加载不同的弹框内容
	function loadContent(type){
		$('.dialog_wrap').html('');
		var str ='';
		if(type==='start'){
			str ='<div class="dialog_main">'+
				'<h3>点击心仪的礼物加入心愿单</h3>'+
				'<div class="dialog_items">'+
					'<div class="dialog_item">'+
						'<div class="dialog_pic">'+
							'<img src="images/pro/1.png"/>'+
							'<div class="s_mask hide">'+
								'<div class="success">'+
									'<div class="icon">'+
										'<div class="line_short"></div>'+
										'<div class="line_long"></div>'+
									'</div>'+
								'</div>'+
								'<span class="txt">已加入</span>'+
							'</div>'+
						'</div>'+
						'<p class="pro_title">Roome智能晚安灯手势版</p>'+
					'</div>'+
					'<div class="dialog_item">'+
						'<div class="dialog_pic">'+
							'<img src="images/pro/2.png"/>'+
							'<div class="s_mask hide">'+
								'<div class="success">'+
									'<div class="icon">'+
										'<div class="line_short"></div>'+
										'<div class="line_long"></div>'+
									'</div>'+
								'</div>'+
								'<span class="txt">已加入</span>'+
							'</div>'+
						'</div>'+
						'<p class="pro_title">品胜移动电源LCD电库</p>'+
					'</div>'+
				'</div>'+
				'<div class="btnChange">'+
					'<span>再摇摇，换一批</span>'+
				'</div>'+
				'<i class="close"></i>'+
			'</div>';
			$('.dialog_wrap').append(str);
			
		}else if(type==='pre'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_award"><img src="./images/pro/1.png"></div>'+
					'<p class="txt_award">心愿成真！星盘认证你为今日幸运星！XXXX是你的啦！</p>'+
					'<div class="getAward">'+
						'<a href="###">立即领取</a>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		}else if(type==='unfinished'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_state">'+
						'<div class="state_pic">'+
							'<img src="images/tips/tips3.png">'+
						'</div>'+
						'<p class="dialog_tips">心盘尚未完成，请至少许下3个心愿</p>'+
						'<div class="btnChange">'+
							'<span>去许愿</span>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		//swing('unaward');//未中奖
		//swing('success');//完善信息-提交成功
		//swing('unfinished');//心盘尚未满3个
		//swing('done');//已经参加，明年再来
		//swing('timeout');//时间不到
		}else if(type==='unaward'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_state">'+
						'<div class="state_pic">'+
							'<img src="images/tips/tips0.png">'+
						'</div>'+
						'<p class="dialog_tips">哎只差一点点就实现愿望了</p>'+
						'<div class="dialog_tips2">'+
							'<a href="">去半价优惠区给自己来点补偿 &gt;&gt;</a>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		}else if(type==='success'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_state">'+
						'<div class="state_pic">'+
							'<img src="images/tips/tips4.png">'+
						'</div>'+
						'<p class="dialog_tips2">生日信息提交成功！马上许愿吧！</p>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
			//xuyaoguanbi
		}else if(type==='done'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_state">'+
						'<div class="state_pic">'+
							'<img src="images/tips/tips1.png">'+
						'</div>'+
						'<p class="dialog_tips">不要太贪心哟~已经许下6个愿望了！</p>'+
						'<p class="dialog_tips1">之前的心愿不满意? 删掉可以再玩哦</p>'+
						'<div class="btnChange">'+
							'<span>知道了</span>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		}else if(type==='timeout'){
			str ='<div class="dialog_main">'+
					'<div class="dialog_state">'+
						'<div class="state_pic">'+
							'<img src="images/tips/tips2.png">'+
						'</div>'+
						'<p class="dialog_tips">星盘魔力不足，请在生日前30天内来许愿。</p>'+
						'<div class="btnChange">'+
							'<span>知道了</span>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		}else{
			alert('没有了');
		}
	}
	
	//已加入
	$('.dialog_wrap').on('click','.dialog_pic',function(){
		var obj =$(this).find('.s_mask');
		if(obj.hasClass('hide')){
			obj.removeClass('hide');
		}else{
			obj.addClass('hide');
		}
		
	})
	
	//点击礼物弹窗关闭
	$('.dialog_wrap').on('click','.close',function(){
		$('.s_mask').addClass('hide');
		$('.wheels_wrap').css('opacity',1);
		$('.wheels').removeClass('animation');
		$('.dialog').addClass('hide').removeClass('dialog_open');
	})
	
	//礼物
	var giftArr =['1.png','2.png','3.png','4.png','5.png','6.png'];
	
	//添加礼物
	var imgArr =[];
	
	//对话框下再次摇一摇
	$('.dialog_wrap').on('click','.btnChange span',function(){
		$('.dialog_pic').each(function(i){
			if(!$(this).find('.s_mask').hasClass('hide')){
				imgArr.push($(this).find('img').attr('src'));
			}
			
		});
		
		if(imgArr.length!=0){
			imgArr = imgArr.unique();
			var len= Math.min(imgArr.length,6);
			for(var i=0;i<len;i++){
				$($('.wheel')[i]).removeClass('star_bg1').addClass('star_bg2');
				$($('.wheel')[i]).find('img').attr('src',imgArr[i]);
				$($('.wheel')[i]).find('.wheel_list').show();
			}
		}
		var length = $('.wheels_wrap .star_bg2').length;
		if(length >=3){
			$('.axle .portrait').addClass('hide');
			$('.axle .pre_realize').removeClass('hide');
		}
		if($('.wheels_wrap .star_bg2')){}
		//关闭
		$('.s_mask').addClass('hide');
		$('.wheels_wrap').css('opacity',1);
		$('.wheels').removeClass('animation');
		$('.dialog').addClass('hide').removeClass('dialog_open');
	})
	
	//去重复
	Array.prototype.unique = function(){
		var res = [];
		var json = {};
		for(var i = 0; i < this.length; i++){
			if(!json[this[i]]){
				res.push(this[i]);
				json[this[i]] = 1;
			}
		}
		return res;
	}
	
	//规则的弹出效果
	$('.rule').on('click',function(){
		$('.rule_msg').animate({
			'left':'50%',
			'margin-left':'-45%'
		});
	})
	
	//规则的收起效果
	$('.rule_msg').on('click','.close',function(){
		$('.rule_msg').animate({
			'left':'100%',
			'margin-left':'0'
		});
	})
	
	//留言信息的展示和收起
	$('.icon-msg').on('click',function(){
		var obj = $('.alert_msg');
		if(obj.hasClass('hide')){
			obj.removeClass('hide');
		}else {
			obj.addClass('hide');
		}
	})
	
	
	
	
	var dialog = require('dialog');
	
	$('#btn').on('click',function(){
		//dialog.tips('jia');
		//dialog.tips('请输入您的真实姓名','animate');
		//dialog.createMask();
		//关闭遮罩
		/*if(true){
			var time3 = setTimeout(function(){
				dialog.closeMask('.t_mask');
				clearTimeout(time3);
			},3000);		
		}*/
		var str ='<div class="tips_wrapper">'+
					'<div class="desc">'+
						'<span>请确认姓名和生日日期与身份证上信息一致，提交后将无法修改。若填写不正确，中奖后将无法领奖哟！</span>'+
					'</div>'+
					'<div class="tips_footer">'+
						'<a href="###" class="button btn_bg1" id="checkBack">返回检查</a>'+
						'<a href="###" class="button btn_bg2">确认提交</a>'+
					'</div>'+
				'</div>';
		dialog.createMask();
		dialog.tips2(str);
		
	})
	
	$('body').on('click','#checkBack',function(){
		dialog.closeMask('.tip_info2');
	})
	
	$('#btn2').on('click',function(){
		dialog.tips('请输入您的真实姓名','animate');
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})