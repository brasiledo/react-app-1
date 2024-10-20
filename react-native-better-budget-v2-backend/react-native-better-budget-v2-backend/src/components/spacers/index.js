import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes } from '../../services';

export const Spacer = ({ style, width, height }) => {
    return (
        <View style={[{ height: height, width: width }, style]} />
    );
}
export const Base = ({ }) => {
    return (
        <Spacer height={sizes.baseMargin} />
    );
}
export const Tiny = ({ }) => {
    return (
        <Spacer height={sizes.TinyMargin} />
    );
}
export const Small = ({ }) => {
    return (
        <Spacer height={sizes.smallMargin} />
    );
}
export const DoubleBase = ({ }) => {
    return (
        <Spacer height={sizes.doubleBaseMargin} />
    );
}
export const colorline = ({ }) => {
    return (
        <Spacer height={sizes.headerline} style={{backgroundColor: colors.border_color}} />
    );
}
    export const modal_line = ({ }) => {
        return (
            <Spacer height={sizes.modalMargin} width={totalSize(40)} style={{backgroundColor: "#EBEBEB", marginBottom: totalSize(1), marginLeft: totalSize(1.3), marginTop: totalSize(1)}} />
        );
}

export const opportunity_line = ({ }) => {
    return (
        <Spacer height={sizes.modalMargin} width={totalSize(39)} style={{backgroundColor: "#EBEBEB", marginBottom: totalSize(0.5), marginLeft: totalSize(0.8), marginTop: totalSize(1)}} />
    );
}
export const color_spacer = ({ }) => {
    return (
        <Spacer height={sizes.TinyMargin} style={{backgroundColor: "#F3F3F3", marginTop: totalSize(1.5), marginBottom: totalSize(1.5)}} />
    );
}