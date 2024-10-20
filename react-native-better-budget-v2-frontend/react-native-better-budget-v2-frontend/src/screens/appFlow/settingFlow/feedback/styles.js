import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    title: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextBold,
        color: colors.mediumDark
    },
});
