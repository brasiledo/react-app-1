import React from 'react'
import { View,  } from 'react-native'
import { colors } from '../../services';

export const Horizontal = ({style ,height,color}) => {
    return (
        <View style={[{height:height?height:0.5,backgroundColor:color?color:colors.appTextColor5},style]}/>
    );
}

export const LineHorizontal = props => {
    const { style, height, color, width } = props
    return (
        <View style={[{ height: height ? height : 0.5, backgroundColor: color ? color : colors.light_grey, width: width ? width : null }, style]} />
    );
}