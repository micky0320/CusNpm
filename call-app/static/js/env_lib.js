/**
 * Created by lixiaoxi on 2017/2/4.
 * @description
 */

(function (WIN, envLib) {
    envLib = envLib || {};
    var userAgent = WIN.navigator.userAgent,
        temp;
    var os;
// 获取操作系统
    if (userAgent.match(/Safari/) && (temp = userAgent.match(/Android[\s\/]([\d\.]+)/i))) {
        os = {
            version: temp[1],
            isAndroid: true,
        };
        if (userAgent.match(/Mobile\s+Safari/)) {
            os.name = 'Android';
        } else {
            os.name = 'AndroidPad';
            os.isAndroidPad = true;
        }
    } else if (temp = userAgent.match(/(iPhone|iPad|iPod)/)) {
        var name = temp[1];
        var versions = userAgent.match(/OS ([\d_\.]+) like Mac OS X/i);
        os = {
            name: name,
            isIPhone: name === 'iPhone' || 'iPod' === name,
            isIPad: 'iPad' === name,
            isIOS: true,
            version: versions[1].replace(/_/ig, '.')
        };
    } else if (temp = userAgent.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) {
        os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: temp[1]
        }
    } else {
        os = {
            name: 'unknown',
            version: '0.0.0'
        };
    }


// 获取宿主APP
    var browser;
    if (temp = userAgent.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
        browser = {
            name: 'UC',
            isUC: true,
            version: temp[1]
        };
    } else if (temp = userAgent.match(/MQQBrowser\/([\d\.]+)/)) {
        browser = {
            name: 'QQ',
            isQQ: true,
            version: temp[1]
        };
    } else if (temp = userAgent.match(/Firefox\/([\d\.]+)/)) {
        browser = {
            name: 'Firefox',
            isFirefox: true,
            version: temp[1]
        };
    } else if(temp = userAgent.match(/baidubrowser\/([\d\.]+)/)){
        browser ={
            name: 'Baidu',
            isBaidu:true,
            versions: temp[1],
        };
    } else if ((temp = userAgent.match(/MSIE\s([\d\.]+)/)) ||
        (temp = userAgent.match(/IEMobile\/([\d\.]+)/))) {
        browser = {version: temp[1]};
        if (userAgent.match(/IEMobile/)) {
            browser.name = 'IEMobile';
            browser.isIEMobile = true;
        } else {
            browser.name = 'IE';
            browser.isIE = true;
        }

        if (userAgent.match(/Android|iPhone/)) {
            browser.isIELikeWebkit = true;
        }
    } else if (temp = userAgent.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
        browser = {
            name: 'Chrome',
            isChrome: true,
            version: temp[1]
        };
        if (userAgent.match(/Version\/[\d+\.]+\s*Chrome/)) {
            browser.name = 'Chrome Webview';
            browser.isWebview = true;
            browser.isAndroid = true;
        }
    } else if (userAgent.match(/Safari/)) {
        if (temp = userAgent.match(/Android[\s\/]([\d\.]+)/)) {
            browser = {
                name: 'Android',
                isAndroid: true,
                version: temp[1]
            };
        } else if (userAgent.match(/iPhone|iPad|iPod/)) {
            temp = userAgent.match(/Version\/([\d\.]+)/);
            browser = {
                name: "Safari",
                isSafari: true,
                version: temp[1]
            };
        } else {
            // unknown
        }
    } else if (temp = userAgent.match(/OS ([\d_\.]+) like Mac OS X/)) {
        browser = {
            name: "iOS Webview",
            isWebview: true,
            isIOS: true,
            version: temp[1].replace(/_/ig, '.')
        };
    } else {
        browser = {
            name: "unknown",
            version: "0.0.0"
        };
    }


// 获取第三方App
    var thirdapp;

    if (userAgent.match(/One Account IOS/ig)) {
        thirdapp = {
            isYzt: true,
        };
    } else if (userAgent.match(/Anydoor/ig)) {
        thirdapp = {
            isAnyDoor: true,
        };
    } else if (userAgent.match(/micromessenger/ig)) {
        thirdapp = {
            isWeixin: true,
        };
    } else if (userAgent.match(/PAChat/ig)) {
        thirdapp = {
            isTxtong: true
        };
    } else if (userAgent.match(/QQ\//ig)) {
        thirdapp = {
            isQQ: true,
        }
    } else if (userAgent.match(/Weibo/ig)) {
        thirdapp = {
            isWeibo: true,
        }
    }


// 获取机型: 三星, 华为, 酷派, 乐视, LG, HTC, 小米

    var device;
    if (userAgent.match(/samsung|GT-|SM-|SCH-/i)) {
        device = {
            isSamsung: true,
        };
    } else if (userAgent.match(/HM|RedMi|Mi\s/g)) {
        //FIXME Mi会匹配微信的micromessenger，需要修复
        device = {
            isXiaomi: true,
        };
    } else if (userAgent.match(/huawei|honor/ig)) {
        device = {
            isHuawei: true,
        }
    } else if (userAgent.match(/vivo/ig)) {
        device = {isVivo: true};
    }


    os && (envLib.os = os);
    browser && (envLib.browser = browser);
    thirdapp && (envLib.thirdapp = thirdapp);
    device && (envLib.device = device);

})(window, window.envLib || (window.envLib = {}));