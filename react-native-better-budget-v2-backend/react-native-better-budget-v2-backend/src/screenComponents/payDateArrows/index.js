import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Wrappers } from '../../components';
import { colors, fontFamily } from '../../services';

export default function PayDateArrows(props) {
    return (
        <Wrappers.Wrapper>
            <Text style={styles.text}>{props.title}</Text>

            <Wrappers.Wrapper style={[styles.container, {width:props?.width ? width(50) : width(90), alignSelf:'center'}]}>
                <TouchableOpacity
                    style={[{ ...styles.leftContainer }, props.leftContainerStyle]}
                    disabled={props.disabled}
                    onPress={props.onPressLeft}
                    >
                    <Icon
                        name='arrow-left'
                        type='feather'
                        color={props.backArrowColor}
                    />
                </TouchableOpacity>
                <Wrappers.Wrapper style={styles.textView}>
                    <Text style={styles.dateText}>{props.value}</Text>
                </Wrappers.Wrapper>
                <TouchableOpacity
                    onPress={props.onPressRight}
                    style={[{ ...styles.leftContainer }, props.leftContainerStyle]}
                    disabled={props.rightDisabled}
                    >
                    <Icon
                        name='arrow-right'
                        type='feather'
                        color={props.rightArrowColor}
                    />
                </TouchableOpacity>
            </Wrappers.Wrapper>
        </Wrappers.Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.placeholderColor,
        fontFamily: fontFamily.appTextRegular,
        fontSize: totalSize(1.3),
        textAlign: 'center'
    },
    dateText: {
        color: colors.placeholderColor,
        fontFamily: fontFamily.appTextBold,
        fontSize: totalSize(1.6)
    },
});
