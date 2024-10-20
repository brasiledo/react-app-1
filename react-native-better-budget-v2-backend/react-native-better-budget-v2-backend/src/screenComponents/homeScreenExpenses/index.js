import React, { useEffect, useRef } from 'react';
import { Alert, Animated, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements';
import Delete from '../../assets/svgs/delete';
import { Texts, Wrappers } from '../../components';
import RoundCheckbox from '../../components/roundCheckBox';
import { colors, fontFamily, selectedCurrencySymbol } from '../../services';
import { CopilotStep, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../services/dummyData';
import moment from 'moment';


const leftButtons = []
const rightButtons = ['btn1',];
const btnWidth = width(18);
const offset = [-btnWidth * rightButtons.length, btnWidth];

export const SwipableListHomeExpense = ({ onPress, ExpenseName, ExpenseDate, ExpenseAmount, onPressEdit, index, currentlyOpenIndex, setCurrentlyOpenIndex, Currency, iconVisible, CurrentDate, swipeEnabled }) => {
    return (
        // <ScrollView>
        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: colors.lightRed }}>
            <SwipableItem
                index={index}
                currentlyOpenIndex={currentlyOpenIndex}
                setCurrentlyOpenIndex={setCurrentlyOpenIndex}
                ExpenseName={ExpenseName}
                ExpenseDate={ExpenseDate}
                ExpenseAmount={ExpenseAmount}
                onPressEdit={onPressEdit}
                CurrentDate={CurrentDate}
                Currency={Currency}
                onPress={onPress}
                iconVisible={iconVisible}
                swipeEnabled={swipeEnabled}
            />
        </Wrappers.Wrapper>
        // {/* </ScrollView> */}
    )
}

const SwipableItem = ({ onPress, ExpenseName, ExpenseDate, ExpenseAmount, onPressEdit, index, currentlyOpenIndex, setCurrentlyOpenIndex, Currency, iconVisible, CurrentDate, swipeEnabled = false }) => {

    const expenseDate = moment(`${moment(CurrentDate, 'MM/DD/YYYY').format('MM')}/${moment(ExpenseDate, 'MM/DD/YYYY').format('DD')}/${moment(ExpenseDate, 'MM/DD/YYYY').format('YYYY')}`, 'MM/DD/YYYY').format('MM/DD/YYYY')
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
        if (isOpen) {
            move(true)
        } else {
            reset()
        }
    }, [currentlyOpenIndex])

    const CopilotView = walkthroughable(View)
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>

                <TouchableOpacity
                    onPress={() => {
                        onPress()
                        reset()
                    }} style={{ ...styles.btn, backgroundColor: iconVisible ? colors.redColor : colors.white }}>
                    <View >
                        {iconVisible &&
                            <Delete color={colors.white} width={20} height={20} />
                        }
                    </View>
                </TouchableOpacity>

            </Animated.View>

            {iconVisible ?
                (
                    swipeEnabled ? (
                        <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >
                            <Wrappers.Wrapper>
                                <CopilotStep text={ToolTiopsText.text21} order={20} name="homeSwipe">
                                    <CopilotView>
                                        <Wrappers.Component style={{ marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                                            <Texts.SmallText numberOfLines={2} style={{ ...styles.expenseDetail, width: width(32) }}>{ExpenseName}</Texts.SmallText>
                                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(30), textAlign: 'center', }}>{ExpenseDate == '-' ? 'Every Pay Cycle' : moment(expenseDate, 'MM/DD/YYYY').format("MM/DD/YYY")}</Texts.SmallText>
                                            <Wrappers.Wrapper style={{ width: width(32), flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Texts.SmallText style={{ ...styles.expenseDetail, textAlign: 'right', marginRight: width(1) }}>{selectedCurrencySymbol(Currency)} {ExpenseAmount}</Texts.SmallText>

                                                <CopilotStep text={ToolTiopsText.text22} order={21} name="homePencil">
                                                    <CopilotView>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={onPressEdit} >
                                                            <Icon
                                                                name='edit-3'
                                                                type='feather'
                                                                size={13}
                                                            />
                                                        </TouchableOpacity>
                                                    </CopilotView>
                                                </CopilotStep>
                                            </Wrappers.Wrapper>

                                        </Wrappers.Component>
                                    </CopilotView>
                                </CopilotStep>
                            </Wrappers.Wrapper>
                        </Animated.View>
                    ) : (
                        <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} >
                            <Wrappers.Wrapper>
                                <CopilotStep text={ToolTiopsText.text21} order={20} name="homeSwipe">
                                    <CopilotView>
                                        <Wrappers.Component style={{ marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                                            <Texts.SmallText numberOfLines={2} style={{ ...styles.expenseDetail, width: width(32) }}>{ExpenseName}</Texts.SmallText>
                                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(30), textAlign: 'center', }}>{ExpenseDate == '-' ? 'Every Pay Cycle' : moment(expenseDate, 'MM/DD/YYYY').format("MM/DD/YYYY")}</Texts.SmallText>
                                            <Wrappers.Wrapper style={{ width: width(32), flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Texts.SmallText style={{ ...styles.expenseDetail, textAlign: 'right', marginRight: width(1) }}>{selectedCurrencySymbol(Currency)} {ExpenseAmount}</Texts.SmallText>

                                                <CopilotStep text={ToolTiopsText.text22} order={21} name="homePencil">
                                                    <CopilotView>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={onPressEdit} >
                                                            <Icon
                                                                name='edit-3'
                                                                type='feather'
                                                                size={13}
                                                            />
                                                        </TouchableOpacity>
                                                    </CopilotView>
                                                </CopilotStep>
                                            </Wrappers.Wrapper>

                                        </Wrappers.Component>
                                    </CopilotView>
                                </CopilotStep>
                            </Wrappers.Wrapper>
                        </Animated.View>
                    )
                )

                :

                <Wrappers.Wrapper>
                    <CopilotStep text={ToolTiopsText.text21} order={20} name="homeSwipe">
                        <CopilotView>
                            <Wrappers.Component style={{ marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                                <Texts.SmallText numberOfLines={2} style={{ ...styles.expenseDetail, width: width(32) }}>{ExpenseName}</Texts.SmallText>
                                <Texts.SmallText style={{ ...styles.expenseDetail, width: width(30), textAlign: 'center', }}>{ExpenseDate == '-' ? 'Every Pay Cycle' : moment(expenseDate, 'MM/DD/YYYY').format("MM/DD/YYYY")}</Texts.SmallText>
                                <Wrappers.Wrapper style={{ width: width(32), flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Texts.SmallText style={{ ...styles.expenseDetail, textAlign: 'right', marginRight: width(4) }}>{selectedCurrencySymbol(Currency)} {ExpenseAmount}</Texts.SmallText>
                                </Wrappers.Wrapper>

                            </Wrappers.Component>
                        </CopilotView>
                    </CopilotStep>
                </Wrappers.Wrapper>
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
    popupOneTime: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleOneTime: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
    },
    popupPointOneTime: {
        right: width(10),
        top: 0,
        bottom: 0,
        width: totalSize(4),
        height: totalSize(4),
    },
    popupEdit: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
        width: width(50)
    },
    containerStyleEdit: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
    },
    popupPointEdit: {
        right: width(1),
        top: 0,
        bottom: 0,
        width: totalSize(4),
        height: totalSize(4),
    },
})