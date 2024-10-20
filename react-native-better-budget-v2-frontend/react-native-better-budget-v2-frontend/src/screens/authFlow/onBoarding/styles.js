import {StyleSheet, ToastAndroid} from 'react-native';
import {colors, fontFamily, fonts} from '../../../services';
import {height, totalSize, width} from 'react-native-dimension';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignSelf: 'center',
    width: width(100),
  },
  flatlist: {
    width: width(100),
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: totalSize(20),
    height: totalSize(20),
  },
  title: {
    fontSize: totalSize(2.4),
    color: colors.textColor,
    fontFamily: fontFamily.appTextBold,
  },
  description: {
    fontSize: totalSize(1.7),
    color: colors.textColor,
    fontFamily: fontFamily.appTextRegular,
    textAlign: 'center',
    marginHorizontal: width(6),
  },
  dots: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height(10)
  },
});
