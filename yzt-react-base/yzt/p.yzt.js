/**
 * Created by lixiaoxi on 16/2/15.
 * @description 一账通相关的组件， 定制化的UI组件， 以及与App交互的方法
 */
'use strict';
/**
 * 一账通定义的方法体有：
 * 1. eventRefreshScrollView, 用于触发scrollview的下啦刷新
 * 2. eventUpdateEnvironment, 用于App中切换环境的方法
 */


import YztScrollView from './components/yzt.scrollview.js';
import YztImage from './components/yzt.image.js';
import YztTouch from './components/yzt.touch.js';
import YztArrow from './components/yzt.arrow.js';
import YztText from './components/yzt.text.js';

import CircleProgress from './components/process.circle.js';


import YztFn from './p.yzt.base.js';


export default {
    CusComponents: {
        YztScrollView,
        YztImage,
        YztTouch,
        YztArrow,
        YztText,
        CircleProgress,
    },
    YztFn,
};


