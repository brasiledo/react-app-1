import { StyleSheet, ToastAndroid } from 'react-native';
import { colors, fontFamily, fonts } from '../../../../services';
import { height, totalSize, width } from 'react-native-dimension';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headingTitle: {
    fontSize: totalSize(1.8),
    fontFamily: fontFamily.appTextBold,
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.placeholderColor,
  },
  iconTextInput: {
    width: width(88)
  },
  absoluteText: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height(3)
  },
  skipText: {
    fontSize: totalSize(1.5),
    color: colors.placeholderColor,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  bottomView: {
    marginBottom: height(10)
  },
});
