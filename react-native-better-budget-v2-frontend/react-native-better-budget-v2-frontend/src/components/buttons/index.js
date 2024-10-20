import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, fontSize, sizes, fontFamily } from '../../services';
import { Icons, Wrappers, Texts } from '..';

export const Colored = ({
    text, isLoading, activityColor, animation, onPress, disabled, buttonStyle,
    customIcon, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle,
    tintColor, direction, right
}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={isLoading ? true : disabled} activeOpacity={1} >
            <Wrappers.Primary animation={animation} style={[appStyles.buttonColord, appStyles.shadow, { borderRadius: sizes.buttonRadius, height: height(6), backgroundColor: buttonColor ? buttonColor : 'red' }, buttonStyle]}>
                <View style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                    {
                        customIcon ?
                            <Icons.Custom
                                icon={customIcon}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor && tintColor}
                            />
                            :
                            iconName ?
                                <Icon
                                    name={iconName ? iconName : "email-outline"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : totalSize(3)}
                                    color={tintColor ? tintColor : colors.appTextColor6}
                                //iconStyle={[{ marginRight: width(2.5) }, iconStyle]}
                                />
                                :
                                null
                    }

                    {
                        right ? right : null
                    }

                    {
                        isLoading ?
                            <ActivityIndicator
                                color={activityColor ? activityColor : colors.appBgColor1}
                                size={"small"}
                            />
                            :
                            <Texts.ButtonMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, fontFamily: fontFamily.appTextBold, fontSize: totalSize(1.5) }, textStyle]}>{text}</Texts.ButtonMedium>
                    }
                </View>
            </Wrappers.Primary>
        </TouchableOpacity>
    );
}

export const SimpleButton = ({
    text, isLoading, activityColor, animation, onPress, disabled, buttonStyle,
    customIcon, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle,
    tintColor, direction, right
}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={isLoading ? true : disabled} activeOpacity={1} >
            <Wrappers.Primary animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: height(6), backgroundColor: buttonColor ? buttonColor : 'red' }, buttonStyle]}>
                <View style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                    {
                        customIcon ?
                            <Icons.Custom
                                icon={customIcon}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor && tintColor}
                            />
                            :
                            iconName ?
                                <Icon
                                    name={iconName ? iconName : "email-outline"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : totalSize(3)}
                                    color={tintColor ? tintColor : colors.appTextColor6}
                                //iconStyle={[{ marginRight: width(2.5) }, iconStyle]}
                                />
                                :
                                null
                    }

                    {
                        right ? right : null
                    }

                    {
                        isLoading ?
                            <ActivityIndicator
                                color={activityColor ? activityColor : colors.appBgColor1}
                                size={"small"}
                            />
                            :
                            <Texts.ButtonMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, fontFamily: fontFamily.appTextBold, fontSize: totalSize(1.5) }, textStyle]}>{text}</Texts.ButtonMedium>
                    }
                </View>
            </Wrappers.Primary>
        </TouchableOpacity>
    );
}


export const ButtonColored = props => {
    const { text, animation, onPress, buttonStyle, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle, tintColor, isLoading, activityColor, disabled } = props
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} disabled={disabled}>
            <Wrappers.Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: 100, height: height(6), backgroundColor: buttonColor ? buttonColor : colors.appColor1 }, buttonStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor ? tintColor : colors.appTextColor6}
                                iconStyle={[{ marginRight: width(5) }, iconStyle]}

                            />
                            :
                            null
                    }

                    {
                        isLoading ?
                            <ActivityIndicator
                                color={activityColor ? activityColor : colors.appBgColor1}
                                size={"small"}
                            />
                            :
                            <Texts.ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.snow, fontFamily: fontFamily.appTextBold, fontSize: totalSize(1.5) }, textStyle]}>{text}</Texts.ButtonTextMedium>
                    }
                </View>
            </Wrappers.Wrapper>
        </TouchableOpacity>
    );
}

export const ColoredSmall = ({ text, onPress, buttonStyle, customIcon, direction, textStyle, iconName, iconType, iconSize, iconColor, iconStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{ borderRadius: 15, paddingHorizontal: width(5), paddingVertical: height(1), backgroundColor: colors.appColor1 }, buttonStyle]}>
            <View style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                {
                    customIcon ?
                        <Icons.Custom
                            icon={customIcon}
                            size={iconSize ? iconSize : totalSize(2)}
                            color={iconColor ? iconColor : colors.appTextColor6}
                        />
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(2)}
                                color={iconColor ? iconColor : colors.appTextColor6}
                                iconStyle={[{}, iconStyle]}
                            />
                            :
                            null
                }
                <Texts.ButtonRegular style={[{ color: colors.appTextColor6, }, textStyle]}>  {text}  </Texts.ButtonRegular>
            </View>
        </TouchableOpacity>
    );
}

export const Bordered = props => {
    const { text, right, animation, onPress, buttonStyle, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle, tintColor } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Wrappers.Wrapper animation={animation} style={[appStyles.buttonBorderd, { borderRadius: 100, height: height(6), backgroundColor: buttonColor ? buttonColor : colors.white }, buttonStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor ? tintColor : colors.appTextColor6}
                                iconStyle={[{ marginRight: width(5) }, iconStyle]}

                            />
                            :
                            null
                    }
                    {
                        right ? right : null
                    }
                    <Texts.ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.textColor, fontFamily: fontFamily.appTextBold, fontSize: totalSize(1.5) }, textStyle]}>{text}</Texts.ButtonTextMedium>
                </View>
            </Wrappers.Wrapper>
        </TouchableOpacity>
    );
}

export const BorderedSmall = ({ text, onPress, buttonStyle, rowReverse, textStyle, iconName, iconType, iconSize, iconColor, iconStyle, tintColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{ borderRadius: 15, paddingHorizontal: width(5), paddingVertical: height(1), borderColor: tintColor ? tintColor : colors.appColor1, borderWidth: 1 }, buttonStyle]}>
            <View style={{ flexDirection: rowReverse ? 'row-reverse' : 'row', alignItems: 'center' }}>
                {
                    iconName ?
                        <Icon
                            name={iconName ? iconName : "email-outline"}
                            type={iconType ? iconType : "material-community"}
                            size={iconSize ? iconSize : totalSize(2)}
                            color={tintColor ? tintColor : colors.appColor1}
                            iconStyle={[{ marginHorizontal: width(2) }, iconStyle]}
                        />
                        :
                        null
                }
                <Text style={[appStyles.ButtonRegular, { color: tintColor ? tintColor : colors.appColor1, fontSize: fontSize.medium }, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}




