/**
 * Created by lixiaoxi on 2017/1/18.
 * @description    解决无法对dom设置自定义属性的问题,如otitle
 */


function getType(obj) {
    return Object.prototype.toString.call(obj);
}

function isArray(arr) {
    return getType(arr) === '[object Array]';
}

function isString(str) {
    return getType(str) === '[object String]';
}

function replaceAttr(attr) {
    var sel = 'data-' + attr;
    var els = document.querySelectorAll('[' + sel + ']');
    if (els) {
        els = Array.prototype.slice.call(els);
    }
    els.forEach(function(t) {
        t.setAttribute(attr, t.dataset[attr]);
        t.removeAttribute(sel);
    });
}


function fixUbtIssue() {
    replaceAttrs(['otitle', 'otype']);
}


function replaceAttrs(attrs) {
    if (!isArray(attrs) && !isString(attrs)) {
        console.warn('参数不正确: 非字符串或者数组');
        return false;
    }

    if (isArray(attrs)) {
        attrs.forEach(function(t){
            replaceAttr(t);
        });
    } else {
        replaceAttr(attrs);
    }

}

module.exports = {
    fixUbtIssue: fixUbtIssue,
    replaceAttrs: replaceAttrs,
};





