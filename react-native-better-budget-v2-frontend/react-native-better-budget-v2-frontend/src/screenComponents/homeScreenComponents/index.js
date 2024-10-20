import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Notification from '../../assets/svgs/notification';
import { Spacers, Texts, Wrappers } from '../../components';
import { colors, fontFamily } from '../../services';
import Translate from '../../services/languageStrings/translate';

export const IncomeView = ({ income, incomeAmount, colorStyle }) => {
    return (
        <Wrappers.RowBasic style={[styles.main, colorStyle]}>
            <Texts.SmallText style={styles.income}>{income}</Texts.SmallText>
            <Texts.SmallText style={styles.income}>{incomeAmount}</Texts.SmallText>
        </Wrappers.RowBasic>
    );
};

export const SaveAmountView = ({ saveAmount, totalSaving, colorStyle }) => {
    return (
        <Wrappers.Wrapper style={[styles.saveView, colorStyle]}>
            <Spacers.Tiny />
            <Wrappers.Row>
                <Texts.SmallText style={styles.saveText}>{Translate('MyBudgetScreen.toSave')}</Texts.SmallText>
                <Texts.SmallText style={styles.saveText}>{Translate('MyBudgetScreen.totalSavings')}</Texts.SmallText>
            </Wrappers.Row>
            <Spacers.Tiny />

            <Wrappers.Row>
                <Texts.SmallText style={styles.saveAmount}>{saveAmount}</Texts.SmallText>
                <Texts.SmallText style={styles.saveAmount}>{totalSaving}</Texts.SmallText>
            </Wrappers.Row>
            <Spacers.Tiny />
        </Wrappers.Wrapper>
    );
};

export const NotificationView = ({ NotificationText, Button1Text, Button2Text, success, onPressButton1, onPressButton2 }) => {
    return (
        <Wrappers.Wrapper style={styles.notificationView}>
            <Wrappers.RowWrapperBasic>
                <Notification color={colors.white} width={18} height={18} />
                <Texts.SmallText style={styles.noticationText}>{NotificationText}</Texts.SmallText>
            </Wrappers.RowWrapperBasic>

            <Spacers.Base />

            <Wrappers.RowBasic style={{ ...styles.optionsView, marginLeft: success ? 0 : width(6) }}>
                <TouchableOpacity onPress={onPressButton1} activeOpacity={0.5}>
                    <Wrappers.Wrapper style={{ ...styles.optionView, backgroundColor: '#294535' }}>
                        <Texts.SmallText style={{ ...styles.optionText, color: colors.lightRed }}>{Button1Text}</Texts.SmallText>
                    </Wrappers.Wrapper>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressButton2} activeOpacity={0.5}>
                    <Wrappers.Wrapper style={{ ...styles.optionView, backgroundColor: colors.lightRed }}>
                        <Texts.SmallText style={{ ...styles.optionText, color: colors.placeholderColor }}>{Button2Text}</Texts.SmallText>
                    </Wrappers.Wrapper>
                </TouchableOpacity>


            </Wrappers.RowBasic>
        </Wrappers.Wrapper>
    );
};

export const TotalAmountView = ({ text, totalAmount, colorStyle }) => {
    return (
        <Wrappers.Row style={[styles.textStyleVew, colorStyle]}>
            <Texts.SmallText style={styles.textStyle}>{text}</Texts.SmallText>
            <Texts.SmallText style={styles.textStyle}>{totalAmount}</Texts.SmallText>
        </Wrappers.Row>
    );
};

export const CarryOverView = ({ text, saveAmount, onPressEdit }) => {
    return (
        <Wrappers.Component>
            <Texts.SmallText style={styles.text}>{text}</Texts.SmallText>
            <Spacers.Tiny />
            <Wrappers.RowWrapperBasic style={{ width: width(40) }}>
                <Texts.SmallText style={styles.amount}>{saveAmount}</Texts.SmallText>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressEdit} >
                    <Icon
                        name='edit-3'
                        type='feather'
                        size={13}
                        style={{ width: width(6) }}
                    />
                </TouchableOpacity>
            </Wrappers.RowWrapperBasic>
        </Wrappers.Component>
    );
};

const styles = StyleSheet.create({
    // IncomeView
    main: {
        backgroundColor: colors.grayBackground,
        alignItems: 'center',
    },
    income: {
        fontSize: totalSize(1.6),
        color: colors.textColor,
        fontFamily: fontFamily.appTextBold,
        marginHorizontal: width(3),
        marginVertical: width(3)
    },
    //SaveAmountView
    saveView: {
        backgroundColor: colors.grayBackground,
        borderRadius: 10,
    },
    saveText: {
        fontSize: totalSize(1.3),
        color: colors.textColor,
        fontFamily: fontFamily.appTextRegular,
    },
    saveAmount: {
        fontSize: totalSize(1.9),
        color: colors.textColor,
        fontFamily: fontFamily.appTextBold,
    },
    // NotificationView
    notificationView: {
        backgroundColor: colors.textColor,
        padding: 15,
        borderRadius: 15
    },
    noticationText: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.white,
        paddingHorizontal: 10
    },
    optionView: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 100
    },
    optionText: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextRegular,
    },
    optionsView: {
        justifyContent: 'space-between'
    },
    //TotalAmountView
    textStyleVew: {
        backgroundColor: colors.grayBackground,
        borderRadius: 10,
    },
    textStyle: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        marginHorizontal: width(3),
        marginVertical: width(3),
    },
    amountStyle: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        marginHorizontal: width(3),
        marginVertical: width(3),
    },
    //CarryOverView
    text: {
        fontSize: totalSize(1.4),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
    },
    amount: {
        fontSize: totalSize(1.4),
        fontFamily: fontFamily.appTextRegular,
        color: colors.textColor,
    },
});
