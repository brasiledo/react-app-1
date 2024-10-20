import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension'
import Delete from '../../assets/svgs/delete';
import Notification from '../../assets/svgs/notification';
import { Texts, Wrappers } from '../../components';
import RoundCheckbox from '../../components/roundCheckBox';
import { colors, fontFamily } from '../../services';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../services/dummyData';
import { saveData } from '../../services/utils/utility';
import { Users } from '../../Redux/actions/Auth';
import { useDispatch } from 'react-redux';


const leftButtons = []
const rightButtons = ['btn1',];
const btnWidth = width(18);
const offset = [-btnWidth * rightButtons.length, btnWidth];

export const SwipableListButtonNotifications = ({ onPress, NotificationText, NotificationTime, editNotification, checked, onValueChange, onPressNotification, index,
    currentlyOpenIndex, setCurrentlyOpenIndex, borderBottomColor, backgroundColor, toolTipStatus, user }) => {
    return (
        <ScrollView>
            <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: borderBottomColor ?? colors.lightRed }}>
                <SwipableItem
                    backgroundColor={backgroundColor}
                    index={index}
                    currentlyOpenIndex={currentlyOpenIndex}
                    setCurrentlyOpenIndex={setCurrentlyOpenIndex}
                    NotificationText={NotificationText}
                    NotificationTime={NotificationTime}
                    editNotification={editNotification}
                    onPressNotification={onPressNotification}
                    checked={checked}
                    onValueChange={onValueChange}
                    onPress={onPress}
                    toolTipStatus={toolTipStatus}
                    user={user} />
            </Wrappers.Wrapper>
        </ScrollView>
    )
}

const SwipableItem = ({ onPress, NotificationText, NotificationTime, editNotification, checked, onValueChange, onPressNotification, index, currentlyOpenIndex,
    setCurrentlyOpenIndex, backgroundColor, toolTipStatus, user }) => {

    const dispatch = useDispatch()
    let panValue = useRef({ x: 0, y: 0 }).current;
    let isOpen = currentlyOpenIndex === index;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    let itemTranslate = pan.x.interpolate({ inputRange: offset, outputRange: offset, extrapolate: 'clamp' });
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
            onMoveShouldSetPanResponder: (e, g) => false,
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
                setCurrentlyOpenIndex('');
            },
            onPanResponderTerminate: () => {
                reset();
                setCurrentlyOpenIndex('');
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

    if (isOpen) {
        // move(true)
    } else {
        reset()
    }

    // tooltips
    const CopilotView = walkthroughable(View);
    const { start, goToNth, currentStep } = useCopilot()
    const [tooltipVisible, setTooltipVisible] = useState(0)

    // timeout for tooltip visible
    useEffect(() => {
        if (toolTipStatus != undefined) {
            setTimeout(() => {
                setTooltipVisible(1)
            }, 1000);
        }
    }, [toolTipStatus])

    // for start tooltip
    useEffect(() => {
        if (toolTipStatus != undefined && user?.firstTimeLogin == true) {
            void start()
            void goToNth(17)
            user.firstTimeLogin = false
            dispatch(Users(user))
            saveData('Users', user?.userId, { firstTimeLogin: false })
        }
    }, [tooltipVisible])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>

                <TouchableOpacity
                    onPress={() => {
                        onPress()
                        reset()
                    }} style={[styles.btn,]}>
                    <View>
                        <Delete color={colors.white} />
                    </View>
                </TouchableOpacity>

            </Animated.View>

            <Animated.View style={[styles.item, { transform: [{ translateX: itemTranslate }], backgroundColor: backgroundColor ? null : '#fff', }]} {...panResponder.panHandlers} >
                <TouchableOpacity activeOpacity={1} onPress={onPressNotification}>
                    <Wrappers.Wrapper style={{ marginHorizontal: width(4), marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                        {editNotification ?
                            <Wrappers.Wrapper style={styles.iconStyle}>
                                <RoundCheckbox
                                    size={totalSize(1.5)}
                                    checked={checked}
                                    onValueChange={onValueChange}
                                    borderColor={colors.textColor}
                                    backgroundColor={colors.textColor}
                                    styles={styles.iconStyle}
                                />
                            </Wrappers.Wrapper>
                            :
                            <Wrappers.Wrapper style={styles.iconView}>
                                <Notification color={colors.white} />
                            </Wrappers.Wrapper>
                        }

                        <Wrappers.Wrapper style={styles.textWrapper}>
                            <CopilotStep text={ToolTiopsText.text32} order={31} name="notifications">
                                <CopilotView>
                                    <Texts.MediumTitle style={styles.notification}>{NotificationText}</Texts.MediumTitle>
                                    <Texts.MediumTitle style={styles.time}>{NotificationTime}</Texts.MediumTitle>
                                </CopilotView>
                            </CopilotStep>
                        </Wrappers.Wrapper>
                    </Wrappers.Wrapper>
                </TouchableOpacity>

            </Animated.View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        justifyContent: 'center',
    },
    btnContainer: {
        height: '100%',
        position: 'absolute',
        flexDirection: 'row'
    },
    btn: {
        height: '100%',
        width: btnWidth * 1,
        backgroundColor: colors.redColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView: {
        backgroundColor: colors.textColor,
        // padding: 15,
        width: totalSize(5),
        height: totalSize(5),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width(2)
    },
    notification: {
        fontSize: totalSize(1.8),
        color: colors.black,
        fontFamily: fontFamily.appTextRegular,
    },
    time: {
        fontSize: totalSize(1.1),
        color: colors.black,
        fontFamily: fontFamily.appTextRegular,
    },
    textWrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    iconStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: width(2)
    },
    // tool tips
    popup: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyle: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: totalSize(7),
    },
    popupPoint: {
        right: width(5),
        top: -totalSize(1),
        bottom: 0,
        width: totalSize(8),
        height: totalSize(8),
    },
})