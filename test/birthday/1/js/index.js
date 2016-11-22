define(function(require, exports, module) {
	var shake = require('shake');
	var $ = require('fx');
	var swiperJS = require('swiper');
	$(function(){
		 var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplayDisableOnInteraction: false,
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
		//新增加
		if($('.star_bg1').length>3){
			$('.pre_realize').addClass('hide');
			$('.portrait').removeClass('hide');
			
		}
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
	function axleStart() {
		var time,time1;
		if(!pageDom.$wheels.hasClass('animation')){
			pageDom.$wheels.addClass('animation');
						
			var time =setTimeout(function(){
				pageDom.$wheels_wrap.css('opacity','0');
				

				$('.pre_realize').addClass('scaleStart');
				$('.tel').addClass('hide');
				
				$('.pre_realize').addClass('light_star');
				
				$('.wheels').addClass('wheels_shine');//新增
				

				
				
				time1 =setTimeout(function(){
					$('.dialog').removeClass('hide').addClass('dialog_open');
					$('.dialog_wrap').hide();
					$('.dialog_content').addClass('waiting');
					
					
					//模拟网络延迟
					setTimeout(function(){
						$('.dialog_content').removeClass('waiting');				
						loadContent('pre');
						$('.dialog_wrap').addClass('dialog_wrap2').show();
					},200);
					
					clearTimeout(time1);//清定时器
				},1500);
					
				
				clearTimeout(time);//清定时器
				
			},600);
		}
		
	}
	
	//根据类型加载不同的弹框内容
	function loadContent(type){
		$('.dialog_wrap').html('');
		/*if(str&&typeof str==='string'){
			$('.dialog_wrap').append(str);
		}*/
		
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
						'<div class="btnClose">'+
							'<span>去许愿</span>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		//swing('unaward');//未中奖
		//swing('success');//完善信息-提交成功
		//swing('unfinished');//心盘尚未满3个
		//swing('done');//不要贪心哟，已经许下了6个愿望
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
						'<div class="btnClose">'+
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
						'<div class="btnClose">'+
							'<span>知道了</span>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('.dialog_wrap').append(str);
		}else{
			alert('没有了');
		}
	}
	
	//礼物加入和取消
	$('.dialog_wrap').on('click','.dialog_pic',function(){
		var obj =$(this).find('.s_mask');
		if(obj.hasClass('hide')){
			if($('.star_bg1').length!==0){
			
				$($('.star_bg1')[0]).find('img').attr('src',$(this).find('img').attr('src'));
				$($('.star_bg1')[0]).find('.wheel_list').show();
				$($('.star_bg1')[0]).removeClass('star_bg1').addClass('star_bg2');
				
			}else {
				swing('done');
				alert('添加心愿已经满了，删除后再添加');
				
			}
			if($('.star_bg1').length<=3){
				$('.portrait').addClass('hide');
				$('.pre_realize').removeClass('hide');
			}
			obj.removeClass('hide');
			
		}else{
			//取消礼物
			var selectImg = $(this).find('img').attr('src');
			//alert(selectImg);
			$('.wheel').each(function(i){
			
				var addImg = $('.star_bg2').eq(i).find('img').attr('src');
				if(selectImg===addImg){
					$('.wheel').eq(i).removeClass('star_bg2').addClass('star_bg1');
					$('.wheel').eq(i).find('.wheel_list').hide();
				}
				
			})
			//新增
			if($('.star_bg2').length<3){
				$('.portrait').removeClass('hide');
				$('.pre_realize').addClass('hide');
			}
			
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
	
	//弹出框关闭
	$('.dialog_wrap').on('click','.btnClose span',function(){
		$('.wheels_wrap').css('opacity',1);
		$('.wheels').removeClass('animation');
		$('.dialog').addClass('hide').removeClass('dialog_open');
	})
	
	//对话框下再次摇一摇
	$('.dialog_wrap').on('click','.btnChange span',function(){
		
		//切换图片
		$('.dialog_pic').each(function(i){
			$(this).find('.s_mask').addClass('hide');
		})
		$('.dialog_pic').eq(0).find('img').attr('src','images/pro/3.png');
		$('.dialog_pic').eq(1).find('img').attr('src','images/pro/4.png');
		

		//关闭
		//$('.s_mask').addClass('hide');
		//$('.wheels_wrap').css('opacity',1);
		//$('.wheels').removeClass('animation');
		//$('.dialog').addClass('hide').removeClass('dialog_open');
	})
	
	
	//规则的弹出效果
	$('.rule').on('click',function(){
		var mask = $('<div class="t_mask"></div>');
		$("body").append(mask);
		$('.rule_msg').css('zIndex',10009).animate({
			'left':'50%',
			'margin-left':'-45%'
		});
	})
	
	//规则的收起效果
	$('.rule_msg').on('click','.close',function(){
		$('.rule_msg').animate({
			'left':'100%',
			'margin-left':'0'
		},function(){
			$('.rule_msg').css('zIndex',99);
			$('.t_mask').remove();
		});
	})
	
	//留言信息的展示和收起
	$('.icon-msg').on('click',function(){
		var obj = $('.alert_msg');
		if(obj.hasClass('hide')){
			obj.removeClass('hide');
			setBarrager();//出现弹幕
		}else {
			obj.addClass('hide');
			$.fn.barrager.removeAll();
			clearInterval(looper);
			$('.msg_contents').html();
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
		dialog.tips('请输入您的真实姓名,请再次确认重新输入','animate');
	})
	
	$('#btn3').on('click',function(){
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
					'<h3 class="title">已提交</h3>'+
					'<div class="desc">'+
						'<span>请确认姓名和生日日期与身份证上信息一致，提交后将无法修改。若填写不正确，中奖后将无法领奖哟！</span>'+
					'</div>'+
					'<div class="desc_one">'+
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
	
	$('#btn4').on('click',function(){
		var str ='<div class="tips_wrapper">'+
					'<div class="desc">'+
						'<span>优惠码将以短信方式发送到183****22，请注意查收。</span>'+
					'</div>'+
					'<div class="desc_one">'+
						'<span>所有奖品（包括半价优惠区产品）都需前往成都千机网各门店自提，不支持快递配送，敬请谅解。</span>'+
					'</div>'+
					'<div class="tips_footer">'+
						'<a href="###" class="button btn_bg1" id="checkBack">查看地址</a>'+
						'<a href="###" class="button btn_bg2">好滴！</a>'+
					'</div>'+
				'</div>';
		dialog.createMask();
		dialog.tips2(str);
		
	})
	
	$('#btn5').on('click',function(){
		var str ='<div class="tips_wrapper">'+
					'<div class="desc_two">'+
						'<span>确定要领取此优惠码吗？</span>'+
					'</div>'+
					'<div class="desc_two">'+
						'<span>你只有一次领取机会哟～</span>'+
					'</div>'+
					'<div class="tips_footer1">'+
						'<a href="###" class="button btn_bg1">再考虑看看</a><br/>'+
						'<a href="###" class="button btn_bg2">确认领取</a>'+
					'</div>'+
				'</div>';
		dialog.createMask();
		dialog.tips2(str);
		
	})
	
	//送祝福
	$('#btn6').on('click',function(){
		var str ='<div class="tips_wrapper tips_bg">'+
					'<h4 class="tips_title">说出你的祝福</h4>'+
					'<div class="tips_area"><textarea></textarea></div>'+
					'<div class="tips_footer">'+
						'<a href="###" class="button btn_bg2">发送</a>'+
					'</div>'+
					'<span class="close"></span>'+
				'</div>';
		dialog.createMask();
		dialog.tips2(str);
		
	})
	
	
	//弹幕
	var looper=null;
	function setBarrager() {
		var data=[{ 
			img:'images/pro/portrait.png',
			info:'大叔生日快乐', //文字 
			href:'javascript:;', //链接 
			close:false, //显示关闭按钮 
			speed:6, //延迟,单位秒,默认6   
		},
		{ 
			img:'images/pro/portrait.png',
			info:'大叔，生日快乐哟！', //文字 
			href:'javascript:;', //链接  
			close:false, //显示关闭按钮 
			speed:6, //延迟,单位秒,默认6  
		},
		{ 
		   img:'images/pro/portrait.png',
		   info:'大叔，生日快乐哟！', //文字 
		   href:'javascript:;', //链接 
		   close:false, //显示关闭按钮 
		   speed:6, //延迟,单位秒,默认6  
		},
		{ 
			img:'images/pro/portrait.png',
			info:'大叔，生日快乐哟！', //文字 
			href:'javascript:;', //链接 
			close:false, //显示关闭按钮 
			speed:6, //延迟,单位秒,默认6  
		},
		{ 
			img:'images/pro/portrait.png',
			info:'大叔，生日快乐哟！大叔，生日快乐哟！大叔，生日快乐哟！大叔，生日快乐哟！', //文字 
			href:'javascript:;', //链接 
			close:false, //显示关闭按钮 
			speed:6, //延迟,单位秒,默认6  
		}];
		//每条弹幕发送间隔
		var looper_time=2*1000;
		var items=data;
		//弹幕总数
		var total=data.length;
		//是否首次执行
		var run_once=true;
		
		//弹幕索引
		var index=0;
		clearInterval(looper);
		$('.msg_contents').html();
		//先执行一次
		barrager1();
		function  barrager1(){
			if(run_once){
				//如果是首次执行,则设置一个定时器,并且把首次执行置为false
				looper=setInterval(barrager1,looper_time);                
				run_once=false;
			}
			//发布一个弹幕
			$('.msg_contents').barrager(items[index]);
			//索引自增
			index++;
			//所有弹幕发布完毕，清除计时器。
			if(index == total){		 
				clearInterval(looper);
				return false;
			}
		}	
	}
	
	       

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})