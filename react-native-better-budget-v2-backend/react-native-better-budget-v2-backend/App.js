import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import store from './src/Redux/index';
import { colors } from './src/services';
import i18n from "i18n-js";
import { setAppLanguage, setI18nConfig } from './src/services/utils/helperFunctions';
import { CopilotProvider } from 'react-native-copilot';
import { width, height, totalSize } from "react-native-dimension";
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  LogBox.ignoreAllLogs()

   // getAppLanguage
   const getAppLanguage = async () => {
    let appLang = await AsyncStorage.getItem('LANGUAGE')
    setAppLanguage(appLang?? 'English')
}

  useEffect(() => {
    i18n.defaultLocale = 'en'
    // setI18nConfig('en')
    getAppLanguage()
  }, [])

  const style = {
    backgroundColor: 'rgb(35, 105, 93)',
    borderRadius: 10,
    // margin: 15,
    // width: width(70),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  };

  const customSvgPath = (args) => {
    if (args.step?.name === "currency") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(6)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`; //Za100 100 0 1 0 200 0 100 100 0 1 0-200 0
    } else if (args.step?.name === "feature") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za100 100 0 1 0 200 0 100 100 0 1 0-200 0`;
    } else if (args.step?.name === 'minimum') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === 'totalAmount') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === 'incomeSource') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za100 100 0 1 0 200 0 100 100 0 1 0-200 0`;
    } else if (args.step?.name === 'incomeType') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za70 70 0 1 0 140 0 70 70 0 1 0-140 0`;
    } else if (args.step?.name === 'frequency') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === 'nextPayDate') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(6)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === "menuIcon") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(3)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "crossIcon") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(90)},${args.position.y._value + totalSize(2)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "expenseName") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(0.5)},${args.position.y._value + totalSize(4)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "nextBillDue") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(5)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === "budgetDetailEdit") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(2)},${args.position.y._value + totalSize(2)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "swipeExpense") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(80)},${args.position.y._value + totalSize(5)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "radioExpense") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(0.2)},${args.position.y._value + totalSize(5)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "menuDebts") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(88)},${args.position.y._value + totalSize(3)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "homeDots") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(2)},${args.position.y._value + totalSize(2)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "homebudget") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(35)},${args.position.y._value + totalSize(2)}Za60 60 0 1 0 120 0 60 60 0 1 0-120 0`;
    } else if (args.step?.name === "homePlus") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(76)},${args.position.y._value + totalSize(2)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "homeUser") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(86)},${args.position.y._value + totalSize(2)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "homeSwipe") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(82)},${args.position.y._value + totalSize(4)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "homePencil") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(88)},${args.position.y._value + totalSize(4)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "homeDebts") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(32)},${args.position.y._value + totalSize(8)}Za90 90 0 1 0 180 0 90 90 0 1 0-180 0`;
    } else if (args.step?.name === "homeDebts1") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(68)},${args.position.y._value + totalSize(8)}Za90 90 0 1 0 180 0 90 90 0 1 0-180 0`;
    } else if (args.step?.name === "homeSave") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(45)},${args.position.y._value + totalSize(4)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === "homeCarry") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(2)},${args.position.y._value + totalSize(4)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === "insightDots") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(2)},${args.position.y._value + totalSize(3)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "insightDate") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(45)},${args.position.y._value + totalSize(3)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === "insightShowDetail") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(25)},${args.position.y._value + totalSize(5)}Za90 90 0 1 0 180 0 90 90 0 1 0-180 0`;
    } else if (args.step?.name === "insightTotalDebts") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(78)},${args.position.y._value + totalSize(4)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === "insightPayoff") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(78)},${args.position.y._value + totalSize(3)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === "notifications") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(70)},${args.position.y._value + totalSize(3)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    }
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.background} barStyle={'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <CopilotProvider tooltipStyle={style} arrowColor={null} svgMaskPath={customSvgPath} stepNumberComponent={() => null} >
          <Navigation />
        </CopilotProvider>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
