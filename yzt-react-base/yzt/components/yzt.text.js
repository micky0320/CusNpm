/**
 * Created by lixiaoxi on 16/5/23.
 * @description
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import Base from '../../base/p.base.js';

const { isIOS, isAndroid } = Base;

class YztText extends Component {


    render() {
        if (isIOS) {
            return (<Text {...this.props} allowFontScaling={false}></Text>);
        } else {
            return (<Text {...this.props}></Text>);
        }

    }

}


export default YztText;