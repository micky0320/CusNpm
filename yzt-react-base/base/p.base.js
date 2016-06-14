/**
 * Created by lixiaoxi on 15/12/10.
 * @description  提供框架基本的方法集合, Base 文件入口
 */
'use strict';

import Util from '../util/p.util.js';
import Geo from './p.geo.js';
import Log from './p.log.js';

import React, {
    Platform,
    Dimensions,
    PixelRatio,
    } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const Ratio = PixelRatio.get();

const win = Dimensions.get('window');
const Height_5 = 568;
const Width_5 = 320;
const Height_6 = 667;
const Height_6p = 736;

function isIphone5() {
    let res = false;
    if (win.height === Height_5 && win.width === Width_5) {
        res = true;
    }

    return res;
}


/**
 * iphone4 到 5s
 * @returns {boolean}
 */
function isBetween4And5s() {
    return isIOS && Ratio === 2 && win.height <= Height_5;
}

// TODO 6 & 6p 有放大模式，需要特别处理
/**
 * iphone6
 * @returns {boolean}
 */
function isIphone6() {
    return isIOS && Ratio === 2 && win.height === Height_6;
}
/**
 * iphone6 plus
 * @returns {boolean}
 */

function isIphone6p() {
    return isIOS && Ratio === 3 && win.height === Height_6p;
}

var Base = {
    isIOS,
    isAndroid,
    Util: Util,
    Date: Util.Dates,
    Hash: Util.Hash,
    Log,
    Height: win.height,
    Width: win.width,
    Ratio,
    isIphone5,
    isBetween4And5s,
    isIphone6,
    isIphone6p,

};

Base.isWeb = Platform.OS === 'web';

module.exports = Base;
