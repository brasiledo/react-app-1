import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { colors, fontFamily } from '../../services';
import { height, totalSize } from "react-native-dimension";
import { Icon } from 'react-native-elements';

export const NumericKeyboard = ({ skip, setKeypadValue, onPressSkip, onPressDone, onPressKeypadValue }) => {
    const buttons = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '.', value: '.' },
        { label: '0', value: '0' },
        { label: <Icon name='delete' type='feather' color={colors.black} />, value: 'cross' },
    ];

    return (
        <View style={styles.keyboardView}>
            <View style={styles.keyboard}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={button.value}
                        style={{
                            ...styles.button,
                            borderLeftWidth: 0,
                            borderBottomWidth: index == 9 || index == 10 || index == 11 ? 1 : 0,
                            borderRightWidth: index == 2 || index == 5 || index == 8 || index == 11 ? 0 : 1
                        }}
                        activeOpacity={0.5}
                        onPress={() => onPressKeypadValue(button.value)}
                    // onPress={() => setKeypadValue(button.value)}
                    >
                        <Text style={styles.buttonLabel}>{button.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.tickView}>
                <TouchableOpacity
                    style={{ ...styles.tick, height: skip ? height(18) : height(24), }}
                    onPress={onPressDone}
                    activeOpacity={0.5}
                >
                    <Icon name='check' type='feather' color={colors.black} />
                </TouchableOpacity>

                {skip &&
                    <TouchableOpacity style={styles.skipView}
                        onPress={onPressSkip}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.skipLabel}>{'Skip'}</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    keyboardView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        width: '100%'
    },
    tickView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: height(24),
        backgroundColor: colors.background,
    },
    skipView: {
        width: '100%',
        height: height(6),
        borderWidth: 1,
        borderColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    keyboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        width: '75%',
    },
    button: {
        width: '33.3%',
        height: height(6),
        borderWidth: 1,
        borderColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // padding: '3%'
    },
    tick: {
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        borderWidth: 1,
        borderColor: colors.background,
    },
    buttonLabel: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.black,
    },
    skipLabel: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextRegular,
        color: colors.black,
    },
});