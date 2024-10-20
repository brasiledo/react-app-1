import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements';
import { Texts, Wrappers } from '../../components';
import RoundCheckbox from '../../components/roundCheckBox';
import { colors, fontFamily } from '../../services';


const leftButtons = []
const rightButtons = ['btn1',];
const btnWidth = width(18);
const offset = [-btnWidth * rightButtons.length, btnWidth];

export const SwipableListButton = ({ onPress, ExpenseName, ExpenseFrequency, ExpenseDate, ExpenseAmount, editButton, checked, onValueChange, index, currentlyOpenIndex,
    setCurrentlyOpenIndex }) => {
    return (
        <ScrollView>
            <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: colors.lightRed }}>
                <SwipableItem
                    index={index}
                    currentlyOpenIndex={currentlyOpenIndex}
                    setCurrentlyOpenIndex={setCurrentlyOpenIndex}
                    ExpenseName={ExpenseName}
                    ExpenseFrequency={ExpenseFrequency}
                    ExpenseDate={ExpenseDate}
                    ExpenseAmount={ExpenseAmount}
                    editButton={editButton}
                    checked={checked}
                    onValueChange={onValueChange}
                    onPress={onPress} />
            </Wrappers.Wrapper>
        </ScrollView>
    )
}

const SwipableItem = ({ onPress, ExpenseName, ExpenseFrequency, ExpenseDate, ExpenseAmount, editButton, checked, onValueChange, index, currentlyOpenIndex,
    setCurrentlyOpenIndex }) => {
    let panValue = useRef({ x: 0, y: 0 }).current;
    const isOpen = currentlyOpenIndex === index;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const itemTranslate = pan.x.interpolate({ inputRange: offset, outputRange: offset, extrapolate: 'clamp' });
    const translateRightBtns = pan.x.interpolate({ inputRange: [0, rightButtons.length * btnWidth], outputRange: [0, rightButtons.length * btnWidth], extrapolate: 'clamp' });
    useEffect(() => {
        pan.addListener(value => {
            panValue = value;
        });
    }, [])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponder: (e, g) => true,
            onPanResponderGrant: () => {
                pan.setOffset({ x: panValue.x, y: panValue.y });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderRelease: (e, g) => {
                pan.flattenOffset();
                if (g.vx > 0.5 || g.dx > btnWidth * leftButtons.length / 2) {
                    if (isOpen && g.dx > 0) {
                        reset();
                        return;
                    }
                    move(false);
                    setCurrentlyOpenIndex(index);
                    return;
                }
                if (g.vx < -0.5 || g.dx < -btnWidth * rightButtons.length / 2) {
                    if (isOpen && g.dx < 0) {
                        reset();
                        return;
                    }
                    move(true);
                    setCurrentlyOpenIndex(index);
                    return;
                }
                reset();
            },
            onPanResponderTerminate: () => {
                reset();
            },
        }),
    ).current;

    const reset = () => {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }
    const move = (toLeft) => {
        Animated.spring(pan, {
            toValue: { x: toLeft ? -btnWidth * rightButtons.length : btnWidth * leftButtons.length, y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }

    useEffect(() => {
        if (isOpen === true) {
            move(true)
        } else {
            reset()
        }
    }, [currentlyOpenIndex])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>

                <TouchableOpacity
                    onPress={() => {
                        onPress()
                        reset()
                    }} style={[styles.btn,]}>
                    <View>
                        <Icon
                            name={'edit'}
                            type="feather"
                            size={20}
                            color={colors.white}
                        />
                    </View>
                </TouchableOpacity>

            </Animated.View>

            {editButton ?
                <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} >
                    <Wrappers.Wrapper>

                        <Wrappers.Wrapper style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                            <Wrappers.RowBasic>
                                {editButton &&
                                    <RoundCheckbox
                                        size={18}
                                        checked={checked}
                                        onValueChange={onValueChange}
                                        borderColor={colors.textColor}
                                        backgroundColor={colors.textColor}
                                        styles={styles.iconStyle}
                                    />
                                }
                                <Texts.SmallText style={{ ...styles.expenseDetail, width: editButton ? width(20) : width(27), marginLeft: editButton ? width(2) : 0 }}>{ExpenseName}</Texts.SmallText>
                            </Wrappers.RowBasic>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(25), textAlign: 'center' }}>{ExpenseFrequency}</Texts.SmallText>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(20), textAlign: 'center' }}>{ExpenseDate}</Texts.SmallText>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(22), textAlign: 'right' }}>{ExpenseAmount}</Texts.SmallText>
                        </Wrappers.Wrapper>
                    </Wrappers.Wrapper>

                </Animated.View>
                :
                <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >
                    <Wrappers.Wrapper>

                        <Wrappers.Wrapper style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                            <Wrappers.RowBasic>
                                {editButton &&
                                    <RoundCheckbox
                                        size={18}
                                        checked={checked}
                                        onValueChange={onValueChange}
                                        borderColor={colors.textColor}
                                        backgroundColor={colors.textColor}
                                        styles={styles.iconStyle}
                                    />
                                }
                                <Texts.SmallText style={{ ...styles.expenseDetail, width: editButton ? width(20) : width(27), marginLeft: editButton ? width(2) : 0 }}>{ExpenseName}</Texts.SmallText>
                            </Wrappers.RowBasic>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(25), textAlign: 'center' }}>{ExpenseFrequency}</Texts.SmallText>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(20), textAlign: 'center' }}>{ExpenseDate}</Texts.SmallText>
                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(22), textAlign: 'right' }}>{ExpenseAmount}</Texts.SmallText>
                        </Wrappers.Wrapper>
                    </Wrappers.Wrapper>

                </Animated.View>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    txt: {
        color: '#fff',
        letterSpacing: 1
    },
    btnContainer: {
        height: '100%',
        position: 'absolute',
        flexDirection: 'row'
    },
    btn: {
        height: '100%',
        width: btnWidth * 0.75,
        backgroundColor: colors.textColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    expenseDetail: {
        fontSize: totalSize(1.3),
        color: colors.placeholderColor,
        fontFamily: fontFamily.appTextRegular,
    },
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // tool tips
    popupSwipe: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
        width: width(50)
    },
    containerStyleSwipe: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
    },
    popupPointSwipe: {
        right: width(8),
        top: 0,
        bottom: 0,
        width: totalSize(4),
        height: totalSize(4),
    },
    popupRadioBtn: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
        width: width(50)
    },
    containerStyleRadioBtn: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
    },
    popupPointRadioBtn: {
        right: 0,
        left: 2,
        top: 0,
        bottom: 0,
        width: totalSize(4),
        height: totalSize(4),
    },
})