import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Texts, Wrappers } from '../../components';
import { colors, fontFamily } from '../../services';

export const ShowHomeDebts = ({ DebtsName, TotalDebts, DebtsPayment, onPressEdit }) => {
    return (
        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: colors.lightRed }}>
            <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3) }}>
                <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32) }}>{DebtsName}</Texts.SmallText>
                <Wrappers.RowWrapperCenter style={{ width: width(30) }}>
                    <Texts.SmallText style={styles.expenseDetail}>{DebtsPayment}</Texts.SmallText>
                    <TouchableOpacity onPress={onPressEdit} activeOpacity={0.5} >
                        <Icon
                            name='edit-3'
                            type='feather'
                            size={13}
                            style={{ width: width(6) }}
                        />
                    </TouchableOpacity>
                </Wrappers.RowWrapperCenter>
                <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32), textAlign: 'right' }}>{TotalDebts}</Texts.SmallText>
            </Wrappers.RowBasic>
        </Wrappers.Wrapper>
    );
};

const styles = StyleSheet.create({
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
    popupDebts: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleDebts: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: -totalSize(6),
    },
    popupPointDebts: {
        right: width(32),
        // left: 0,
        top: -totalSize(6),
        bottom: 0,
        width: totalSize(16),
        height: totalSize(16),
    },
    popupDebts1: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleDebts1: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: -totalSize(6),
    },
    popupPointDebts1: {
        right: -width(10),
        // left: 0,
        top: -totalSize(6),
        bottom: 0,
        width: totalSize(16),
        height: totalSize(16),
    },
});
