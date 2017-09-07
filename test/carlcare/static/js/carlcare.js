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

        // 效果
        $('.sp-effect1').waypoint(function(){
            // $(this).toggleClass('active');
            $(this).toggleClass('animation-fade-in-up');
        }, {
            offset: '100%'
        });
        $('.sp-effect2').waypoint(function(){
            // $(this).toggleClass('active');
            $(this).toggleClass('animation-fade-in-dowm');
        }, {
            offset: '100%'
        });
    })


}(document, window, jQuery);
