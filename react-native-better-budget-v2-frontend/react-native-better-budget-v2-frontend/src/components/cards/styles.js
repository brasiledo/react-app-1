import { sizes, colors, appStyles } from "../../services";
import { totalSize } from "react-native-dimension";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    //UserInfoPrimaryCard
    userInfoPrimaryCard: {
        padding: sizes.smallMargin * 1.5
    },

    //UserInfoSecondaryCard
    userInfoSecondaryCard: {
        // padding: sizes.smallMargin * 1.5
        marginVertical: sizes.marginVertical
    },

    //ExpertyPrimaryCard
    expertyPrimaryCardContainer: {
        backgroundColor: colors.appBgColor3 + '40',
        borderRadius: 25
    },
    expertyPrimaryCardNumberContainer: {
        // padding: sizes.TinyMargin,
        height: totalSize(2.5),
        width: totalSize(2.5),
        ...appStyles.center,
        backgroundColor: colors.appBgColor3 + '80',
        borderRadius: 100
    },
    selectedUserImageOverlay: {
        top: 0, right: 0, left: 0, bottom: 0,
        borderRadius: 100,
        backgroundColor: colors.appColor1 + '80',
        ...appStyles.center
    }
})