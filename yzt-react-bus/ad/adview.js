/**
 * Created by lixiaoxi on 16/3/10.
 * @description  广告模块的View
 */

import React, { Component, PropTypes } from 'react';

import { View } from 'react-native';

import { CusComponents, Base, Util, Log } from 'yzt-react-base';

const { YztTouch, YztImage } = CusComponents;

import Swiper from 'react-native-swiper';

const EMPTY_FUNC = () => {};

/**
 * 广告相关
 * 1. 根据不同型号手机获取尺寸，拼装url
 * 2. 渲染广告，
 * 3. 接收父组件传递过来的Redux  Actions.
 */

const AdBusiness = {
    height: Base.Height,
    width: Base.Width,
    paramName: '?adviews=',

    getPixelSize() {
        let o = {};
        if (Base.isBetween4And5s()) {
            o = { height: 1136, width: 640 };
        } else {
            if (Base.Ratio < 3) {
                o = { height: 1334, width: 750 };
            } else {
                o = { height: 2208, width: 1242 };
            }
        }

        return o;
    },

    buildParamsById(id) {
        const size = this.getPixelSize();
        return `i_${size.width}x${size.height}_${id}`;
    },

    /**
     *
     */
    getRequestUrl(baseUrl, ids) {
        let temp = '';
        const self = this;
        if (Array.isArray(ids) && ids.length) {
            ids.forEach((t, i) => {
                (i > 0) && (temp += '|');
                temp += self.buildParamsById(t);
            });
        } else {
            temp += this.buildParamsById(ids);
        }

        return baseUrl + this.paramName + encodeURIComponent(temp);
    },

    getAds(baseUrl, ids, success = EMPTY_FUNC, error = EMPTY_FUNC) {
        Util.gets(this.getRequestUrl(baseUrl, ids))
            .then((res) => res.json(), (err) => {
                Log.log(err);
                error(err);
            })
            .then((res) => {
                res && res[0] && success(res);
            });
    },
};

class AdView extends Component {
    static propTypes = {
        ads: PropTypes.array,
        baseUri: PropTypes.string,
        ubt: PropTypes.array,
    }

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            errorIndex: '',
        };
    }

    onLoadImgError(i) {
        const cur = this.state.errorIndex;
        console.log(cur);
        this.setState({
            errorIndex:  cur + ',' + i,
        });
    }

    render() {
        const baseUri = this.props.baseUri;
        const ads = this.props.ads;
        const ubt = this.props.ubt;
        const self = this;
        const cur = this.state.errorIndex;
        let temp = [];
        // 适配不同机型（iphone）
        const imgHeight = Base.isBetween4And5s() ? 84 : Base.isIphone6() ? 100 : Base.isIphone6p() ? 110 : 100;
        if (ads && ads.length) {
            ads.forEach((t, i) => {
                t.img && (cur.indexOf(i)<0) && temp.push(
                    <YztTouch key={`ads${i}`} link={t.href} ubt={(ubt && ubt.length) ? [ubt[0], `${ubt[1]}_${t.id}_${t.text}`] : ''}>
                        <YztImage source={{ uri: `${baseUri}${t.img}` }} style={{ resizeMode: YztImage.resizeMode.stretch, height: imgHeight }} onError={() => {
                            self.onLoadImgError(i);
                        }}/>
                    </YztTouch>);
            });
        }

        return (<View {...this.props}>
            <Swiper showButtons={false} autoplay height={imgHeight} paginationStyle={{ bottom: 10 }}>
                {temp}
            </Swiper>
        </View>);
    }
}

AdView.Business = AdBusiness;

export default AdView;
