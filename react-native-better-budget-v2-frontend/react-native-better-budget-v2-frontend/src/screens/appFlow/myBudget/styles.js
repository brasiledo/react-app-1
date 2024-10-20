import { StyleSheet, ToastAndroid } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily } from '../../../services';

export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.white,
        flex: 1,
    },
    carryOverView: {
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    // tool tips
    popupCarryOver: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
    },
    containerStyleCarryOver: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: -totalSize(2),
    },
    popupPointCarryOver: {
        right: 0,
        left: 0,
        top: -totalSize(2),
        bottom: 0,
        width: totalSize(8),
        height: totalSize(8),
    },
    popupSave: {
        backgroundColor: colors.lightGreen,
        borderRadius: 5,
        width: width(50)
    },
    containerStyleSave: {
        padding: 0,
        margin: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.white,
        marginTop: -totalSize(2),
    },
    popupPointSave: {
        right: width(32),
        // left: 0,
        top: -totalSize(2),
        bottom: 0,
        width: totalSize(8),
        height: totalSize(8),
    },
});
