import { StyleSheet } from 'react-native';
import { sizes, colors, appStyles, fontFamily } from '../../services';
import { totalSize, height, width } from 'react-native-dimension';

export const styles = StyleSheet.create({
  professionsCard: {
    //borderColor:colors.appBgColor3,
    marginBottom: sizes.marginBottom,
  },
  selectedProfessionsCard: {
    // borderColor:colors.appTextColor1,
    backgroundColor: colors.appBgColor2,
    marginBottom: sizes.marginBottom,
  },

  ////SwipableModal
  swipableModalFooter: {
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.cardRadius,
    borderTopRightRadius: sizes.cardRadius,
    // paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
    paddingBottom:height(3)
  },
  barContainer: {
    top: sizes.TinyMargin,
    alignSelf: 'center',
  },
  //EnterValueModalPrimaryCard
  enterValueModalPrimaryCard: {
    backgroundColor: colors.appBgColor1,
    borderRadius: sizes.modalRadius,
    padding: sizes.baseMargin,
    marginHorizontal: sizes.marginHorizontal * 2,
    ...appStyles.shadow,
  },

  //  BottomModal
  headingTitle: {
    fontSize: totalSize(2),
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    marginVertical: height(2),
  },
  textArray: {
    fontSize: totalSize(1.5),
    fontFamily: fontFamily.appTextRegular,
    marginVertical: height(2),
    lineHeight: 20,
  },
  viewArray: {
    borderWidth: 1,
    borderColor: colors.lightRed,
  },
  iconStyle: {
    marginHorizontal: width(4),
  },

  // CenterModal
  centerView: {
    backgroundColor: colors.white,
    borderRadius: sizes.cardRadius,
    marginHorizontal: width(8),
    // paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
  },
  viewText: {
    fontSize: totalSize(1.7),
    fontFamily: fontFamily.appTextRegular,
    padding: totalSize(2.5),
    textAlign: 'center',
  },

  // Calender
  weekTitle: {
    fontSize: totalSize(1.5),
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
  },

  // Debts
  buttonWidth: {
    marginHorizontal: width(10)
  },
  incomeView: {
    backgroundColor: colors.disableText,
    marginHorizontal: width(3),
    borderRadius: 10,
    paddingVertical: 10
  },
  incomeType: {
    fontSize: totalSize(1),
    color: colors.lightGreen,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  incomeTitle: {
    fontSize: totalSize(1.5),
    color: colors.placeholderColor,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  // expenses
  expenseAmount: {
    fontSize: totalSize(1.5),
    color: colors.placeholderColor,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
  },
  flatlist: {
    width: width(25),
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: totalSize(5),
    height: totalSize(5),
  },
  title: {
    fontSize: totalSize(1.2),
    color: colors.black,
    fontFamily: fontFamily.appTextRegular,
    borderWidth: 0,
    padding: 1,
    width: width(20),
    height: height(5),
    justifyContent: 'center',
    textAlign: 'center'
  },
  // Delete Modal
  deleteTitle: {
    fontSize: totalSize(2.4),
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
    marginHorizontal: width(10),
    justifyContent: 'center',
    textAlign: 'center'
  },
  deleteView: {
    backgroundColor: colors.deleteBg,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 20
  },
  // show Notification Detail
  iconView: {
    backgroundColor: colors.textColor,
    // padding: 15,
    width: totalSize(6),
    height: totalSize(6),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: width(2)
  },
  notificationTitle: {
    fontSize: totalSize(1.6),
    color: colors.black,
    fontFamily: fontFamily.appTextRegular,
    marginHorizontal: width(10),
    justifyContent: 'center',
    textAlign: 'center'
  },
  // Simple Modal
  titleView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.disableText
  },
  addTitle: {
    fontSize: totalSize(2.5),
    marginVertical: height(2),
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
    justifyContent: 'center',
    textAlign: 'center'
  },
  flatlistTitle: {
    fontSize: totalSize(1.6),
    marginVertical: height(2),
    // color: colors.placeholderColor,
    fontFamily: fontFamily.appTextBold,
    justifyContent: 'center',
    textAlign: 'center'
  },
  // Edit expense View tab bar
  textView: {
    borderRadius: 100,
    marginRight: width(3),
    marginVertical: height(0.5)
  },
  text: {
    fontSize: totalSize(1.5),
    marginHorizontal: totalSize(1.5),
    marginVertical: totalSize(1),
    fontFamily: fontFamily.appTextRegular,
  },
  // Edit modal Home
  iconTextInput: {
    width: width(88)
  },
  //ShowTotalDebtsModal
  totalDebtsText: {
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextBold,
    color: colors.placeholderColor,
    marginVertical: totalSize(1),
  },
  totalDebtsTextHeader: {
    fontSize: totalSize(1.3),
    fontFamily: fontFamily.appTextBold,
    color: colors.lightGreen,
    textDecorationLine: 'underline',
    marginVertical: totalSize(1),
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
