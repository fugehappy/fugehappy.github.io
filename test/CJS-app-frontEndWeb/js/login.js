/**
 * 验证登陆
 */
function checkLogin() {
    var btn = $('.login-form .wei-btn');
    var val = $('#login-pw').val();
    // 密码
    var regStr = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    var result = regStr.test(val);

    if (!$('#login-user').val() || !result) {
        btn.removeClass('login-btn-active').addClass('login-btn-disabled');
    }
    else {
        btn.removeClass('login-btn-disabled').addClass('login-btn-active');
    }
    return false;
}

/**
 * 验证电话格式
 */
function checkTel() {
	var tel = $('#tel');
	var telVal = $('#tel').val();
	if (!telVal) {
		return false;
	}
	var timeout = null;
	if (!(/^1(3|4|5|7|8)\d{9}$/.test(telVal))) {
        // 错误提示
		/*$('.login-tip').fadeIn();
		timeout = setTimeout(function() {
			$('.login-tip').fadeOut();
		}, 3000);*/
        $.errTips('手机格式有误');
	}
	return false; 		
}

/**
 * 验证新密码
 */
function checkNewPwd(obj) {
	var btn = $('.login-form .wei-btn');
	var val = $(obj).val();
	var regStr = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
	if (regStr.test(val)) {
		btn.removeClass('login-btn-disabled').addClass('login-btn-active');
	}
	else {
		btn.removeClass('login-btn-active').addClass('login-btn-disabled');
	}
	return false;
}

/**
 * 验证电话,验证码
 */
function checkResult() {
	var btn = $('.login-form .wei-btn');
	var tel = $('#tel');
	var telVal = $('#tel').val();
	var code = $('#vcode').val();
	if (!(/^1(3|4|5|7|8)\d{9}$/.test(telVal)) || !code) {
		btn.removeClass('login-btn-active').addClass('login-btn-disabled');
		return false;
	}
	else if (code) {
		btn.removeClass('login-btn-disabled').addClass('login-btn-active');
	}
	return false;
}

/**
 * 短信输入，可进行下步操作
 */
function duanxin(obj) {
	var _this = $(obj);
	var btn = $('.login-form .wei-btn');
	if (!_this.val()) {
		btn.removeClass('login-btn-active').addClass('login-btn-disabled');
	}
	else {
		btn.removeClass('login-btn-disabled').addClass('login-btn-active');
	}
	return false;
}

/**
 * 验证电话,验证码,同意协议，进行下步操作
 */
function checkRegister() {
	var btn = $('.login-form .wei-btn');
	var tel = $('#tel');
	var telVal = $('#tel').val();
	var code = $('#vcode').val();
    var flag = !!$('#wei-checkbox').is(':checked');

	if (code && (/^1(3|4|5|7|8)\d{9}$/.test(telVal)) && flag) {
		btn.removeClass('login-btn-disabled').addClass('login-btn-active');
	}
    else {
        btn.removeClass('login-btn-active').addClass('login-btn-disabled');
    }
	return false;
}