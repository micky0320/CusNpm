/**
 * Created by lixiaoxi on 16/4/14.
 * @description  定制化的图片组件
 */
'use strict';

import React from 'react';

import { Image } from 'react-native';


import Base from '../../base/p.base.js';

const { isIOS } = Base;

class Image2 extends Image {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hasError: false,
        };

        this.defaultSource = { uri: 'adDefualt', isStatic: true };

        // 如果source是对象，说明是网络图片，int则说明是本地图片
        this.isOnlineImage = Object.prototype.toString.call(this.props.source) === '[object Object]';

        // this.newProps = Object.assign({}, this.props);
        // isIOS && (this.newProps.defaultSource = {uri: 'adDefault', isStatic: 'true'});
    }


    componentDidMount() {
        // Log.log('load');
    }

    _onError() {
        this.setState({ hasError: true });
        this.props.onError && this.props.onError();
    }

    _onLoadEnd() {
        this.setState({ loading: false });
    }

    /**
     * @private
     */

    _onProcess() {
        // console.log('downloading');
    }


    render() {
        let src = this.state.loading ? this.defaultSource : this.props.source;
        !this.isOnlineImage && (src = this.props.source);

        return (<Image {...this.props}
            source={src}
            onError={isIOS ? this._onError.bind(this) : ''}
            onProcess={isIOS && this.props.source ? this._onProcess.bind(this) : ''}
            onLoadEnd={this._onLoadEnd.bind(this)}
            />);

    }
}


export default Image2;
