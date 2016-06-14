/**
 * Created by lixiaoxi on 16/2/16.
 * @description      自定义的带有下啦刷新的scrollview组件
 */
'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    NativeModules,
    PixelRatio,
    DeviceEventEmitter,
    findNodeHandle,
     } from 'react-native';

const YZTRefreshControl= NativeModules.YZTRefreshControl;

class YztScrollView extends Component {
    static propTypes = {
        onRelease: PropTypes.func
    };

    // 构造
    constructor(props) {
        super(props);
        this.onRelease = this.props.onRelease;
    }

    render() {
        return (<ScrollView {...this.props} ref="test" />);
    }


    componentWillMount() {

    }

    componentDidUpdate() {
        YZTRefreshControl && YZTRefreshControl.endRefreshing(findNodeHandle(this.refs["test"]));
    }

    componentDidMount() {
        var reactTag = findNodeHandle(this.refs["test"]);
        var DROP_VIEW_DID_BEGIN_REFRESHING_EVENT = 'eventRefreshScrollView';
        var self = this;

        YZTRefreshControl && YZTRefreshControl.configure(reactTag,{}, ()=>{
            //
        });

        self.subscription = DeviceEventEmitter.addListener(
            DROP_VIEW_DID_BEGIN_REFRESHING_EVENT,
            (a) => {
                self.onRelease && self.onRelease();
            }
        );
    }

    componentWillUnMount() {
        this.subscription && this.subscription.remove();
    }



}


export default YztScrollView;
