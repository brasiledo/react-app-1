import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Buttons, Headers, Modals, ScrollViews, Spacers, TextInputs, Wrappers, } from '../../../../components';
import { MultipleView } from '../../../../screenComponents/createBudget';
import { colors, routes, selectedCurrency, selectedCurrencySymbol } from '../../../../services';
import { styles } from './styles';
import { Currencies, ToolTiopsText } from '../../../../services/dummyData';
import { width, height, totalSize } from "react-native-dimension";
import Translate from '../../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { uniqueID } from '../../../../services/utils/utility';
import { useSelector } from 'react-redux';
import { convert_numbers, remove_commas } from '../../../../services/utils/helperFunctions';

const CreateBudget = ({ navigation }) => {

  // redux data
  let redux_user = useSelector(state => state?.Auth?.user)

  // tooltips
  const CopilotView = walkthroughable(View);
  const { start, currentStep, stop } = useCopilot()

  // useStates
  const [user, setUser] = useState(redux_user ?? []);
  const [budgetName, setBudgetName] = useState('');
  const [currency, setCurrency] = useState('US Dollar');
  const [feature, setFeature] = useState('Enable');
  const [incomeSource, setIncomeSource] = useState('Single');
  const [accountMinimum, setAccountMinimum] = useState('');
  const [totalSaving, setTotalSaving] = useState('');
  const [isModalBottomVisible, setModalBottomVisible] = useState(false);
  const [isModalFeatureVisible, setModalFeatureVisible] = useState(false);
  const [isModalMinimumVisible, setModalMinimunVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(0)

  // All useEffects
  // timeout for tooltip visible
  useEffect(() => {
    setTimeout(() => {
      setTooltipVisible(1)
    }, 1000);
  }, [])

  // for start tooltip
  useEffect(() => {
    if (redux_user?.firstTimeLogin == true) {
      void start()
    }
  }, [tooltipVisible])

  // set user data
  useEffect(() => {
    setUser(redux_user ?? [])
  }, [redux_user])

  // All Functions
  const onPressContinue = () => {
    let id = uniqueID()
    navigation.navigate(routes.addNetIncome, {
      _id: id,
      budgetName: budgetName,
      feature: feature,
      accountMinimum: accountMinimum,
      totalSaving: totalSaving,
      incomeSource: incomeSource,
      currency: currency,
      userId: user?.userId,
      createdAt: Date.parse(new Date()),
      budgetDates: []
    });
  }

  return (
    <Wrappers.Main>
      <Wrappers.Wrapper style={{ ...styles.wrapper, backgroundColor: colors.white }}>
        <Headers.Main
          title={Translate('OnBoardingScreen.onBoardingTitle1')}
          onBackPress={() => navigation.goBack()}
          tooltipStatus={false}
        />
        <ScrollViews.KeyboardAvoiding>
          <Wrappers.Component>
            <Spacers.Base />

            <TextInputs.TextInputLowerBordered
              placeholder={Translate('budgetName')}
              value={budgetName}
              onChangeText={bn => setBudgetName(bn)}
            />
            <Spacers.Base />

            <Wrappers.Wrapper>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setModalBottomVisible(!isModalBottomVisible)}>
                <CopilotStep text={ToolTiopsText.text1} order={0} name="currency">
                  <CopilotView>
                    <TextInputs.TextInputLowerBorder
                      title={Translate('Currency')}
                      value={`${selectedCurrencySymbol(currency)} ${selectedCurrency(currency)}`}
                      editable={false}
                      right={<Icon name={'controller-play'} type="entypo" size={12} />}
                    />
                  </CopilotView>
                </CopilotStep>
              </TouchableOpacity>
            </Wrappers.Wrapper>
            <Spacers.Base />

            <Wrappers.Wrapper>
              <CopilotStep text={ToolTiopsText.text2} order={1} name="feature">
                <CopilotView>
                  <MultipleView
                    Title={Translate('featureTitle')}
                    Value1="Enable"
                    Value2="Disable"
                    onPressIcon={() => {
                      setModalFeatureVisible(!isModalFeatureVisible);
                    }}
                    onPress={v => setFeature(v)}
                    textColor={
                      feature == 'Enable' ? colors.white : colors.placeholderColor
                    }
                    viewColor={feature == 'Enable' ? colors.textColor : colors.lightRed}
                    textColor1={
                      feature == 'Disable' ? colors.white : colors.placeholderColor
                    }
                    viewColor1={feature == 'Disable' ? colors.textColor : colors.lightRed}
                  />
                </CopilotView>
              </CopilotStep>
            </Wrappers.Wrapper>
            <Spacers.Base />

            <Wrappers.Wrapper>
              {feature == 'Enable' ? (
                <Wrappers.Wrapper>
                  {currentStep?.order == 4 || currentStep?.order == undefined ?
                    <TextInputs.TextInputLowerBorder
                      title={Translate('minimumAmountTitle')}
                      placeholder="0"
                      value={convert_numbers(accountMinimum)}
                      keyboardType={'numeric'}
                      onChangeText={(am) => setAccountMinimum(remove_commas(am))}
                      Currency={selectedCurrencySymbol(currency)}
                      right={
                        <Icon
                          name={'info'}
                          type="feather"
                          size={24}
                          onPress={() => setModalMinimunVisible(!isModalMinimumVisible)}
                        />
                      }
                    />
                    :
                    <CopilotStep text={ToolTiopsText.text3} order={2} name="minimum">
                      <CopilotView>
                        <TextInputs.TextInputLowerBorder
                          title={Translate('minimumAmountTitle')}
                          placeholder="0"
                          value={convert_numbers(accountMinimum)}
                          keyboardType={'numeric'}
                          onChangeText={(am) => setAccountMinimum(remove_commas(am))}
                          Currency={selectedCurrencySymbol(currency)}
                          right={
                            <Icon
                              name={'info'}
                              type="feather"
                              size={24}
                              onPress={() => setModalMinimunVisible(!isModalMinimumVisible)}
                            />
                          }
                        />
                      </CopilotView>
                    </CopilotStep>
                  }
                  <Spacers.Base />
                </Wrappers.Wrapper>
              ) : null}
            </Wrappers.Wrapper>

            <Wrappers.Wrapper>
              {currentStep?.order == 4 || currentStep?.order == undefined ?
                <TextInputs.TextInputLowerBorder
                  title={Translate('MyBudgetScreen.totalSavings')}
                  placeholder="0"
                  value={convert_numbers(totalSaving)}
                  keyboardType={'numeric'}
                  onChangeText={(ts) => setTotalSaving(remove_commas(ts))}
                  Currency={selectedCurrencySymbol(currency)}
                /> :
                <CopilotStep text={ToolTiopsText.text4} order={3} name="totalAmount">
                  <CopilotView>
                    <TextInputs.TextInputLowerBorder
                      title={Translate('MyBudgetScreen.totalSavings')}
                      placeholder="0"
                      value={convert_numbers(totalSaving)}
                      keyboardType={'numeric'}
                      onChangeText={(ts) => setTotalSaving(remove_commas(ts))}
                      Currency={selectedCurrencySymbol(currency)}
                    />
                  </CopilotView>
                </CopilotStep>
              }
            </Wrappers.Wrapper>
            <Spacers.Base />

            <Wrappers.Wrapper>
              <CopilotStep text={ToolTiopsText.text5} order={4} name="incomeSource">
                <CopilotView>
                  <MultipleView
                    Title={Translate('CreateBudgetScreen.incomeSource')}
                    Value1="Single"
                    Value2="Multiple"
                    onPress={v => setIncomeSource(v)}
                    textColor={
                      incomeSource == 'Single' ? colors.white : colors.placeholderColor
                    }
                    viewColor={
                      incomeSource == 'Single' ? colors.textColor : colors.lightRed
                    }
                    textColor1={
                      incomeSource == 'Multiple' ? colors.white : colors.placeholderColor
                    }
                    viewColor1={
                      incomeSource == 'Multiple' ? colors.textColor : colors.lightRed
                    }
                  />
                </CopilotView>
              </CopilotStep>
            </Wrappers.Wrapper>

            <Spacers.DoubleBase />
            <Wrappers.Component>
              <Buttons.ButtonColored
                text={Translate('Continue')}
                buttonColor={budgetName && totalSaving &&
                  (feature == 'Enable' ? accountMinimum : !accountMinimum)
                  ? colors.textColor : colors.disableText}
                disabled={budgetName && totalSaving &&
                  (feature == 'Enable' ? accountMinimum : !accountMinimum)
                  ? false : true}
                tintColor={colors.white}
                onPress={() => onPressContinue()}
              />
            </Wrappers.Component>
          </Wrappers.Component>
        </ScrollViews.KeyboardAvoiding>

        <Modals.CenterModal
          isVisible={isModalFeatureVisible}
          toggleModal={() => setModalFeatureVisible(!isModalFeatureVisible)}
          Text={Translate('informationModal')}
        />

        <Modals.CenterModal
          isVisible={isModalMinimumVisible}
          toggleModal={() => setModalMinimunVisible(!isModalMinimumVisible)}
          Text={Translate('informationModal1')}
        />

        <Modals.BottomModal
          isVisible={isModalBottomVisible}
          toggleModal={() => setModalBottomVisible(!isModalBottomVisible)}
          OnSelectValue={() => setModalBottomVisible(!isModalBottomVisible)}
          Title={Translate('Currency')}
          Data={Currencies}
          setCurrency={setCurrency}
          currency={currency}
          modalHeight={{ top: height(20) }}
        />
      </Wrappers.Wrapper>
    </Wrappers.Main >
  );
};

export default CreateBudget;
