import React, { FC, PropsWithChildren, useState } from 'react'
import { appIcons, appImages, appStyles, colors, fontFamily, sizes, } from '../../services';
import { Wrappers, Texts, Icons, Images, Spacers, Buttons } from '..';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension';
import Lottie from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';
import Home from '../../assets/svgs/home';
import Insights from '../../assets/svgs/insights';
import Budget from '../../assets/svgs/budget';
import Notification from '../../assets/svgs/notification';
import Translate from '../../services/languageStrings/translate';
import { useFocusEffect } from '@react-navigation/native';

// empty component on tab screens
export const EmptyView = ({ expenseSource, LottieView, Text, onPressButton }) => {
  return (
    <Wrappers.Wrapper style={styles.main}>
      {expenseSource ? (
        <Image
          source={appImages.emptyBudget}
          resizeMode="contain"
          style={styles.imageView}
        />
      ) : null}

      {LottieView ? (
        <Lottie
          style={styles.imageView}
          source={appImages.notification}
          autoPlay
          loop
        />
      ) : null}

      {!LottieView && <Spacers.DoubleBase />}
      <Texts.Medium style={styles.text}>{Text}</Texts.Medium>
      <Spacers.DoubleBase />

      {onPressButton ? (
        <Buttons.ButtonColored
          text={Translate('OnBoardingScreen.onBoardingTitle1')}
          buttonColor={colors.textColor}
          tintColor={colors.white}
          buttonStyle={styles.button}
          onPress={onPressButton}
        />
      ) : null}
    </Wrappers.Wrapper>
  );
};

// on show budget Detail screen
export const ExpenseHeader = ({ bottomWidth }) => {
  return (
    <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: bottomWidth ? bottomWidth : colors.lightRed }}>
      <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginBottom: totalSize(1.3) }}>
        <Texts.SmallText style={{ ...styles.heading, width: width(27) }}>{Translate('Expenses')}</Texts.SmallText>
        <Texts.SmallText style={{ ...styles.heading, width: width(25), textAlign: 'center' }}>{Translate('Frequency')}</Texts.SmallText>
        <Texts.SmallText style={{ ...styles.heading, width: width(20), textAlign: 'center' }}>{Translate('nextDueDate')}</Texts.SmallText>
        <Texts.SmallText style={{ ...styles.heading, width: width(22), textAlign: 'right' }}>{Translate('Amount')}</Texts.SmallText>
      </Wrappers.RowBasic>
    </Wrappers.Wrapper>
  )
}

// on show budget Detail screen
export const DebtsHeader = ({ bottomWidth }) => {
  return (
    <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: bottomWidth ? bottomWidth : colors.lightRed }}>
      <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginBottom: totalSize(1.3) }}>
        <Texts.SmallText style={styles.heading}>{Translate('Debt')}</Texts.SmallText>
        <Texts.SmallText style={styles.heading}>{Translate('totalAmount')}</Texts.SmallText>
      </Wrappers.RowBasic>
    </Wrappers.Wrapper>
  )
}

// setting screen
export const SettingCard = ({ onPressCard, iconName, iconSource, title, userEmail, type }) => {
  return (
    <TouchableOpacity onPress={onPressCard} activeOpacity={0.6}>
      <Wrappers.RowBasic style={styles.bottomLine}>
        <Wrappers.RowWrapperBasic>
          {iconName ?
            <Wrappers.Wrapper style={{ marginHorizontal: width(3) }}>
              <Icon
                name={iconName}
                type="feather"
                size={totalSize(2)}
                color={colors.black}
              />
            </Wrappers.Wrapper>
            :
            <Wrappers.Wrapper style={{ marginHorizontal: width(3) }}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={styles.icons}
              />
            </Wrappers.Wrapper>
          }
          <Wrappers.Wrapper>
            <Texts.SmallTitle style={styles.settingMain}>{title}</Texts.SmallTitle>
            {userEmail &&
              <Texts.SmallTitle style={styles.settingEmail}>{userEmail}</Texts.SmallTitle>
            }
          </Wrappers.Wrapper>
        </Wrappers.RowWrapperBasic>

        <Wrappers.Wrapper style={styles.iconView}>
          {type &&
            <Texts.SmallTitle style={styles.settingLanguage}>{type}</Texts.SmallTitle>
          }
          <Icon
            name="chevron-small-right"
            type="entypo"
            size={totalSize(3)}
            color={colors.grayIcon}
          />
        </Wrappers.Wrapper>
      </Wrappers.RowBasic>
    </TouchableOpacity>
  )
}

// setting screen
export const UpgradedView = ({ amountUpgraded, detailUpgraded, tagImage }) => {
  return (
    <Wrappers.RowBasic style={styles.viewBackground}>
      <Wrappers.Wrapper style={{ padding: 10 }}>
        <Texts.SmallText style={styles.textAmount}>{amountUpgraded}</Texts.SmallText>
        <Spacers.Tiny />
        <Texts.SmallText style={styles.detail}>{detailUpgraded}</Texts.SmallText>
      </Wrappers.Wrapper>

      <Wrappers.RowBasic>
        {tagImage &&
          <Image source={appIcons.valueTag} resizeMode={'contain'} style={styles.tagStyle} />
        }
        <Wrappers.Wrapper style={styles.iconStyle}>
          <Icon
            name='arrow-forward'
            type='MaterialIcons'
            size={22}
          />
        </Wrappers.Wrapper>
      </Wrappers.RowBasic>
    </Wrappers.RowBasic>
  )
}

// on show expenses budget screen
export const ExpenseHeaderHome = ({ borderColor }) => {
  return (
    <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: borderColor ? borderColor : colors.lightRed }}>
      <Wrappers.Component>
        <Wrappers.RowBasic style={{ marginBottom: totalSize(1.3) }}>
          <Texts.SmallText style={{ ...styles.heading, width: width(32) }}>{Translate('Expenses')}</Texts.SmallText>
          <Texts.SmallText style={{ ...styles.heading, width: width(30), textAlign: 'center', }}>{Translate('dueDate')}</Texts.SmallText>
          <Texts.SmallText style={{ ...styles.heading, width: width(32), textAlign: 'right' }}>{Translate('Amount')}</Texts.SmallText>
        </Wrappers.RowBasic>
      </Wrappers.Component>
    </Wrappers.Wrapper>
  )
}

// on show debts budget screen
export const DebtsHeaderHome = ({ borderColor }) => {
  return (
    <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: borderColor ? borderColor : colors.lightRed }}>
      <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginBottom: totalSize(1.3) }}>
        <Texts.SmallText style={{ ...styles.heading, width: width(32) }}>{Translate('Debt')}</Texts.SmallText>
        <Wrappers.Wrapper>
          <Texts.SmallText style={{ ...styles.heading, width: width(30), textAlign: 'center' }}>{Translate('MyBudgetScreen.debtTotal')}</Texts.SmallText>
          <Texts.SmallText style={styles.subHeading}>{Translate('MyBudgetScreen.debtTotalDetail')}</Texts.SmallText>
        </Wrappers.Wrapper>
        <Texts.SmallText style={{ ...styles.heading, width: width(32), textAlign: 'right' }}>{Translate('Payment')}</Texts.SmallText>
      </Wrappers.RowBasic>
    </Wrappers.Wrapper>
  )
}

// for walkthrough tooltips
export const ToolTips = ({ isVisible, popupViewStyle, popopText, placement, onClose, contentStyle, onPress, popupPointStyle, textView,
  currentValueX, currentValueY, nextValueX, nextValueY }) => {

  const value = useState(new Animated.ValueXY({ x: currentValueX, y: currentValueY }))[0]

  function moveBall() {
    Animated.timing(value, {
      toValue: { x: nextValueX, y: nextValueY },
      duration: 400,
      useNativeDriver: false
    }).start()
  }

  return (
    <Tooltip
      isVisible={isVisible}
      content={
        // <Wrappers.Wrapper style={popupViewStyle}>
        //   <Texts.SmallText style={styles.popupText}>{popopText}</Texts.SmallText>
        // </Wrappers.Wrapper>

        <TouchableOpacity style={{}} onPress={moveBall}>
          <Text style={{ color: 'green' }}>description is here</Text>
        </TouchableOpacity>
      }
      backgroundColor={'rgba(0,0,0,0.5)'}
      placement={placement ?? "top"}
      onClose={onClose}
      contentStyle={contentStyle}
      arrowSize={{ width: 0, height: 0 }}
      useInteractionManager={true}
    // allowChildInteraction={false}
    // showChildInTooltip={false}
    >

      {/* <TouchableOpacity onPress={onPress} style={{}} >
        <Animated.View style={value.getLayout()}>
          <View style={{ width: 80, height: 80, borderRadius: 100 / 2, left: 100, backgroundColor: 'white', position: 'absolute' }}>
            {textView}
          </View>
        </Animated.View>
      </TouchableOpacity> */}

      <View style={{ width: 80, height: 80, borderRadius: 100 / 2, left: 100, backgroundColor: 'white', position: 'absolute' }}>
        <Text>Usama</Text>
      </View>
    </Tooltip>
  )
}

// custom tooltips circle
export const CustomPopupPoint = ({ widthPoint, heightPoint, left, right, bottom, top, widthPopup, topPopup, bottomPopup, rightPopup, leftPopup, popupText, tooltipValue,
  // currentValueX, currentValueY, nextValueX, nextValueY,
  topView, bottomView, onPressPopup }) => {

  // const value = useState(new Animated.ValueXY({ x: currentValueX, y: currentValueY }))[0]

  // function moveBall() {
  //   Animated.timing(value, {
  //     toValue: { x: nextValueX, y: nextValueY },
  //     duration: 400,
  //     useNativeDriver: false
  //   }).start()
  // }



  return (

    <View style={{ position: 'absolute' }}>
      {/* <Animated.View style={value.getLayout()}> */}
      <TouchableOpacity onPress={onPressPopup} activeOpacity={0.5} style={{ width: widthPoint ?? width(20), height: heightPoint ?? width(20), borderRadius: 100, backgroundColor: 'white', }} />
      {/* </Animated.View> */}
    </View>


  )
}

// custom tooltips text view
export const CustomTextView = ({ widthPopup, topPopup, bottomPopup, rightPopup, leftPopup, popupText, topView, bottomView }) => {

  return (
    <View>
      {topView &&
        <View style={{ ...styles.popup, width: widthPopup ?? width(80), top: topPopup, bottom: bottomPopup, right: rightPopup, left: leftPopup }}>
          <Text style={styles.popupText}>{popupText}</Text>
        </View>
      }

      {bottomView &&
        <View style={{ ...styles.popup, width: widthPopup ?? width(80), top: topPopup, bottom: bottomPopup, right: rightPopup, left: leftPopup }}>
          <Text style={styles.popupText}>{popupText}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  popupAutoFill: {
    position: 'absolute',
    marginTop: -totalSize(14),
    backgroundColor: 'rgb(35, 105, 93)',
    borderRadius: 5,
    width: width(80),
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    zIndex: 1,
  },
  // tooltips custom
  popupPoint: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  popupText: {
    color: colors.white,
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextBold,
    padding: 20,
    textAlign: 'center',
    zIndex: 10,
  },
  popup: {
    backgroundColor: 'rgb(35, 105, 93)',
    position: 'absolute',
    borderRadius: 5,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    zIndex: 10,
  },
  // empty view
  main: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width(100),
    height: height(90),
  },
  imageView: {
    width: totalSize(20),
    height: totalSize(20),
    marginTop: '-20%',
  },
  text: {
    fontSize: totalSize(2.4),
    fontFamily: fontFamily.appTextBold,
    color: colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: width(15),
  },
  button: {
    width: width(70),
  },
  // Debt and expense
  heading: {
    fontSize: totalSize(1.3),
    color: colors.textColor,
    fontFamily: fontFamily.appTextBold,
  },
  subHeading: {
    fontSize: totalSize(0.9),
    color: colors.textColor,
    fontFamily: fontFamily.appTextRegular,
    textAlign: 'center'
  },
  // Setting Card
  icons: {
    width: totalSize(2),
    height: totalSize(2),
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightRed,
  },
  settingMain: {
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextRegular,
    color: colors.placeholderColor,
    justifyContent: 'center',
  },
  settingEmail: {
    fontSize: totalSize(1.3),
    fontFamily: fontFamily.appTextRegular,
    color: colors.graySilver,
    justifyContent: 'center',
  },
  settingLanguage: {
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextBold,
    color: colors.placeholderColor,
    justifyContent: 'center',
    marginHorizontal: width(4)
  },
  iconView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: height(2),
    flexDirection: 'row'
  },
  // Upgraded view
  viewBackground: {
    backgroundColor: colors.lightRed,
    borderRadius: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textAmount: {
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextBold,
    color: colors.lightGreen,
  },
  detail: {
    fontSize: totalSize(1.3),
    fontFamily: fontFamily.appTextRegular,
    color: colors.textColor,
  },
  tagStyle: {
    width: totalSize(5),
    height: totalSize(5),
    marginTop: -width(1),
  },
});

