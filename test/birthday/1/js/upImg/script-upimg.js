$(function() {
    // 单文件上传
    $('.upload-btn input').on('change', function () {
        var _this = $(this);
        var file = this.files[0];
        console.log(file);
        if (!file) return false;
        // 检验是否为图像文件
        if (!/image\/\w+/.test(file.type)) {
            alert('请上传图片文件');
            return false;
        }
        if (file.size > 1024 * 4) {
            alert('上传图片过大');
            return false;
        }

        var fr = new FileReader();
        // 将文件以Data URL形式读入页面
        fr.readAsDataURL(file);

        var img = new Image();
        var uploadBtn = _this.parent(); // 上传按钮
        uploadBtn.hide();
        var upImg = uploadBtn.siblings('.upload-img');
        upImg.addClass('loading');      // 等待

        fr.onload = function () {
            $('.delBtn').show(); // 删除按钮显示
            img.src = this.result;
            img.onload = function () {
                // 图片区域填充
                uploadBtn.siblings('.upload-img').html(img);
                // 使用缩放功能(iscroll-zoom.js)
                var scroll = new IScroll(upImg[0], {
                    zoom: true,
                    scrollX: true,
                    scrollY: true,
                    mouseWheel: true,
                    bounce: false,
                    wheelAction: 'zoom'
                });

                // 模拟延时
                setTimeout(function () {
                    // 移除等待，显示上传图片
                    upImg.removeClass('loading').find('img').css('opacity', 1);
                }, 1000);
            };
        };
    });

    // 删除上传图片
    $('.delBtn').on('click', function () {
        var _this = $(this);
        _this.hide();
        _this.nextAll('.upload-img').html('<img src="images/icon_add.png" class="icon"/>');
        $('.upload-btn').show();
        return false;
    });

    /**
    * imageData
    * param
    */
    function imageData(obj) {
        var _w = obj.w;
        var _h = obj.h;

        var canvas = document.createElement('canvas');

        canvas.width = _w;
        canvas.height = _h;
        var ctx = canvas.getContext('2d');

        var w = _w / obj.scroll.scale / obj.ratio;
        var h = _h / obj.scroll.scale / obj.ratio;
        var x = Math.abs(obj.scroll.x) / obj.scroll.scale / obj.ratio;
        var y = Math.abs(obj.scroll.y) / obj.scroll.scale / obj.ratio;

        ctx.drawImage(obj.img, x, y, w, h, 0, 0, _w, _h);
        return canvas.toDataURL();
    }
});

function previewImage(file) {
    var maxWidth  = 90;
    var maxHeight = 90;
    var img;
    var div = document.getElementById('preview');
    debugger;
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead onclick=$("#previewImg").click()>';
        img = document.getElementById('imghead');
        img.onload = function () {
            var rect = clacImgZoomParam(maxWidth, maxHeight, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
            // img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        };
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    }
    else // 兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(maxWidth, maxHeight, img.offsetWidth, img.offsetHeight);
        // status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {top: 0, left: 0, width: width, height: height};
    if (width > maxWidth || height > maxHeight) {
        var rateWidth = width / maxWidth;
        var rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }
        else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}






































