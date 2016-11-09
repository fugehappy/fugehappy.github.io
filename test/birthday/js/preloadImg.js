!function(a, b) {
    this[a] = b(),
    "function" == typeof define && (define.amd || define.cmd) ? define(this[a]) : "object" == typeof module && (module.exports = this[a])
}("preloadImg", function() {
    var m, b = {}, c = {}, d = [], e = 0, f = 0, g = 0, h = 0, i = 0, j = null , k = 0, l = 0, n = !1;
    return b.init = function(a) {
        a = a || {},
        a.imgs && (i = parseInt(a.limitLoadingNums) || 2,
        k = parseInt(a.totalTimeout) || 3e4,
        l = parseInt(a.timeout) || 5e3,
        j = a.callback || function() {}
        ,
        c.splitImg(a.imgs),
        c.loadImg(),
        c.handleOvertime())
    }
    ,
    c.loadImg = function() {
        if (h != d.length && i > f) {
            var a = d[h];
            h++,
            f++,
            a.crossDomain ? c.loadCrossDomainImg(a.url) : c.loadSameDomainImg(a.url),
            c.loadImg()
        }
    }
    ,
    c.loadSameDomainImg = function(a) {
        var b = new XMLHttpRequest
          , d = function() {
            n || (f--,
            g++,
            c.handleProgress())
        }
          , e = setTimeout(function() {
            b.abort()
        }, l);
        b.open("GET", a, !0),
        b.onabort = b.onload = b.onerror = function() {
            0 != e && clearTimeout(e),
            d()
        }
        ,
        b.send()
    }
    ,
    c.loadCrossDomainImg = function(a) {
        var b = new Image
          , d = !1
          , e = function() {
            n || (f--,
            g++,
            c.handleProgress())
        }
          , h = setTimeout(function() {
            d = !0,
            e()
        }, l);
        b.onload = b.onerror = function() {
            0 != h && clearTimeout(h),
            d || e()
        }
        ,
        b.src = a
    }
    ,
    c.handleProgress = function() {
        var a = Math.round(100 * (g / e));
        n = g == e,
        n && 0 != m && clearTimeout(m),
        j({
            progress: a,
            isFinish: n
        }),
        c.loadImg()
    }
    ,
    c.handleOvertime = function() {
        m = setTimeout(function() {
            g = e,
            c.handleProgress()
        }, k)
    }
    ,
    c.splitImg = function(a) {
        for (var b in a)
            d.push({
                url: a[b],
                crossDomain: c.isCrossDomain(a[b])
            });
        e = d.length
    }
    ,
    c.isCrossDomain = function(a) {
        var d, b = !1, c = /^((https?:)?\/\/[\w\-\.]+\.(com|cn|net|org)(:\d+)?)\/.*/;
        return b = (d = c.exec(a)) ? !(d[1] == window.location.protocol + "//" + window.location.host) : !1
    }
    ,
    b
});
