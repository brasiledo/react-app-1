import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    userProfile: {
        width: totalSize(13),
        height: totalSize(13),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    editProfile: {
        width: totalSize(2.9),
        height: totalSize(2.9),
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.textColor,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.white,
        position: 'absolute',
        right: width(38),
        top: height(11),
    },
    planView: {
        backgroundColor: colors.lightRed,
        padding: 10,
        paddingVertical: 15,
        borderRadius: 15
    },
    planText: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextBold,
        color: colors.black,
    },
    username: {
        width: width(45),
    },
    rowInput: {
        width: width(43),
    },
    loadingIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
