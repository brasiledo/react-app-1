import {StyleSheet, ToastAndroid} from 'react-native';
import {colors, fontFamily, fonts} from '../../../services';
import {height, totalSize, width} from 'react-native-dimension';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    color: colors.textColor,
    fontSize: totalSize(3.2),
    justifyContent: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  subTitle: {
    color: colors.black,
    fontSize: totalSize(1.5),
    justifyContent: 'center',
    fontFamily: fontFamily.appTextRegular,
  },
  input_otp: {
    width: totalSize(7),
    height: totalSize(7),
    width: width(94),
  },
  opt_input: {
    borderRadius: 15,
    borderColor: colors.textColor,
    color: colors.textColor,
    fontSize: totalSize(3),
    justifyContent: 'center',
    height: totalSize(7),
    width: totalSize(7),
    borderWidth: 1,
  },
});
