import React from 'react';
import { StyleSheet } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Texts, Wrappers } from '../../components';
import RoundCheckbox from '../../components/roundCheckBox';
import { colors, fontFamily } from '../../services';

export const ShowDebts = ({ DebtsName, DebtsAmount, editButton, checked, onValueChange }) => {
    return (
        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: colors.lightRed }}>
            <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3) }}>
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
                    <Texts.SmallText style={{ ...styles.expenseDetail, marginLeft: editButton ? width(2) : 0 }}>{DebtsName}</Texts.SmallText>
                </Wrappers.RowBasic>
                <Wrappers.RowBasic>
                    <Texts.SmallText style={styles.expenseDetail}>{DebtsAmount}</Texts.SmallText>
                    {editButton &&
                        <Icon
                            name={'menu'}
                            type="entypo"
                            size={22}
                            color={colors.disableText}
                            style={{ marginTop: '-10%', marginLeft: width(2) }}
                        />
                    }
                </Wrappers.RowBasic>
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
    popupMenu: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
        width: width(70)
    },
    containerStyleMenu: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
    },
    popupPointMenu: {
        right: width(1),
        top: 0,
        bottom: 0,
        width: totalSize(4),
        height: totalSize(4),
    },
});
