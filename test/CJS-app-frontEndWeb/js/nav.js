var showRel = 0
  , resetScrollEle = function() {
    var a = $("#cate_lev2_div_" + showRel + ">li").find("a").eq(0).width() + "px";
    $(".cate_icon_img").css({
        width: a,
        height: a
    })
};
window.onload = function() {
    $("img[data-original]").lazyload();
};
window.addEventListener("resize", function() {
    resetScrollEle()
});
window.addEventListener("orientationchange", function() {
    resetScrollEle()
});
var lv2S, nav = $(".class_list_nav_box ul>a"), cSrc = function(a) {
    a.each(function(a, b) {
        var d = new Image
          , e = $(b).attr("data-src");
        d.onload = function() {
            !0 == d.complete && $(b).attr("src", e)
        }
        ;
        d.src = e
    })
};
lv1S = new iScroll("class_list_nav_box",{
    hScrollbar: !1,
    vScrollbar: !1,
    hScroll: !1,
    vScroll: !0
});
lv2S = new iScroll("class_box_inner",{
    hScrollbar: !1,
    vScrollbar: !1,
    hScroll: !1,
    vScroll: !0,
    checkDOMChanges: !0
});
// 导航切换
nav.bind("click", function() {
    lv2S.stop();
    $(this).children("li").addClass("on");
    $(this).siblings().children("li").removeClass("on");
    var a = $(this).attr("rel");
    showRel = a;
    a = $("#cate_lev2_div_" + a);
    a.show().siblings().hide();
    cSrc(a.find("img"));
    resetScrollEle();
    lv2S.destroy();
    lv2S = new iScroll("class_box_inner",{
        hScrollbar: !1,
        vScrollbar: !1,
        hScroll: !1,
        vScroll: !0,
        checkDOMChanges: !0
    });
    lv1S.scrollToElement(this, 500)
});
nav.eq(0).trigger("click");
$(function() {
	// 搜索
    $("#_keyword").bind("focus", function() {
        $(this).parent().trigger("click");
        $(".main_wrapper").hide();
        $("#mix_search_div").show();
        $("#keyword").focus()
    });
	// 返回
    $(".mix_back").bind("click", function() {
        $("#mix_search_div").hide();
        $(".main_wrapper").show()
    });
    $(".text_box input").keyup(function() {
        var val = $.trim($(this).val());
        if (val) {
            $('.association').show();
            $('.hot-search-box').hide();
            $('.search-history').hide();
        }
        else {
            $('.hot-search-box').show();
            $('.search-history').show();
            $('.association').hide();
        }
    })
});
$(function() {
    FastClick.attach(document.body);
});
