import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    mainImg: {
        width: width(90),
        height: height(40),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: totalSize(2.1),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor
    },
    pointsText: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
        justifyContent: 'center',
        marginHorizontal: width(2)
    },
});
