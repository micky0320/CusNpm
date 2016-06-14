/**
 * Created by lixiaoxi on 15/12/14.
 * @description
 */
'use strict';

import Base, { isIOS, isAndroid, isWeb, Log } from './base/p.base.js';
import Store from './store/p.store.js';
import CommonStyle from './style/common.js';
import UI from './ui/p.ui.js';
import Util from './util/p.util.js';
import YztBase from './yzt/p.yzt.js';

const { YztFn, CusComponents, Skin } = YztBase;


const Yzt = new YztFn();


// 获取真实的像素点
function h(s) {
    if (s === 1) {
        s /= Base.Ratio;
    } else {
        s /= 2;
    }

    return s;
}

module.exports = {
    CusComponents,

    isIOS,
    isAndroid,
    isWeb,
    Log,
    Base,


    Store,
    CommonStyle,
    Skin,
    UI,
    Util,
    h,
    Yzt,
};
