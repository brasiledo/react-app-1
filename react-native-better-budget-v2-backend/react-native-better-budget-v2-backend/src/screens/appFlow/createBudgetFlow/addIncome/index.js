import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons, Headers, Modals, Spacers, TextInputs, Texts, Wrappers } from '../../../../components';
import { MultipleView } from '../../../../screenComponents/createBudget';
import { colors, routes, selectedCurrencySymbol } from '../../../../services';
import { convert_numbers, getDisabledDates, remove_commas } from '../../../../services/utils/helperFunctions';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../../../services/dummyData';
import { Keyboard } from 'react-native';
import { Budget } from '../../../../Redux/actions/App';
import { saveData } from '../../../../services/utils/utility';

const AddNetIncome = ({ navigation, route }) => {
  const CopilotView = walkthroughable(View);
  const { start, currentStep, goToNth } = useCopilot()

  // redux data
  let redux_user = useSelector(state => state?.Auth?.user)

  // Previous Screen data
  let item = route?.params || {};

  const { fromEdit, setBudget, setBudgetIncome, budget, budgetIncome } = route.params

  const dispatch = useDispatch()

  // useStates
  const [user, setUser] = useState(redux_user ?? []);
  const [incomeType, setIncomeType] = useState('Fixed Income');
  const [incomeCategory, setIncomeCategory] = useState(fromEdit ? 'Additional Income' : 'Primary Income');
  const [incomeSource, setIncomeSource] = useState('');
  const [netIncome, setNetIncome] = useState('');
  const [frequency, setFrequency] = useState('');
  const [nextPayDate, setNextPayDate] = useState('');
  const [isModalBottomVisible, setModalBottomVisible] = useState(false);
  const [isModalDateVisible, setModalDateVisible] = useState(false);
  const [isModalDebtsVisible, setModalDebtsVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({})
  const [debtIncome, setDebtIncome] = useState([])
  const [tooltipVisible, setTooltipVisible] = useState(0)
  const [tooltipValue, setTooltipValue] = useState(0)
  const [modalTooltip, setModalTooltip] = useState(false)

  // timeout for tooltip visible
  setTimeout(() => {
    setTooltipVisible(1)
  }, 1000);

  // All useEffects
  // for semi-monthly dates
  useEffect(() => {
    if (frequency == 'Semi-Monthly') {
      const month = moment(new Date()).get('month')
      const year = moment(new Date()).get('year')
      var lastDayOfMonth = new Date(year, month + 1, 0);
      const disabledDates = getDisabledDates(year, month, lastDayOfMonth.getDate())
      var disabledMarkedDates = disabledDates.reduce((c, v) =>
        Object.assign(c, { [v]: { disabled: true, disableTouchEvent: true } }), {});
      setMarkedDates(disabledMarkedDates)
    } else {
      setMarkedDates([])
    }
  }, [frequency])

  // for start tooltip
  useEffect(() => {
    if (incomeCategory == 'Primary Income' && redux_user?.firstTimeLogin == true) {
      void start()
      void goToNth(6)
      setTimeout(() => {
        setTooltipValue(1)
      }, 1000);
    }
  }, [tooltipVisible])

  // for tooltip first index
  useEffect(() => {
    if (currentStep?.order == 7) {
      void goToNth(6)
    }
  }, [tooltipValue])


  // set user data
  useEffect(() => {
    setUser(redux_user ?? [])
  }, [redux_user])

  // All Functions
  // if user want to add more additional income
  const onPressAddIncome = () => {
    setIncomeCategory('Additional Income')
    setModalDebtsVisible(!isModalDebtsVisible)
  }

  // onPress countinue Button
  const onPressCountinue = () => {
    setModalDebtsVisible(!isModalDebtsVisible)
    navigation.navigate(routes.addRecurringExpenses, { item, debtIncome })
  }

  // debts add function
  const onPressAdd = () => {

    let data = {
      incomeSource: incomeSource,
      incomeType: incomeType,
      netIncome: netIncome,
      frequency: frequency,
      incomeCategory: incomeCategory,
      nextPayDate: nextPayDate ? nextPayDate : '',
      currency: item?.currency
    }
    setDebtIncome([...debtIncome, data])

    if (item?.incomeSource == 'Single') {
      navigation.navigate(routes.addRecurringExpenses, { item, data })
    } else {
      setModalDebtsVisible(!isModalDebtsVisible)
      if (incomeCategory == 'Additional Income') {
        setModalTooltip(true)
      }
    }
  }

  //From edit budget page
  const onPressAddFromEdit = () => {
    let data = {
      incomeSource: incomeSource,
      incomeType: incomeType,
      netIncome: netIncome,
      frequency: frequency,
      incomeCategory: incomeCategory,
      nextPayDate: nextPayDate ? nextPayDate : '',
      currency: budgetIncome[0]?.currency
    }

    const new_budget_income = [...budgetIncome]
    new_budget_income.push(data)
    setBudgetIncome(new_budget_income)
    setBudget({ ...budget, Income: new_budget_income })
    saveData('Budgets', budget?._id, { Income: new_budget_income }).then((res) => {
      navigation.goBack()
    })
  }

  // debt remove function
  const onPressRemoveIcon = (index) => {
    let debts = [...debtIncome];
    let target = debts[index];
    debts.splice(index, 1);
    setDebtIncome(debts)
  }

  // select date function
  const onSetDate = _date => {
    setNextPayDate(moment(_date?.dateString).format('MM/DD/YYYY'));
    setModalDateVisible(!isModalDateVisible);
  };

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <Headers.Main
        title={Translate('OnBoardingScreen.onBoardingTitle1')}
        onBackPress={() => navigation.goBack()}
        tooltipStatus={false}
      />

      <Wrappers.Component>
        <Spacers.Base />

        <Texts.MediumTitle style={styles.headingTitle}>
          {incomeCategory == 'Primary Income' ? 'Primary Income' : 'Additional Income'}
        </Texts.MediumTitle>
        <Spacers.Base />

        <TextInputs.TextInputLowerBordered
          placeholder={Translate('incomeSource')}
          value={incomeSource}
          onChangeText={bn => setIncomeSource(bn)}
        />
        <Spacers.Base />

        {/* <Wrappers.Wrapper> */}
        <CopilotStep text={ToolTiopsText.text6} order={5} name="incomeType">
          <CopilotView>
            <MultipleView
              Title={Translate('incomeType')}
              Value1="Fixed Income"
              Value2="Variable Income"
              onPress={v => setIncomeType(v)}
              textColor={
                incomeType == 'Fixed Income'
                  ? colors.white
                  : colors.placeholderColor
              }
              viewColor={
                incomeType == 'Fixed Income' ? colors.textColor : colors.lightRed
              }
              textColor1={
                incomeType == 'Variable Income'
                  ? colors.white
                  : colors.placeholderColor
              }
              viewColor1={
                incomeType == 'Variable Income' ? colors.textColor : colors.lightRed
              }
            />
          </CopilotView>
        </CopilotStep>
        {/* </Wrappers.Wrapper> */}

        <Spacers.Base />
        {incomeType == 'Fixed Income' ? (
          <Wrappers.Wrapper>
            <TextInputs.TextInputLowerBorder
              title={Translate('CreateBudgetScreen.netIncomeAmount')}
              placeholder="0"
              value={convert_numbers(netIncome)}
              keyboardType={'numeric'}
              onChangeText={ni => setNetIncome(remove_commas(ni))}
              Currency={selectedCurrencySymbol(item?.currency)}
            />
            <Spacers.Base />
          </Wrappers.Wrapper>
        ) : null}

        <Wrappers.Wrapper>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalBottomVisible(!isModalBottomVisible)
              Keyboard.dismiss()
            }}>
            <CopilotStep text={ToolTiopsText.text7} order={6} name="frequency">
              <CopilotView>
                <TextInputs.TextInputLowerBorder
                  title={Translate('Frequency')}
                  placeholder={Translate('Select')}
                  placeholderColor={colors.lightSilver}
                  value={frequency}
                  editable={false}
                  right={
                    <Icon
                      name={frequency ? 'triangle-down' : 'controller-play'}
                      type="entypo"
                      size={12}
                    />
                  }
                />
              </CopilotView>
            </CopilotStep>
            <Spacers.Base />
          </TouchableOpacity>
        </Wrappers.Wrapper>

        <Wrappers.Wrapper>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalDateVisible(!isModalDateVisible)
              Keyboard.dismiss()
            }}>
            <CopilotStep text={ToolTiopsText.text8} order={7} name="nextPayDate">
              <CopilotView>
                <TextInputs.TextInputLowerBorder
                  title={Translate('nextPayDate')}
                  placeholder={Translate('Select')}
                  placeholderColor={colors.lightSilver}
                  value={nextPayDate}
                  editable={false}
                  right={
                    <Icon
                      name={nextPayDate ? 'triangle-down' : 'controller-play'}
                      type="entypo"
                      size={12}
                    />
                  }
                />
              </CopilotView>
            </CopilotStep>
          </TouchableOpacity>
        </Wrappers.Wrapper>

        <Spacers.DoubleBase />
        <Wrappers.Component>
          <Buttons.ButtonColored
            text={Translate('Add')}
            buttonColor={frequency && nextPayDate && incomeSource &&
              (incomeType == 'Fixed Income' ? netIncome : !netIncome)
              ? colors.textColor : colors.disableText}
            disabled={frequency && nextPayDate && incomeSource &&
              (incomeType == 'Fixed Income' ? netIncome : !netIncome)
              ? false : true}
            tintColor={colors.white}
            onPress={() => fromEdit ? onPressAddFromEdit() : onPressAdd()}
          />
        </Wrappers.Component>
      </Wrappers.Component>

      <Modals.BottomModal1
        isVisible={isModalBottomVisible}
        toggleModal={() => setModalBottomVisible(!isModalBottomVisible)}
        OnSelectValue={() => setModalBottomVisible(!isModalBottomVisible)}
        Title={Translate('selectFrequency')}
        Data={['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly']}
        setFrequency={setFrequency}
        frequency={frequency}
      />

      <Modals.DebtsModal
        isVisible={isModalDebtsVisible}
        toggleModal={() => setModalDebtsVisible(!isModalDebtsVisible)}
        debtIncome={debtIncome}
        onPressAddIncome={() => { onPressAddIncome() }}
        onPressCountinue={() => { onPressCountinue() }}
        onPressRemoveIcon={(index) => { onPressRemoveIcon(index) }}
        tooltipVisible={modalTooltip}
        setModalTooltip={setModalTooltip}
        incomeCategory={incomeCategory}
        tooltipVisibleModal={true}
        user={user}
      />

      <Modals.CalendarModal
        isVisible={isModalDateVisible}
        toggleModal={() => setModalDateVisible(!isModalDateVisible)}
        onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
        Title={Translate('nextPayDate')}
        budgetType={frequency}
        selectValue={_date => onSetDate(_date)}
        markedDates={markedDates}
        calculateDisabledDates={date => {
          const year = date.year;
          const month = date.month;
          if (frequency == 'Semi-Monthly') {
            var lastDayOfMonth = new Date(year, month + 1, 0);
            const disabledDates = getDisabledDates(
              year,
              month,
              lastDayOfMonth.getDate(),
            );
            var disabledMarkedDates = disabledDates.reduce(
              (c, v) =>
                Object.assign(c, {
                  [v]: { disabled: true, disableTouchEvent: true },
                }),
              {},
            );
          }
        }}
      />
    </Wrappers.Wrapper>
  );
};

export default AddNetIncome;
