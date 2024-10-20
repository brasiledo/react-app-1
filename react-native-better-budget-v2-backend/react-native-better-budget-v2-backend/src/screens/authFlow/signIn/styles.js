import { StyleSheet, ToastAndroid } from 'react-native';
import { colors, fontFamily, fonts } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  logoBg: {
    width: width(100),
    height: height(28)
  },
  logoAbsolute: {
    width: height(20),
    height: height(20),
  },
  logoAbsolute1: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: height(2),
  },
  title: {
    color: colors.textColor,
    fontSize: totalSize(2.4),
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  forgotpas: {
    color: colors.textColor,
    fontFamily: fontFamily.appTextBold,
    textAlign: 'right',
  },
  icon_sty: {
    marginRight: width(1),
  },
  btnIcon: {
    width: totalSize(2),
    height: totalSize(2),
    marginHorizontal: width(1.5),
  },
  subTitle: {
    color: colors.black,
    fontSize: totalSize(1.5),
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.appTextRegular,
  },
  signupText: {
    color: colors.textColor,
    fontSize: totalSize(1.5),
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.appTextBold,
  },
});
