import React, { useCallback, useState, useEffect } from 'react';
import { ProgressChart } from 'react-native-chart-kit';
import { height, width } from 'react-native-dimension';
import { Headers, Modals, ScrollViews, Spacers, StaticComponents, Texts, Wrappers } from '../../../components';
import { colors, routes, selectedCurrencySymbol } from '../../../services';
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { BudgetDetailBox, ChartDate, DebtsChart, NoDebtsChart } from '../../../screenComponents/insightBox';
import { Icon } from 'react-native-elements';
import { ToolTiopsText, dummyExpenses } from '../../../services/dummyData';
import Translate from '../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { useDispatch, useSelector } from 'react-redux';
import { convert_numbers } from '../../../services/utils/helperFunctions';
import { calculateDebtsTotalAmount, calculateExpenses, calculateGraph, calculateGraphSavings, calculateProjectedSavings, calculateShowingExpenses, calculateTotalPayments } from '../../../services/functions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { saveData } from '../../../services/utils/utility';

const Insights = (props) => {

  const dispatch = useDispatch()

  // tooltip
  const CopilotView = walkthroughable(View);
  const { currentStep } = useCopilot()

  // redux data
  let redux_allBudget = useSelector(state => state?.App?.allBudget)
  let redux_user = useSelector(state => state?.Auth?.user)
  let redux_myBudget = useSelector(state => state?.App?.userBudget)
  // const uniqueDates = [...new Set(data.map(item => moment(item.nextPayDate, 'MM/DD/YYYY').format('MMM YYYY')))].sort();

  // All useStates
  const [user, setUser] = useState(redux_user ?? []);
  const [currentSaving, setCurrentSaving] = useState('');
  const [currentAmount, setCurrentAmount] = useState(450);

  const [editExpenseData, setEditExpenseData] = useState(dummyExpenses ?? []);
  const [allExpenses, setAllExpenses] = useState([]);
  const [unfilteredExpenses, setAllUnfilteredExpenses] = useState(redux_myBudget?.Expenses)

  const [debtsPayoff, setDebtsPayoff] = useState('Student Loan');
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);

  const focused = useIsFocused()


  //NEW STATES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})
  const [allBudgetDates, setAllBudgetDates] = useState(redux_myBudget?.budgetDates ?? [])
  const [selectedBudget, setSelectedBudget] = useState(redux_myBudget ?? {})
  const [selectedDebt, setSelectedDebt] = useState(redux_myBudget?.Debts?.length ? redux_myBudget?.Debts[0] : {})
  // const [income, setIncome] = useState(redux_myBudget?.Income[0]?.netIncome ?? 0)
  const [primaryIncome, setPrimaryIncome] = useState(redux_myBudget?.Income[0] ?? {});
  const [allDebts, setAllDebts] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [toSave, setToSave] = useState(0)
  const [toPay, setToPay] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [autoFill, setAutoFill] = useState(redux_myBudget?.feature == 'Enable' ? true : false)
  const [debtPayments, setDebtPayments] = useState([])
  const [savingPayments, setSavingPayments] = useState([])
  const [setSubPayments, setSavingSubPayments] = useState([])
  const [datesArray, setDatesArray] = useState([...new Set(redux_myBudget?.budgetDates?.map(item => moment(item?.nextPayDate, 'MM/DD/YYYY').format('MMMM YYYY')))].sort((a, b) => moment(a, 'MMMM YYYY') - moment(b, 'MMMM YYYY')))
  const [overviewDate, setOverviewDate] = useState(datesArray[0]);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [noDebts, setNoDebts] = useState(redux_myBudget?.Debts?.length > 0 ? false : true);
  const [savingsGoal, setSavingsGoal] = useState(redux_myBudget?.savingsGoal ?? "0");
  const [simulatedModal, setSimulatedModal] = useState(false)
  const [showing, setShowing] = useState(null)
  const [selectedExpense, setSelectedExpense] = useState({})
  const [expenseDetails, setTotalExpenseDetails] = useState([])


  //Modal
  const [headerModal, setHeaderModal] = useState(false);
  const [currentSavingEditModal, setCurrentSavingEditModal] = useState(false);
  const [savingGoalEditModal, setSavingGoalEditModal] = useState(false);
  const [isModalDateVisible, setModalDateVisible] = useState(false);
  const [debtPayoffModal, setDebtPayoffModal] = useState(false);
  const [showTotalDebtsModal, setShowTotalDebtsModal] = useState(false);
  const [showTotalExpensesModal, setShowTotalExpensesModal] = useState(false);
  const [selectDateModal, setSelectDateModal] = useState(false);
  const [expenseAmountModal, setExpenseAmountModal] = useState(false)

  const [errorMessage, setErrorMessage] = useState('');

  // All useEffects
  // fot tooltip
  useEffect(() => {
    if (redux_user?.firstTimeLogin == true) {
      if (currentStep?.order == 28) {
        setTimeout(() => {
          setNoDebts(false)
        }, 500);
      }
    }
  }, [currentStep])


  useEffect(() => {
    if (focused && props?.route?.name == 'insights') {
      setSelectedDebt(redux_myBudget?.Debts?.length ? redux_myBudget?.Debts[0] : {})
      setSavingSubPayments([])
      setShowing(null)
    }
  }, [focused])

  // useFocusEffect(()=>{
  //   setSelectedDebt(redux_myBudget?.Debts[0])
  // },[])

  useEffect(() => {
    setSelectedBudgetDate(selectedBudget?.budgetDates?.length > 0 ? selectedBudget?.budgetDates[0] : {})
  }, [selectedBudget])

  useEffect(() => {
    setSelectedBudget(redux_myBudget)
    setNoDebts(redux_myBudget?.Debts?.length > 0 ? false : true)
  }, [redux_myBudget])

  // set user data
  useEffect(() => {
    setUser(redux_user ?? [])
  }, [redux_user])

  useEffect(() => {
    if (selectedBudgetDate) {
      setTotalSavings(selectedBudgetDate?.totalCurrentSaving)
      // setIncome(selectedBudgetDate?.netIncome)
      setAllDebts(selectedBudgetDate?.debts_dates)
      const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, selectedBudgetDate)
      setAllExpenses(expenses)
      const payments = calculateTotalPayments(selectedBudgetDate?.debts_dates ?? [], expenses ?? [], selectedBudgetDate?.oneTimeExpenses ?? []) ?? 0;
      setTotalPayments(payments);
      setSelectedDebt(selectedBudget?.Debts?.length ? selectedBudget?.Debts[0] : {})
      const savings = selectedBudgetDate?.netIncome - payments - selectedBudget?.accountMinimum
    }
  }, [selectedBudgetDate])

  useEffect(() => {
    findInsightsForDate(overviewDate)
  }, [overviewDate])

  useEffect(() => {
    calculateDebtsGraphData(selectedDebt)
  }, [selectedDebt])

  useEffect(() => {
    if (savingsGoal || focused && props?.route?.name == 'insights')
      calculateSavingsGraphData(savingsGoal)
  }, [savingsGoal, focused])

  //All Functions
  // When user click on three dots header data
  const onPressHeaderModalData = (item) => {
    if (item == Translate('InsightsScreen.updateCurrentSavings')) {
      setHeaderModal(!headerModal)
      setTimeout(() => {
        setCurrentSavingEditModal(!currentSavingEditModal)
      }, 500);

    } else if (item == Translate('InsightsScreen.updateSavingsGoal')) {
      setHeaderModal(!headerModal)
      setTimeout(() => {
        setSavingGoalEditModal(!savingGoalEditModal)
      }, 500);

    } else if (item == Translate('InsightsScreen.simulatedBudget')) {
      setHeaderModal(!headerModal)
      setTimeout(() => {
        // setSimulatedModal(!simulatedModal)
        props?.navigation?.navigate(routes?.simulatedExpense)
      }, 500);
    } else {
      setHeaderModal(!headerModal)
      setTimeout(() => {
        setModalDateVisible(!isModalDateVisible)
      }, 500);

    }
  }

  // when user edit savings goal amount
  const onPressSavingsGoalDone = (data) => {
    setSavingsGoal(parseInt(data))
    let amount = data == '' ? 0 : data
    const local_budget = { ...selectedBudget };
    local_budget.savingsGoal = amount
    dispatch(Budget(local_budget));
    saveData('Budgets', redux_myBudget?._id, { savingsGoal: amount })
    setTimeout(() => {
      setSavingGoalEditModal(false)
    }, 500);
  }

  const onPressSimulatedOptions = (item) => {
    if (item == Translate('InsightsScreen.simulatedBudgetOption1')) {
      setSimulatedModal(!simulatedModal)
      setTimeout(() => {
        setShowTotalExpensesModal(!showTotalExpensesModal)
      }, 600);
    }
    else if (item == Translate('InsightsScreen.simulatedBudgetOption2')) {
      setSimulatedModal(!simulatedModal)
      props?.navigation?.navigate(routes?.simulatedExpense)
    }
  }


  // select date for monthly overview
  // const onValueChange = useCallback(
  //   (event, newDate) => {
  //     const selectedDate = newDate || overviewDate;
  //     showPicker(false);
  //     setOverviewDate(selectedDate);
  //   },
  //   [overviewDate, showPicker],
  // );

  // select date function

  const onSetFirstDate = _date => {
    const projectedDate = []
    calculateProjectedSavings({ ...selectedBudget }, { ...selectedBudgetDate }, moment(_date?.dateString).format('MM/DD/YYYY'), projectedDate, parseFloat(selectedBudget?.totalSaving))

    setTimeout(() => {
      const data = projectedDate[projectedDate?.length - 1]
      alert(`Your savings on ${data?.payDate} will be $${convert_numbers(data?.savingAmount)}`)
    }, 500);

    // setShowing(projectedDate.length - 1)

    // // setSavingPayments(projectedDate)
    // setSavingSubPayments(projectedDate)

  };

  const onPressDebtPayoffModal = (item) => {
    setSelectedDebt(selectedBudget?.Debts?.find((i) => i?.debtName === item))
    setDebtPayoffModal(!debtPayoffModal)
  }


  const findInsightsForDate = (monthYear) => {
    const targetDate = moment(monthYear, 'MMMM YYYY');
    const data = selectedBudget?.budgetDates
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalExpenseDetails = []

    for (const item of data) {
      const payDate = moment(item?.nextPayDate, 'MM/DD/YYYY');
      if (payDate.isSame(targetDate, 'month') && payDate.isSame(targetDate, 'year')) {
        totalIncome += item?.netIncome;
      }
    }
    for (const item of data) {
      const payDate = moment(item?.nextPayDate, 'MM/DD/YYYY');
      if (payDate.isSame(targetDate, 'month') && payDate.isSame(targetDate, 'year')) {
        const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, item);
        const expensesPayment = calculateExpenses(expenses ?? [], item?.oneTimeExpenses ?? [])
        totalExpenses += expensesPayment
        totalExpenseDetails.push(expenses)
      }
    }
    setTotalExpenses(totalExpenses)
    setTotalIncome(totalIncome)
    setTotalExpenseDetails(totalExpenseDetails)
  }

  const calculateDebtsGraphData = (selectedDebt) => {
    const myGraph = []
    calculateGraph({ ...selectedBudget }, { ...selectedBudgetDate }, { ...selectedDebt }, myGraph)
    setDebtPayments(myGraph)
  }
  const calculateSavingsGraphData = (savingsGoal) => {
    const myGraph = []
    calculateGraphSavings({ ...selectedBudget }, { ...selectedBudgetDate }, savingsGoal, myGraph, parseFloat(selectedBudget?.totalSaving))
    setSavingPayments(myGraph)
  }



  const renderSavingsGraph = () => {
    return (
      <Wrappers.Wrapper>
        {/* <Wrappers.RowBasic>
          <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.currentSavings')}</Texts.SmallText>
          <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.savingsGoal')}</Texts.SmallText>
        </Wrappers.RowBasic>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          disabled={true}
          minimumTrackTintColor={colors.yellow}
          maximumTrackTintColor={`rgba(251, 174, 0, 1)`}
          thumbTintColor={colors.yellow}
          value={currentAmount}
        />

        <Wrappers.RowBasic style={styles.progressBarAmountView}>
          <Texts.SmallText style={styles.progressBarAmount}>$0</Texts.SmallText>
          <Texts.SmallText style={styles.progressBarAmount}>{`$${currentAmount}`}</Texts.SmallText>
          <Texts.SmallText style={styles.progressBarAmount}>$1000</Texts.SmallText>
        </Wrappers.RowBasic> */}

        <Spacers.Base />
        <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.projectedSavings')}</Texts.SmallText>
        <Spacers.Base />

        {savingPayments?.length > 0 && <NoDebtsChart showing={showing} setShowing={setShowing} data={savingPayments} subData={setSubPayments} />}
        {savingPayments?.length > 0 && <ChartDate startAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(savingPayments[0]?.savingAmount)}`} endAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(savingPayments[savingPayments?.length - 1]?.savingAmount)}`} startDate={savingPayments[0]?.payDate} lastDate={savingPayments[savingPayments?.length - 1]?.payDate} />}

      </Wrappers.Wrapper>
    )
  }

  const renderDebtsGraph = () => {
    return (
      <Wrappers.Wrapper>
        <CopilotStep text={ToolTiopsText.text30} order={29} name="insightTotalDebts">
          <CopilotView>
            <TouchableOpacity onPress={() => setShowTotalDebtsModal(!showTotalDebtsModal)} activeOpacity={0.5} >
              <Wrappers.RowBasic style={styles.debtsView}>
                <Texts.SmallText style={styles.titleText}>{`${Translate('InsightsScreen.totalDebt')}: ${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(calculateDebtsTotalAmount(selectedBudget?.Debts))}`}</Texts.SmallText>
                <Icon name='caretdown' type='antdesign' size={10} />
              </Wrappers.RowBasic>
            </TouchableOpacity>
          </CopilotView>
        </CopilotStep>
        <Spacers.Base />

        <CopilotStep text={ToolTiopsText.text31} order={30} name="insightPayoff">
          <CopilotView>
            <Wrappers.RowBasic>
              <Texts.SmallText style={styles.projectedText}>{Translate('InsightsScreen.projectedDebtPayoff')}</Texts.SmallText>
              <TouchableOpacity onPress={() => setDebtPayoffModal(!debtPayoffModal)} activeOpacity={0.5}>
                <Texts.SmallText style={styles.projectedTextType}>{`${selectedDebt?.debtName} \n${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(selectedDebt?.debtAmount)}`}</Texts.SmallText>
              </TouchableOpacity>
            </Wrappers.RowBasic>
          </CopilotView>
        </CopilotStep>
        <Spacers.Small />

        {/* <Texts.SmallText style={styles.absoluteProjectedAmountDebt}>$10,000</Texts.SmallText> */}
        {debtPayments?.length > 0 && <DebtsChart data={debtPayments} />}

        {debtPayments?.length > 0 && <ChartDate startAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(debtPayments[0]?.debtAmount)}`} endAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(debtPayments[debtPayments?.length - 1]?.debtAmount)}`} startDate={debtPayments[0]?.payDate} lastDate={debtPayments[debtPayments?.length - 1]?.payDate} />}

      </Wrappers.Wrapper>
    )
  }

  const onSelectExpense = (item, index) => {
    setSelectedExpense({ ...item, index: index })
    setShowTotalExpensesModal(!showTotalExpensesModal)
    setTimeout(() => {
      setExpenseAmountModal(!expenseAmountModal)
    }, 500);
  }

  const onEditExpenseDone = (item) => {
    setExpenseAmountModal(!expenseAmountModal)
    const { index } = selectedExpense
    const local_expenses = [...unfilteredExpenses]
    local_expenses[index].expenseAmount = item?.expenseAmount
    props?.navigation?.navigate(routes?.simulatedBudget, { newBudget: { ...selectedBudget, Expenses: local_expenses } })
  }

  return (

    <Wrappers.Wrapper style={styles.main}>
      <GestureHandlerRootView>
        {noDebts ?
          <Headers.Main
            // user={user}
            title={Translate('Insights')}
            // rightTitle={'       '}
            showLeftOptions={true}
            // onPressTitle={() => setNoDebts(!noDebts)}
            onPressLeftIcon={() => setHeaderModal(!headerModal)}
            // onPressProfileIcon={() => props.navigation.navigate(routes.setting)}
            toolTipStatus={props?.route?.name == 'insights' ? true : false}
          />
          :
          <Headers.EmptyViewHeader
            title={Translate('Insights')}
          // onPressProfileIcon={() => props.navigation.navigate(routes.setting)}
          />
        }
        {redux_allBudget?.length == 0 ?
          <StaticComponents.EmptyView
            expenseSource
            onPressButton={() => {
              if (user?.firstTimeLogin == true) {
                setTimeout(() => {
                  setToolTipModal(!toolTipModal)
                }, 500);
              } else {
                props?.navigation?.navigate(routes.createBudget)
              }
            }}
            Text={Translate('InsightsScreen.emptyViewText')}
          />
          :
          <ScrollViews.KeyboardAvoiding>
            <Wrappers.Component>
              <Spacers.Base />

              <CopilotStep text={ToolTiopsText.text28} order={27} name="insightDate">
                <CopilotView>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectDateModal(!selectDateModal)}>
                    <Texts.SmallText style={styles.overviewDate}>{overviewDate}</Texts.SmallText>
                  </TouchableOpacity>
                </CopilotView>
              </CopilotStep>

              <ProgressChart
                data={{ data: [totalExpenses / totalIncome], colors: [colors.redColor] }}
                width={width(100)}
                height={height(26)}
                strokeWidth={10}
                hideLegend={true}
                withCustomBarColorFromData={true}
                radius={90}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  fillShadowGradientFromOpacity: 0,
                  decimalPlaces: 2,
                  color: () => colors.textColor
                }}
                style={{ alignSelf: 'center' }}
              />


              <Spacers.Small />
              <Wrappers.RowWrapperCenter>
                <BudgetDetailBox
                  budgetAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(totalIncome)}`}
                  budgetDetail={Translate('OnBoardingScreen.onBoardingTitle2')}
                  backgroundColor={colors.textColor}
                />
                <BudgetDetailBox
                  budgetAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(totalExpenses)}`}
                  budgetDetail={Translate('Expenses')}
                  backgroundColor={colors.red}
                />
              </Wrappers.RowWrapperCenter>

              <Spacers.Base />
              <TouchableOpacity activeOpacity={0.5} onPress={() => props?.navigation?.navigate(routes?.expenseBreakdown, { data: expenseDetails })} >
                <CopilotStep text={ToolTiopsText.text29} order={28} name="insightShowDetail">
                  <CopilotView>
                    <Wrappers.RowWrapperCenter>
                      <Texts.SmallText style={styles.overviewDate}>{Translate('InsightsScreen.showDetail')}</Texts.SmallText>
                      <Icon name='arrow-right' type='feather' color={colors.dodgerBlue} size={20} style={styles.forwardArrow} />
                    </Wrappers.RowWrapperCenter>
                  </CopilotView>
                </CopilotStep>
              </TouchableOpacity>

              <Spacers.Base />

              {noDebts ?
                renderSavingsGraph()
                :
                renderDebtsGraph()
              }
            </Wrappers.Component>

            <Wrappers.Wrapper style={styles.progressChartView}>
              <Texts.SmallText style={styles.progressChartText}>{Translate('Monthly')}</Texts.SmallText>
              <Texts.SmallText style={styles.progressChartText}>{Translate('Overview')}</Texts.SmallText>
            </Wrappers.Wrapper>
          </ScrollViews.KeyboardAvoiding>
        }

        {/* {show &&
        <MonthPicker
          onChange={onValueChange}
          // value={date}
          value={new Date()}
        // minimumDate={new Date()}
        // maximumDate={new Date(2025, 5)}
        />
      } */}

        <Modals.SimpleModal
          isVisible={headerModal}
          toggleModal={() => setHeaderModal(!headerModal)}
          onChangeVisibility={() => setHeaderModal(!headerModal)}
          // data={[Translate('InsightsScreen.updateCurrentSavings'), Translate('InsightsScreen.updateSavingsGoal'), Translate('InsightsScreen.viewProjectedSavings')]}
          data={[Translate('InsightsScreen.updateSavingsGoal'), Translate('InsightsScreen.viewProjectedSavings'), Translate('InsightsScreen.simulatedBudget')]}
          onPressItem={(item) => onPressHeaderModalData(item)}
        />

        <Modals.SimpleModal
          isVisible={simulatedModal}
          toggleModal={() => setSimulatedModal(!simulatedModal)}
          onChangeVisibility={() => setSimulatedModal(!simulatedModal)}
          data={[Translate('InsightsScreen.simulatedBudgetOption1'), Translate('InsightsScreen.simulatedBudgetOption2')]}
          onPressItem={(item) => onPressSimulatedOptions(item)}
        />

        <Modals.CalendarModal
          isVisible={isModalDateVisible}
          toggleModal={() => setModalDateVisible(!isModalDateVisible)}
          onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
          Title={Translate('InsightsScreen.viewProjectedSavings')}
          selectValue={_date => onSetFirstDate(_date)}
        />

        <Modals.EditModal
          isVisible={currentSavingEditModal}
          toggleModal={() => setCurrentSavingEditModal(!currentSavingEditModal)}
          onChangeVisibility={() => setCurrentSavingEditModal(!currentSavingEditModal)}
          Title={Translate('InsightsScreen.editTotalSavings')}
          value={currentSaving}
          onPressExpenseData={editExpenseData}
          onChangeText={(cs) => setCurrentSaving(cs)}
          onBlur={(id) => {
            // editExpense(id)
            setCurrentSavingEditModal(!currentSavingEditModal)
          }}
        />

        {/* <Modals.EditModal
          isVisible={savingGoalEditModal}
          toggleModal={() => setSavingGoalEditModal(!savingGoalEditModal)}
          onChangeVisibility={() => setSavingGoalEditModal(!savingGoalEditModal)}
          Title={Translate('InsightsScreen.editSavingsGoal')}
          Currency={selectedBudget?.currency}
          value={savingsGoal}
          editExpenseAmount={savingsGoal}
          setEditExpenseAmount={setSavingsGoal}
          setErrorMessage={() => { }}
          onPressExpenseData={editExpenseData}
          onChangeText={(sg) => setSavingsGoal({ amount: sg })}
          onPressDone={() => { }}
          onBlur={(id) => {
            // editExpense(id)
            setSavingGoalEditModal(!savingGoalEditModal)
          }}
        /> */}

        {/* Edit Modal for savings goal */}
        {savingGoalEditModal &&
          <Modals.EditSavingsGoalModal
            isVisible={savingGoalEditModal}
            toggleModal={() => { setSavingGoalEditModal(!savingGoalEditModal), setErrorMessage('') }}
            onChangeVisibility={() => { setSavingGoalEditModal(!savingGoalEditModal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.savingsGoal')}`}
            onPressExpenseData={selectedBudget}
            editExpenseAmount={savingsGoal}
            placeholder={savingsGoal}
            setEditExpenseAmount={setSavingsGoal}
            Currency={selectedBudget?.currency}
            onPressDone={(data) => onPressSavingsGoalDone(data)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            amountLimit={totalSavings ?? 0}
          />
        }

        <Modals.SimpleModal
          isVisible={debtPayoffModal}
          toggleModal={() => setDebtPayoffModal(!debtPayoffModal)}
          onChangeVisibility={() => setDebtPayoffModal(!debtPayoffModal)}
          data={selectedBudget?.Debts?.map((i) => i?.debtName)}
          onPressItem={(item) => onPressDebtPayoffModal(item)}
        // textColor={debtsPayoff}
        />

        <Modals.ShowTotalDebtsModal
          isVisible={showTotalDebtsModal}
          toggleModal={() => setShowTotalDebtsModal(!showTotalDebtsModal)}
          onChangeVisibility={() => setShowTotalDebtsModal(!showTotalDebtsModal)}
          data={selectedBudget?.Debts}
          currency={`${selectedCurrencySymbol(selectedBudget?.currency)}`}
        />

        <Modals.ShowTotalExpensesModal
          isVisible={showTotalExpensesModal}
          toggleModal={() => setShowTotalExpensesModal(!showTotalExpensesModal)}
          onChangeVisibility={() => setShowTotalExpensesModal(!showTotalExpensesModal)}
          data={unfilteredExpenses}
          onSelectItem={onSelectExpense}
          currency={`${selectedCurrencySymbol(selectedBudget?.currency)}`}

        />

        <Modals.MonthYearPicker
          isVisible={selectDateModal}
          toggleModal={() => setSelectDateModal(!selectDateModal)}
          data={datesArray}
          onChangeVisibility={() => setSelectDateModal(!selectDateModal)}
          selected={overviewDate}
          setSelected={setOverviewDate}
        />

        {/* Add additional income */}
        <Modals.EditHomeModal
          isVisible={expenseAmountModal}
          toggleModal={() => setExpenseAmountModal(!expenseAmountModal)}
          onChangeVisibility={() => setExpenseAmountModal(!expenseAmountModal)}
          Title={Translate('InsightsScreen.selectEditExpense')}
          additionalIncomeName={selectedExpense?.userExpenseName}
          // setAdditionalIncomeName={(ain) => setAdditionalIncomeName(ain)}
          onPressSource={() => {
            setExpenseAmountModal(!expenseAmountModal)
            setTimeout(() => {
              setShowTotalExpensesModal(!showTotalExpensesModal)
            }, 500);
          }}
          additionalIncome={selectedExpense?.expenseAmount}
          // setAdditionalIncome={setAdditionalIncome}
          onPressDone={onEditExpenseDone}
        />


      </GestureHandlerRootView>
    </Wrappers.Wrapper>

  );
};

export default Insights;
