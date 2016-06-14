/**
 * Created by lixiaoxi on 16/4/26.
 * @description   TODO 圆形进度条，包含外圈， 着色， 以及里面的文字
 * 参见 https://github.com/guodong000/react-native-circle-progress
 */
'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    NativeModules,
    requireNativeComponent,
} from 'react-native';


class CircleProgress extends Component {
    static propTypes = {
        progress: PropTypes.string,
        lineWidth: PropTypes.number,
        lineCap: PropTypes.string,
        circleRadius: PropTypes.number,
        foregroundColor: PropTypes.string,
        backgroundColor: PropTypes.string,
    };

    render() {
        const defaultProps = {
            progress: 0,
            lineWidth: 3,
            //lineCap: NativeModules.CircleProgressManager.LineCapRound,
            circleColor: 'blue',
            circleUnderlayColor: 'transparent',
        };
        let props = {...defaultProps, ...this.props};

        return (<RCTCircleProgress {...props} style={[styles.base, this.props.style]} />);
    }

}


const styles = StyleSheet.create({
    base: {
        width: 50,
        height: 50,
    },
});

const RCTCircleProgress = requireNativeComponent('YZTReactNativeCircleProgress', null);

//CircleProgress.LineCapButt = NativeModules.CircleProgressManager.LineCapButt;
//CircleProgress.LineCapRound = NativeModules.CircleProgressManager.LineCapRound;
//CircleProgress.LineCapSquare = NativeModules.CircleProgressManager.LineCapSquare;
export default CircleProgress;
