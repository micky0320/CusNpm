/**
 * Created by lixiaoxi on 16/4/25.
 * @description  向右的箭头，
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, } from 'react-native';


class Arrow extends Component {
    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
        ]),
    }

    render() {
        return (<View style={[s.arrowRightBox, { position: 'absolute', top: 50, right: 10 }, this.props.style] }>
            <View style={[s.arrowRight]} />
        </View>);
    }

}


const s = StyleSheet.create({
    arrowRight: {
        width: 10,
        height: 10,
        marginRight: 0,
        backgroundColor: 'transparent',
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#c7c7cc',
        transform: [{
            rotate: '45deg' }],
    },
    arrowRightBox: {
        justifyContent: 'center',
    },
});

export default Arrow;