import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },

    // keypad
    keyboardView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        width: '100%'
    },
    absoluteText: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: height(3)
      },
    tickView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: height(24),
        backgroundColor: colors.background,
    },
    skipView: {
        width: '100%',
        height: height(6),
        borderWidth: 1,
        borderColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    keyboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        width: '75%',
    },
    button: {
        width: '33.3%',
        height: height(6),
        borderWidth: 1,
        borderColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // padding: '3%'
    },
    tick: {
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        borderWidth: 1,
        borderColor: colors.background,
    },
    buttonLabel: {
        fontSize: totalSize(1.6),
        fontFamily: fontFamily.appTextBold,
        color: colors.black,
    },
    skipLabel: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextRegular,
        color: colors.black,
    },
});
