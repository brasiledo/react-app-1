import { StyleSheet, ToastAndroid } from 'react-native';
import { colors, fontFamily } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    flex: 1,
  },
  username: {
    width: width(45),
  },
  rowInput: {
    width: width(43),
  },
  title: {
    color: colors.textColor,
    fontSize: totalSize(3.2),
    justifyContent: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  icon_sty: {
    marginRight: width(1),
  },
  btnIcon: {
    width: totalSize(2),
    height: totalSize(2),
    marginHorizontal: width(1.5),
  },
  acceptPolicy: {
    color: colors.textColor,
    fontSize: totalSize(1.2),
    justifyContent: 'center',
    fontFamily: fontFamily.appTextRegular,
  },
  acceptPolicy1: {
    color: colors.textColor,
    fontSize: totalSize(1.2),
    justifyContent: 'center',
    fontFamily: fontFamily.appTextBold,
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
