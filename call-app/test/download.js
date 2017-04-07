/**
 * Created by SamMFFL on 17/2/7.
 */
(function(){
    var imgUrl = "//m.pingan.com/c2/sys/tuiguang/weixin/img/icon_20160511.png";  //注意必须是绝对路径
    var lineLink = "//m.pingan.com/c2/sys/tuiguang/weixin/weixin.html";   //同样，必须是绝对路径
    var descContent = '卡多？密码多？忘还款？一账通APP帮您“一站式”解决，一个就够了'; //分享给朋友或朋友圈时的文字简介
    var shareTitle = '一账通APP';  //分享title
    var appid = ''; //apiID，可留空

    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            "appid": appid,
            "img_url": imgUrl,
            "img_width": "120",
            "img_height": "122",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('send_msg', res.err_msg);
        })
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline',{
            "img_url": imgUrl,
            "img_width": "120",
            "img_height": "122",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('timeline', res.err_msg);
        });
    }
    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            shareTimeline();
        });
    }, false);

    //auto download
}());


(function(){
    var getElement = document.querySelector.bind(document),
        userAgent = navigator.userAgent,
        iosUrl = '//itunes.apple.com/cn/app/id932365909',
        androidUrl = '//download.pingan.com.cn/app/android/YZT_Login.apk ',
        soEl = getElement('#box'),
        newApp = getQueryString('app'),
        appLink = getQueryString('appLink'),
        link ='patoa://pingan.com/home';

    if(!!newApp){
        if(newApp == 'yzt-ptg02') {
            androidUrl = '//download.pingan.com.cn/app/android/yzt-ptg02.apk';
        } else if (newApp == 'yizhangtong-ydgw_seo-release') {
            androidUrl = '//download.pingan.com.cn/app/android/yizhangtong-ydgw_seo-release.apk';
        } else {
            androidUrl = '//download.yztcdn.com/app/android/' + newApp + '.apk';
        }
    }
    if(!!appLink) {
        link = appLink.replace(/\|/g,'&');
    } else {
        link = 'patoa://pingan.com/home'
    }
    document.getElementById('downFixed').addEventListener('click', down, false);
    document.getElementById('downOne').addEventListener('click', down, false);
    document.getElementById('downSix').addEventListener('click', down, false);
    /* ----点击下载---- */
    function down() {
        if (/micromessenger/.test(userAgent.toLowerCase())) {
            document.getElementById('box').style.display = 'block';
            return;
        }
        if(/samsung/ig.test(userAgent)){
            window.location = link;
            setTimeout(function(){
                window.location.href="androidUrl"},1000);
        }

        if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)){
            window.location.href = iosUrl;
        } else if(/(Android)/i.test(userAgent)) {
            this.setAttribute('href', androidUrl);
        }
    }


    /* ----获取地址栏参数---- */
    function getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r !=null) return unescape(r[2]);return null;
    }
    /* ----唤醒app方法---- */
    function ifr(f) {
        var iframe = document.createElement('iframe');
        var body = document.body;
        iframe.style.cssText='display:none;width=0;height=0';
        body.appendChild(iframe);
        iframe.src = link;
        location.href = link;
    }
    function withLoc(f) {
        location.href = f;
    }
    function withIframe(f) {
        var ifr = document.createElement('iframe');
        document.body.appendChild(ifr);
        ifr.src=f;
    }
    function withLink(f) {
        var h = document.createElement("a");
        h.setAttribute("href", f);
        h.style.display = "none";
        document.body.appendChild(h);
        var g = document.createEvent("HTMLEvents");
        g.initEvent("click", !1, !1);
        h.dispatchEvent(g);
    }


    /* ----唤醒app---- */
    // 任意门不做跳转
    if (!/anydoor/ig.test(userAgent)) {
        if(/android/ig.test(userAgent)){
            withLink(link);
            setTimeout(reDown,1500);
        } else{
            location.href = link;
            setTimeout(reDown,1500);
        }
    }

    /* ----进入页面直接下载---- */
    function reDown(){

        if(!/micromessenger/.test(userAgent.toLowerCase())) {
            if(/(iPhone|iPad|iPod|iOS)/i.test(userAgent)){
                if(typeof(pa_sdcajax)=="function") {pa_sdcajax("WT.ti","yzt-wx1-ios",true)};
                window.location.href = iosUrl;
                return;
            }
            if(/(Android)/i.test(userAgent)) {
                if(typeof(pa_sdcajax)=="function"){pa_sdcajax("WT.ti","yzt-wx1-android",true);}
                window.location.href = androidUrl;
                return;
            }
        }
    }
})();