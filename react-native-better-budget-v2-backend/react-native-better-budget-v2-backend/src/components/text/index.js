import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { appStyles, colors, fontFamily, sizes, appIcons, fontSize } from '../../services';
import { RowWrapperBasic, Wrapper, RowWrapper } from '../wrappers';
import { Spacer } from '../spacers';
import { LineHorizontal } from '../lines';
import { width, height, totalSize } from 'react-native-dimension';
import { CustomIcon } from '../icons';
import { Images, Spacers, Texts, Wrappers } from '..';

// Title Texts
export const XXLTitle = props => {
    return (
        <Text
            style={[styles.xxlTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const XLTitle = props => {
    return (
        <Text
            style={[styles.xlTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const LargeTitle = props => {
    return (
        <Text
            style={[styles.largeTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const MediumTitle = props => {
    return (
        <Text
            style={[styles.mediumTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const SmallTitle = props => {
    return (
        <Text
            style={[styles.smallTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const TinyTitle = props => {
    return (
        <Text
            style={[styles.tinyTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
// Normal Texts
export const LargeText = props => {
    return (
        <Text
            style={[styles.largeTextStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const MediumText = props => {
    return (
        <Text
            style={[styles.mediumTextStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const RegularText = props => {
    return (
        <Text
            numberOfLines={props.numberOfLines}
            style={[styles.regularTextStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const SmallText = props => {
    return (
        <Text
            style={[styles.smallTextStyle, props.style]}
            onPress={props.onPress}
            numberOfLines={props.numberOfLines}
        >
            {props.children}
        </Text>
    );
}
export const TinyText = props => {
    return (
        <Text
            style={[styles.tinyTextStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const InputTitle = props => {
    return (
        <Text
            style={[styles.inputTitleStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}

export const ButtonTextRegular = props => {
    return (
        <Text
            style={[styles.ButtonTextRegularStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}
export const ButtonTextMedium = props => {
    return (
        <Text
            style={[styles.ButtonTextMediumStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}


export const TitleWithText = ({ title,titleStyle, text, onPressText, right, require }) => {
    return (
        <RowWrapper>
            <TinyTitle style={[{fontSize:fontSize.medium},titleStyle]}>
                {title}
                {
                    require ?
                        <MediumText style={{ color: colors.error }}> *</MediumText>
                        :
                        null
                }
            </TinyTitle>
            {
                right ?
                    right
                    :
                    <RegularText onPress={onPressText} style={[appStyles.textBlue]}>{text}</RegularText>
            }
        </RowWrapper>
    );
}





const styles = StyleSheet.create({
    xxlTitleStyle: {
        ...appStyles.h1
    },
    xlTitleStyle: {
        ...appStyles.h2
    },
    largeTitleStyle: {
        ...appStyles.h3
    },
    mediumTitleStyle: {
        ...appStyles.h4
    },
    smallTitleStyle: {
        ...appStyles.h5
    },
    tinyTitleStyle: {
        ...appStyles.h6,
        fontFamily: fontFamily.appTextBold
    },
    largeTextStyle: {
        ...appStyles.textLarge
    },
    mediumTextStyle: {
        ...appStyles.textMedium
    },
    regularTextStyle: {
        ...appStyles.textRegular
    },
    smallTextStyle: {
        ...appStyles.textSmall
    },
    tinyTextStyle: {
        ...appStyles.textTiny
    },
    inputTitleStyle: {
        ...appStyles.textRegular,
        ...appStyles.textGray
    },
    ButtonTextRegularStyle: {
        ...appStyles.ButtonTextRegular,
        //color: colors.appColor1
    },
    ButtonTextMediumStyle: {
        ...appStyles.ButtonTextMedium,
        //color: colors.appColor1
    },


});

