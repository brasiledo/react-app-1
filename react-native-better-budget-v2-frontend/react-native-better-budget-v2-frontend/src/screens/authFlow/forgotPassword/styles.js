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
});
