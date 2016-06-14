/**
 * Created by lixiaoxi on 15/12/10.
 * @description  工具类入口文件
 */
'use strict';
import Dates from './p.util.date.js';
import Hash from './p.util.hash.js';

const EMPTY_OBJ = {};

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map((key) => {
        const val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map((val2) => (encodeURIComponent(key) + '=' + encodeURIComponent(val2))).join('&');
        }
        return (encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }).join('&') : '';
}


function post(url, params, options = EMPTY_OBJ) {
    return fetch(url, Object.assign({
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: toQueryString(params),
    }, options));
}

function gets(url, params, options = EMPTY_OBJ) {
    return fetch(url + (params ? `?${toQueryString(params)}` : ''), Object.assign({
        method: 'GET',
        headers: {},
    }, options));
}

function trim(str) {
    return String.prototype.trim.call(str);
}

module.exports = {
    Dates,
    Hash,
    toQueryString,
    post,
    gets,
    trim,
};
