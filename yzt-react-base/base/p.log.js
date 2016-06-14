/**
 * Created by lixiaoxi on 15/12/10.
 * @description    提供Log 方法，调试等，打印到Native控制台
 */
'use strict';
import { NativeModules } from 'react-native';
import { isIOS, isAndroid, isWeb, Log } from './p.base.js';

const YZTBridgeJS = NativeModules.YZTBridgeJS;

const LogModule =  NativeModules.LogModule;


export default  {
    log: (e)=>{
        if (isIOS) {
            console.log(e);
            YZTBridgeJS.log('************' + (typeof e === 'object' ? JSON.stringify(e) : e) + '************');
        } else {
            LogModule.i(e);
        }
    }
};


