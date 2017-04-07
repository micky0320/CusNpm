/**
 * Created by lixiaoxi on 2017/2/4.
 * @description
 */
(function (WIN, envLib, callApp) {
    callApp = callApp || {};

    var defaultAppLink = 'patoa://pingan.com/home';
    var iframe = null;
    var timer = null;

    /**
     * 基本上Android上使用iframe，ios上使用location.href
     */

    function withIframe(link) {
        iframe = document.createElement('iframe');
        var body = document.body;
        iframe.style.cssText = 'display:none;width=0;height=0';
        body.appendChild(iframe);
        iframe.src = link;
        // location.href = link;
    }

    function withLoc(link) {
        location.href = link;
    }

    function withLink(f) {
        var h = document.createElement('a');
        h.setAttribute('href', f);
        h.style.display = 'none';
        document.body.appendChild(h);
        var g = document.createEvent('HTMLEvents');
        g.initEvent('click', !1, !1);
        h.dispatchEvent(g);
    }

    function callAppLink(url, thirdAppCallback) {
        url = url || defaultAppLink;
        if (envLib.os.isIOS) {
            if (envLib.browser.isSafari) {
                alert('跳转下载页面');
            } else {
                withLoc(url);
            }
        } else {
            withIframe(url);
        }

        if (!!envLib.thirdapp && !envLib.thirdapp.isAnyDoor && !envLib.thirdapp.isYzt) {
            !!thirdAppCallback && thirdAppCallback()
        } else if (envLib.browser.isSafari) {

        } else {
            timer = setTimeout(function () {
                //下载链接
                location.href = 'https://www.baidu.com';
            }, 2000);
        }
    }

    callAppLink && (callApp.callAppLink = callAppLink);
})(window, window.envLib, window.callApp || (window.callApp = {}));
