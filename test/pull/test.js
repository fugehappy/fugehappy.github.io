function dragDown(e) {
    var c = '<div class="dragdown_loading"><p><span></span></p><p data-txt="{0}" data-txt1="{1}" data-txt2="加载中……"><span>最后更新：今天<b></b></span></p></div><div class="dragdown_aborted"><em></em>哎呀，您的网络好像有问题。<br />稍后再试试吧！</div>';
    function d(f) {
        return document.getElementById(f)
    }
    // ajax
    function b(h, g, f) {
        var i = new XMLHttpRequest();
        i.onreadystatechange = function() {
            if (i.readyState == 4) {
                if (i.status == 200) {
                    g(i.responseText)
                } else {
                    f()
                }
            }
        }
        ;
        i.open("GET", h, true);
        i.send(null)
    }
    function a(h, f) {
        var g = document.createElement("script");
        g.setAttribute("type", "text/javascript");
        g.onload = f;
        g.setAttribute("src", h);
        document.body.appendChild(g)
    }
    
    // up
    if (e.upWrapId) {
        (function() {
            var h = document.createElement("div"), g, f;
            h.innerHTML = c.replace("{0}", "上拉加载更多").replace("{1}", "松开加载更多");
            g = h.firstChild;
            f = function() {
                var i = new Date();
                g.querySelector("p:last-child b").innerHTML = i.getHours() + ":" + i.getMinutes()
            }
            ;
            h.className = "dragup_wapper";
            d(e.upWrapId).appendChild(h);
            // e.up_page = e.up_page || 0;
            // e.upUrl.indexOf("?") == -1 && (e.upUrl += "?v=4");
            document.addEventListener("touchstart", function(i) {
                if (g.isLoad) {
                    return
                }
                h.className = "dragup_wapper";
                g.className = "dragdown_loading";
                g.oh = g.offsetHeight;
                h.cy = i.touches[0].clientY;
                h.isLock = 0
            }, false);
            document.addEventListener("touchmove", function(j) {
                if (g.isLoad) {
                    return
                }
                if (h.isLock) {
                    j.preventDefault();
                    var i = (h.cy - j.touches[0].clientY) * 0.5;
                    i < g.oh ? g.classList.remove("dragdown_state1") : g.classList.add("dragdown_state1");
                    h.style.height = i + "px";
                    window.scrollBy(0, 100)
                } else {
                    if (j.touches[0].clientY < h.cy && Math.max(document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight >= Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) {
                        j.preventDefault();
                        h.isLock = 1;
                        h.cy = j.touches[0].clientY
                    }
                }
            }, false);
            document.addEventListener("touchend", function(j) {
                if (g.isLoad) {
                    return
                }
                var i = h.firstElementChild.scrollHeight;
                h.classList.add("dragup_run");
                if (h.clientHeight > i) {
                    g.isLoad = 1;
                    g.classList.add("dragdown_state2");
                    h.style.height = i + "px";
                    if (e.beforeSend && !e.beforeSend()) {
                        h.style.height = "";
                        f();
                        g.isLoad = 0;
                        return
                    }
                    if (e.type == "jsonp") {
                        a(e.upUrl.replace("{0}", ++e.down_page), function() {
                            h.style.height = "";
                            f();
                            g.isLoad = 0
                        })
                    } else {
                        e.upCallback && e.upCallback();
                        h.style.height = "";
                        g.isLoad = 0
                        /*b(e.upUrl.replace("{0}", ++e.up_page), function(k) {
                            h.style.height = "";
                            e.upCallback && e.upCallback(k);
                            f();
                            g.isLoad = 0
                        }, function() {
                            h.style.height = "";
                            h.classList.add("dragdown_wapper1");
                            g.isLoad = 0
                        })*/
                    }
                } else {
                    h.style.height = "";
                    g.classList.remove("dragdown_state1")
                }
            }, false);
            f()
        })()
    }
}
;