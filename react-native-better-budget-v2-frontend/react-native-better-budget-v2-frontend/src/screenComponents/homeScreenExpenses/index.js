import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements';
import Delete from '../../assets/svgs/delete';
import { Texts, Wrappers } from '../../components';
import RoundCheckbox from '../../components/roundCheckBox';
import { colors, fontFamily } from '../../services';


const leftButtons = []
const rightButtons = ['btn1',];
const btnWidth = width(18);
const offset = [-btnWidth * rightButtons.length, btnWidth];

export const SwipableListHomeExpense = ({ onPress, ExpenseName, ExpenseDate, ExpenseAmount, onPressEdit, index, currentlyOpenIndex, setCurrentlyOpenIndex }) => {
    return (
        <ScrollView>
            <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: colors.lightRed }}>
                <SwipableItem
                    index={index}
                    currentlyOpenIndex={currentlyOpenIndex}
                    setCurrentlyOpenIndex={setCurrentlyOpenIndex}
                    ExpenseName={ExpenseName}
                    ExpenseDate={ExpenseDate}
                    ExpenseAmount={ExpenseAmount}
                    onPressEdit={onPressEdit}
                    onPress={onPress} />
            </Wrappers.Wrapper>
        </ScrollView>
    )
}


// const SwipableItem = ({ onPress, ExpenseName, ExpenseDate, ExpenseAmount, onPressEdit }) => {
//     let panValue = { x: 0, y: 0 };
//     let isOpenState = useRef(false).current;
//     const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
//     const itemTranslate = pan.x.interpolate({ inputRange: offset, outputRange: offset, extrapolate: 'clamp' });
//     const translateRightBtns = pan.x.interpolate({ inputRange: [0, rightButtons.length * btnWidth], outputRange: [0, rightButtons.length * btnWidth], extrapolate: 'clamp' });
//     useEffect(() => {
//         pan.addListener(value => {
//             panValue = value;
//         });
//     }, [])

//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => false,
//             onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
//             onMoveShouldSetPanResponder: (e, g) => false,
//             onPanResponderGrant: () => {
//                 pan.setOffset({ x: panValue.x, y: panValue.y });
//                 pan.setValue({ x: 0, y: 0 });
//             },
//             // onPanResponderMove: Animated.event([null, { dx: pan.x }], {
//             //     useNativeDriver: false,
//             // }),
//             onPanResponderRelease: (e, g) => {
//                 pan.flattenOffset();
//                 if (g.vx > 0.5 || g.dx > btnWidth * leftButtons.length / 2) {
//                     if (isOpenState && g.dx > 0) {
//                         reset();
//                         return;
//                     }
//                     move(false);
//                     reset()
//                     return;
//                 }
//                 if (g.vx < -0.5 || g.dx < -btnWidth * rightButtons.length / 2) {
//                     if (isOpenState && g.dx < 0) {
//                         reset();
//                         return;
//                     }
//                     move(true);
//                     return;
//                 }
//                 reset()

//             },
//             onPanResponderTerminate: () => {
//                 reset();
//             },
//         }),
//     ).current;
//     const reset = () => {
//         isOpenState = false;
//         Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true,
//             bounciness: 0
//         }).start();
//     }
//     const move = (toLeft) => {

//         isOpenState = true;
//         Animated.spring(pan, {
//             toValue: { x: toLeft ? -btnWidth * rightButtons.length : btnWidth * leftButtons.length, y: 0 },
//             useNativeDriver: true,
//             bounciness: 0
//         }).start();
//     }
const SwipableItem = ({ onPress, ExpenseName, ExpenseDate, ExpenseAmount, onPressEdit, index, currentlyOpenIndex, setCurrentlyOpenIndex }) => {
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

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>

                <TouchableOpacity
                    onPress={() => {
                        onPress()
                        reset()
                    }} style={[styles.btn,]}>
                    <View >
                        <Delete color={colors.white} width={20} height={20} />
                    </View>
                </TouchableOpacity>

            </Animated.View>

            <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >

                <Wrappers.Wrapper>
                    <Wrappers.Component style={{ marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                        <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32), }}>{ExpenseName}</Texts.SmallText>
                        <Texts.SmallText style={{ ...styles.expenseDetail, width: width(28), textAlign: 'center' }}>{ExpenseDate}</Texts.SmallText>
                        <Texts.SmallText style={{ ...styles.expenseDetail, width: width(28), textAlign: 'right' }}>{ExpenseAmount}</Texts.SmallText>

                        <TouchableOpacity activeOpacity={0.5} onPress={onPressEdit} >
                            <Icon
                                name='edit-3'
                                type='feather'
                                size={13}
                                style={{ width: width(6) }}
                            />
                        </TouchableOpacity>
                    </Wrappers.Component>
                </Wrappers.Wrapper>

            </Animated.View>
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
        backgroundColor: colors.redColor,
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