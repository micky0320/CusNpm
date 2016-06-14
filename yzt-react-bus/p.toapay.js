/**
 * Created by lixiaoxi on 16/4/29.
 * @description
 */
'use strict';

import {
    NativeModules,
} from 'react-native';

const YZTToaPayBridgeJS = NativeModules.YZTToaPayBridgeJS;

class ToaPay {

    getToaPayInfo(callback) {
        YZTToaPayBridgeJS.fetchYZTToaPayData && YZTToaPayBridgeJS.fetchYZTToaPayData((data) => {
            callback && callback(data);
        });
    }

}

export default ToaPay;
