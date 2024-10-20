import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    headingView: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightRed,
    },
    headingText: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        marginHorizontal: width(3),
        marginVertical: height(1)
    },
    innerItemView: {
        backgroundColor: colors.lightRed,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: colors.white,
        borderTopColor: colors.white
    },
    expenseView: {
        borderBottomColor: colors.lightRed
    },
    imageStyle: {
        width: totalSize(2.8),
        height: totalSize(2.8),
    },
    iconStyle: {
        marginHorizontal: width(3),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    expenseName: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
        marginHorizontal: width(3),
        marginVertical: height(1.5)
    },
    categoryView: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
        marginVertical: height(1),
    },
    categoryName: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor,
    },
    categoryAmount: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
    },
});
