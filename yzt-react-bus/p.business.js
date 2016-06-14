/**
 * Created by lixiaoxi on 15/12/10.
 * @description     业务相关，入口文件
 * 还没有想好要支持哪些，待扩展或直接移除
 */
'use strict';

import AdModule from './ad/adview.js';

import ToaPayTool from './p.toapay.js';

import NativeUrl from './p.native.views.js';
import SkinStyle from './skin/yzt.blue.js';


export default {
    AdModule,

    NativeUrl,

    ToaPayTool: new ToaPayTool(),
    Skin: {
        SkinStyle,
    },
};
