/**
 * Created by lixiaoxi on 16/1/26.
 * @description
 */
'use strict';

import Log from '../base/p.log.js';


import { NativeModules, DeviceEventEmitter } from 'react-native';

const YZTBridgeJS = NativeModules.YZTBridgeJS;

const EMPTY_STRING = '';

const WEBVIEW_DATA = {
    type: EMPTY_STRING, // 'detail'  'list';
    fundCode: EMPTY_STRING,

    buyMoney: EMPTY_STRING,

    productId: EMPTY_STRING,
};

function b() {
    const self = this;
    this.CURRENT_PLIST = '';
    this.subscription = DeviceEventEmitter.addListener(
        'eventUpdateEnvironment',
        (plist) => {
            self.CURRENT_PLIST = plist && plist.PLIST;
        }
    );
}

b.prototype = {
    ...YZTBridgeJS,
    /**
     *
     * @param needLogin
     * @returns {Promise}
     */
    checkLogin(needLogin) {
        return new Promise((resolve, reject) => {
            YZTBridgeJS.isLogin((params) => {
                if (params.isLogin === '1') {
                    resolve && resolve();
                } else {
                    reject && reject();
                    needLogin && YZTBridgeJS.callLogin && YZTBridgeJS.callLogin();
                }
            }, (err) => {
                Log.log(err);
                reject && reject();
            });
        });
    },

    /**
     *
     */
    checkUserInfo() {
        return new Promise((resolve) => {
            YZTBridgeJS.getUserInfo((data) => {
                resolve && resolve(data);
            });
        });
    },

    /**
     * 获取PLIST， 有可能能会被App后门改变
     */
    getPlist() {
        return this.CURRENT_PLIST || this.PLIST || {};
    },

    /**
     * 获取GP接口所需要的参数
     */
    getGPParams() {
        return this.GPPARAMS || {};
    },

    /**
     * 打开Native Webview, 有以下几种情况
     *
     * 正常webview， type = 0,
     * 热门基金 type= 1,（sso） keylist: fundCode, buymoney  (url, title)
     * 定期理财 type=2 （sso share） keylist: (title), url, (TODO: 如果需要分享，是否需要发送默认分享数据给Native)
     * 陆金所  type=3  （任意门插件跳转） keylist: (title) (productId)
     *
     * TODO 增加 type=4  投资的爆款
     *
     */

    openNativeWebview(url, type = 0, title = EMPTY_STRING, data = {}) {
        this.openWebview({
            url,
            type,
            title,
            data: Object.assign({}, WEBVIEW_DATA, data),
            });
    },

    /**
     * 打开Native 模块
     */

    openNativeModule(name, data = {}) {
        this.accessNativeModule && this.accessNativeModule({ name, data });
     },

    /**
     * 显示文字提示框
     */
    showToast(msg) {
        this.showYZTProgressView && this.showYZTProgressView({
            showMsg: msg,
            type: '1',
        });
    },


    /**
     * 显示加载中的那个菊花
     */

    showLoading() {
        this.showYZTProgressView && this.showYZTProgressView({
            showMsg: '',
            type: '0',
        });
    },

    /**
     * 隐藏加载中的那个菊花。
     */
    hideLoading() {
        this.dismissYZTProgressView && this.dismissYZTProgressView();
    },

    /**
     * 埋点
     */
    ubt(id = EMPTY_STRING, label = EMPTY_STRING, params = EMPTY_STRING) {
        this.trackEvent && this.trackEvent({
            eventId: id,
            eventLabel: label,
            parameters: params,
        });
    },

    /**
     * TODO 封装五项信息的情况。
     */

};

/**
 * TODO: 列出这些方法，用法，以及功能
 */

export default b;