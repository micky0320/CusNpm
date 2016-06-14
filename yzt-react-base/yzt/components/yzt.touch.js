/**
 * Created by lixiaoxi on 16/4/14.
 * @description
 */
'use strict';

import React, {
    Component,
    PropTypes,
 } from 'react';

import {
    View,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
     } from 'react-native';
import YztFn from '../p.yzt.base.js';
import Base from '../../base/p.base.js';

const { isAndroid } = Base;

const Yzt = new YztFn();

class Touch extends Component {
    static propTypes = {
        ubt: PropTypes.array
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    linkFunc() {
        const link = this.props.link;
        if (/^(http|https):\/\//ig.test(link)) {
            Yzt.openNativeWebview(link);
        } else if(/^(patoa|native):\/\//ig.test(link)) {
            //native:// 是老版本的配置。
            Yzt.openNativeModule(link);
        }
    }

    sendUbt() {
        const ubt = this.props.ubt;
        ubt && ubt.length && Yzt.ubt(ubt[0], ubt[1], ubt[2]);
    }

    render() {
        const Com = isAndroid ? TouchableNativeFeedback : TouchableWithoutFeedback;
        let _onPress = this.props.onPress;
        let props = {};
        let self = this;
        Object.assign(props, this.props);
        props.onPress = (e)=>{
            _onPress && _onPress(e);
            self.sendUbt(); //增加埋点功能
            if (Math.abs(self._currentX - self._lastX) <= 5) {
                self.linkFunc();
            }
        };

        props.onPressIn= (e)=>{
            self._lastX = e.nativeEvent.pageX;
        };

        props.onPressOut = (e)=>{
            self._currentX = e.nativeEvent.pageX;
        };


        return (<Com {...props} background={Com.SelectableBackground && Com.SelectableBackground()} >
            <View {...props}></View>
        </Com>);
    }
}

export default Touch;
