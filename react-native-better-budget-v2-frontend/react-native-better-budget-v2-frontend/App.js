import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import store from './src/Redux/index';
import { colors } from './src/services';
import i18n from "i18n-js";
import { setI18nConfig } from './src/services/utils/helperFunctions';
import { CopilotProvider } from 'react-native-copilot';
import { width, height, totalSize } from "react-native-dimension";

function App() {
  LogBox.ignoreAllLogs()

  useEffect(() => {
    i18n.defaultLocale = 'en'
    setI18nConfig('en')
  }, [])

  const style = {
    backgroundColor: 'rgb(35, 105, 93)',
    borderRadius: 10,
    // width: width(70),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  };

  const customSvgPath = (args) => {
    if (args.step?.name === "currency") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(60)},${args.position.y._value + totalSize(7)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`; //Za100 100 0 1 0 200 0 100 100 0 1 0-200 0
    } else if (args.step?.name === "feature") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(8)}Za100 100 0 1 0 200 0 100 100 0 1 0-200 0`;
    } else if (args.step?.name === 'minimum') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(60)},${args.position.y._value + totalSize(8)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === 'totalAmount') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(60)},${args.position.y._value + totalSize(8)}Za40 40 0 1 0 80 0 40 40 0 1 0-80 0`;
    } else if (args.step?.name === 'incomeSource') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(8)}Za100 100 0 1 0 200 0 100 100 0 1 0-200 0`;
    } else if (args.step?.name === 'incomeType') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(8)}Za70 70 0 1 0 140 0 70 70 0 1 0-140 0`;
    } else if (args.step?.name === 'frequency') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(8)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === 'nextPayDate') {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(7)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
    } else if (args.step?.name === "menuIcon") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(4)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "crossIcon") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(90)},${args.position.y._value + totalSize(4)}Za20 20 0 1 0 40 0 20 20 0 1 0-40 0`;
    } else if (args.step?.name === "expenseName") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(0.5)},${args.position.y._value + totalSize(5)}Za25 25 0 1 0 50 0 25 25 0 1 0-50 0`;
    } else if (args.step?.name === "nextBillDue") {
      return `M0,0H${args.canvasSize.x}V${args.canvasSize.y}H0V0ZM${width(1)},${args.position.y._value + totalSize(6)}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
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
