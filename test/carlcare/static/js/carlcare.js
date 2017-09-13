!function(document, window, $) {
    var Site = window.Site;
    $(document).ready(function($) {
        Site.run();
        // 首页全屏
        function screenBanner() {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
　　　　    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            $('.slick-slide, .slick-blur').css({
                width: w + 'px',
                height: h + 'px'
            })
        }
        screenBanner();
        $(window).resize(function () {
            screenBanner();
        });
        // 点击更多加载
        $('.carl-product-plus-cont').click(function () {
            var obj = $('.carl-product-more');
            if (obj.hasClass('expand')) {
                obj.removeClass('expand');
            } else {
                obj.addClass('expand');
            }
        });

        $('.carl-home-tab>ul>li').click(function () {
            var _this = $(this);
            var index = $(this).index();
            $('.carl-home-tab>ul>li').removeClass('active');
            _this.addClass('active');
            $('.carl-product .tab-area').removeClass('active').eq(index).addClass('active')
            $('html, body').animate({
                scrollTop: _this.offset().top + _this.height()
            }, 1000);
        });

        $('.carl-product-list li').click(function () {
            var obj = $('.carl-product-list li');
            var index = $(this).index();
            $('.carl-product-detail-list').hide().eq(index).fadeIn();
        })

        var istrue = true;
        $(window).on("scroll", function () {
            // 数字加载动画
            // countUp();
        })
        // countUp();
        function countUp () {
            var s = $(window).scrollTop();
            var t = $('.statistics').offset().top;
            if (s == t) {
                $(".timer").countTo({
                    lastSymbol: "+", //显示在最后的字符
                    from: 0,  // 开始时的数字
                    speed: 2000,  // 总时间
                    refreshInterval: 30,  // 刷新一次的时间
                    beforeSize: 0, //小数点前最小显示位数，不足的话用0代替
                    decimals: 0,  // 小数点后的位数，小数做四舍五入
                    onUpdate: function() {
                    },  // 更新时回调函数
                    onComplete: function() {
                        for(i in arguments){
                            //console.log(arguments[i]);
                        }
                    }
                });
            }

        }

        // hover
        $('.android-zone').hover(function () {
            $('.android').css({ 'top': '60px'})
        }, function () {
            $('.android').css({ 'top': '-200px'})
        });
        $('.google-zone').hover(function () {
            $('.google-play').css({ 'top': '60px'})
        }, function () {
            $('.google-play').css({ 'top': '-200px'})
        })
        // 效果
        $('.custom-load').waypoint(function(){
            $(this).toggleClass('loaded');
        }, {
            offset: '50%',
            triggerOnce: true
        });

        // selectpicker
        $('.selectpicker').selectpicker();

    })


}(document, window, jQuery);
