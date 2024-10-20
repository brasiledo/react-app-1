import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    overviewDate: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.dodgerBlue,
        justifyContent: 'center',
        textAlign: 'center'
    },
    progressChartView: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: height(21)
    },
    progressChartText: {
        fontSize: totalSize(2),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        justifyContent: 'center',
        textAlign: 'center'
    },
    forwardArrow: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: width(2)
    },
    titleText: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor,
    },
    slider: {
        width: width(100),
        height: height(5),
        marginHorizontal: -width(3)
    },
    progressBarAmountView: {
        marginTop: '-3%'
    },
    progressBarAmount: {
        fontSize: totalSize(1.4),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
    },
    absoluteCurrentAmount: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        marginTop: -width(7)
    },
    absoluteProjectedAmount: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        textAlign: 'right',
    },
    debtsView: {
        backgroundColor: colors.grayBackground,
        borderRadius: 100,
        padding: 12,
        alignItems: 'center',
    },
    projectedText: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor,
    },
    projectedTextType: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextBold,
        color: '#007FFF',
    },
    absoluteCurrentAmountDebt: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
        textAlign: 'right',
        marginTop: -width(7)
    },
    absoluteProjectedAmountDebt: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextBold,
        color: colors.textColor,
    },
    // tool tips
    popupOverviewDate: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleOverviewDate: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: totalSize(5.5),
    },
    popupPointOverviewDate: {
        right: width(37),
        top: -totalSize(2.5),
        bottom: 0,
        width: totalSize(8),
        height: totalSize(8),
    },
    popupDetail: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleDetail: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: totalSize(11),
    },
    popupPointDetail: {
        right: width(30),
        top: -totalSize(7),
        bottom: 0,
        width: totalSize(18),
        height: totalSize(18),
    },
    popupDebtsView: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleDebtsView: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: totalSize(6),
    },
    popupPointDebtsView: {
        right: 0,
        top: -totalSize(2),
        bottom: 0,
        width: totalSize(8),
        height: totalSize(8),
    },
});
