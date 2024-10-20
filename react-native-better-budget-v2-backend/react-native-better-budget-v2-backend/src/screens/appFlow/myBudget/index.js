import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { Headers, Modals, ScrollViews, Spacers, StaticComponents, Texts, Wrappers } from '../../../components';
import { colors, expenseImage, routes, selectedCurrencySymbol } from '../../../services';
import { styles } from './styles';
import PayDateArrows from '../../../screenComponents/payDateArrows';
import moment from 'moment';
import { CarryOverView, IncomeView, NotificationView, SaveAmountView, TotalAmountView } from '../../../screenComponents/homeScreenComponents';
import { SwipableListHomeExpense } from '../../../screenComponents/homeScreenExpenses';
import { DebtsHeaderHome, ExpenseHeaderHome } from '../../../components/staticComponents';
import { ToolTiopsText } from '../../../services/dummyData';
import { ShowHomeDebts } from '../../../screenComponents/homeScreenDebts';
import Translate from '../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { useDispatch, useSelector } from 'react-redux';
import { addToArray, deleteDoc, getData, saveData, updateArrayObjectKey } from '../../../services/utils/utility';
import { Users } from '../../../Redux/actions/Auth';
import { useIsFocused } from '@react-navigation/native';
import { addRemainingSavingsToDebt, calculateDateIfBetween, calculateDebts, calculateDebtsRemaining, calculateDebtsTotalAmount, calculateExpenseForFrequency, calculateExpenses, calculateNearestDateIndex, calculateShowingExpenses, calculateTotalPayments, calculateTotalSavings, onPressNextArrow, switchIndexes, updateExpensesMonths } from '../../../services/functions';
import { AllBudget, Budget, BudgetIndex } from '../../../Redux/actions/App';
import { convert_numbers } from '../../../services/utils/helperFunctions';
import Toast from 'react-native-root-toast';
import DraggableFlatList, { NestableDraggableFlatList, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Error } from '../../../components/toasts';
import useFirebaseSnapshot from '../../../hooks/useFirebaseSnapshot';
import Swiper from 'react-native-deck-swiper';
import { width, height, totalSize } from "react-native-dimension";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyBudget = (props) => {

  const dispatch = useDispatch()
  const focused = useIsFocused()
  const CopilotView = walkthroughable(View)

  // redux Data
  let redux_allBudget = useSelector(state => state?.App?.allBudget)
  let redux_myBudget = useSelector(state => state?.App?.userBudget)
  let redux_user = useSelector(state => state?.Auth?.user)
  const budgetIndex = useSelector(state => state.App.budgetIndex);

  // useStates
  const [user, setUser] = useState(redux_user ?? []);
  const [allBudget, setAllBudget] = useState(redux_allBudget ?? []);
  const [budget, setBudget] = useState(redux_myBudget ?? []);
  const [myBudget, setMyBudget] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);

  const [budgetName, setBudgetName] = useState(redux_myBudget?.budgetName ?? '');
  const [expenseName, setExpenseName] = useState('');
  const [oneTimeExpenseAmount, setOneTimeExpenseAmount] = useState('');

  const [additionalIncomeName, setAdditionalIncomeName] = useState('');
  const [editExpenseAmount, setEditExpenseAmount] = useState('');
  const [editExpenseData, setEditExpenseData] = useState({});
  const [editDebtsData, setEditDebtsData] = useState({});
  const [editDebtAmount, setEditDebtAmount] = useState('');
  const [editDebtDataIndex, setEditDebtDataIndex] = useState('');
  const [editExpenseDataIndex, setEditExpenseDataIndex] = useState('');

  const [editCarryOverAmount, setEditCarryOverAmount] = useState(myBudget?.carryOver ?? 0);
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
  const [remainAfterSave, setRemainAfterSave] = useState(0);
  const [deleteBudgetIndex, setDeleteBudgetIndex] = useState(0);
  const [newDebts, setNewDebts] = useState([]);
  const [editableInput, setEditableInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //NEW STATES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleSaveAmount, setCycleSaveAmount] = useState(0);
  const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})
  const [allBudgetDates, setAllBudgetDates] = useState(redux_myBudget?.budgetDates ?? [])
  const [selectedBudget, setSelectedBudget] = useState(redux_myBudget ?? {})
  const [income, setIncome] = useState(redux_myBudget?.Income?.length > 0 ? redux_myBudget?.Income[0]?.netIncome : 0)
  const [primaryIncome, setPrimaryIncome] = useState(redux_myBudget?.Income?.length > 0 ? redux_myBudget?.Income[0] : {});
  const [allDebts, setAllDebts] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [toSave, setToSave] = useState(0)
  const [toPay, setToPay] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [autoFill, setAutoFill] = useState(redux_myBudget?.feature == 'Enable' ? true : false)
  const [notifications, setNotifications] = useState([])
  const [savingsGoal, setSavingsGoal] = useState(0)
  //NEW REFS
  const shouldUpdateSavingsRef = useRef(false);
  const prevTotalPaymentsRef = useRef(totalPayments);
  const notificationRef = useRef()

  // Modals
  const [threeDotModal, setThreeDotModal] = useState(false);
  const [budgetsModal, setBudgetsModal] = useState(false);
  const [editCurrentIncomeModal, setEditCurrentIncomeModal] = useState(false);
  const [editCurrentSavingsModal, setEditCurrentSavingsModal] = useState(false);
  const [deleteThreeDotModal, setDeleteThreeDotModal] = useState(false);
  const [addIconModal, setAddIconModal] = useState(false);
  const [expensesCategoriesModal, setExpensesCategoriesModal] = useState(false);
  const [oneTimeExpenseModal, setOneTimeExpenseModal] = useState(false);
  const [additionalIncomeModal, setAdditionalIncomeModal] = useState(false);
  const [additionalIncomeSourceModal, setAdditionalIncomeSourceModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [editDebtsModal, setEditDebtsModal] = useState(false);
  const [editCarryOverModal, setEditCarryOverModal] = useState(false);
  const [editSaveAmountModal, setEditSaveAmountModal] = useState(false);
  const [toolTipModal, setToolTipModal] = useState(false);
  const [editSavingsGoal, setEditSavingsGoal] = useState(false)


  useEffect(() => {
    if (focused) {
      if (redux_myBudget?.budgetDates?.length == 0) {
        setNewBudgetData()
      }
      else {
        setInitialBudgetData()
      }
      if(redux_myBudget?._id){
        AsyncStorage.setItem('activeBudget', JSON.stringify(redux_myBudget?._id))
      }
     
    }
  }, [focused])

  useEffect(() => {
    if (focused || redux_myBudget) {
      setBudgetData(redux_myBudget)
    }

  }, [redux_myBudget, focused])


  const setNewBudgetData = () => {

    let budget_date = {
      totalCurrentSaving: parseFloat(redux_myBudget?.totalSaving),
      carryOver: parseFloat(0),
      cycleSaveAmount: parseFloat(cycleSaveAmount),
      netIncome: redux_myBudget?.Income ? parseFloat(redux_myBudget?.Income[0]?.netIncome) : 0,
      nextPayDate: primaryIncome?.nextPayDate ? primaryIncome?.nextPayDate : redux_myBudget?.Income[0]?.nextPayDate,
      debts_dates: redux_myBudget?.Debts,
    };

    const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, budget_date)
    const updated_expenses = updateExpensesMonths(expenses, budget_date.nextPayDate)
    budget_date.expenses = updated_expenses

    const local_budget = { ...redux_myBudget };
    local_budget.budgetDates = [budget_date];

    //// update budgets array ended
    dispatch(Budget(local_budget));

    if (redux_myBudget?._id) {
      // current_budget = local_budget;
      addToArray('Budgets', redux_myBudget?._id, 'budgetDates', budget_date)
    }

  }

  const setInitialBudgetData = () => {
    if (redux_myBudget?.feature == "Enable") {
      setAutoFill(true)
    }
    else {
      setAutoFill(false)
    }
    // getting nearest date index and setting budget data
    setSelectedBudget(redux_myBudget)
    const index = calculateNearestDateIndex(redux_myBudget)
    setCurrentIndex(index)
    setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})
  }
  const setBudgetData = (budget) => {
    if (budget?.feature == "Enable") {
      setAutoFill(true)
    }
    else {
      setAutoFill(false)
    }
    // getting nearest date index and setting budget data
    setSelectedBudget(budget)
    setSelectedBudgetDate(budget?.budgetDates?.length > 0 ? budget?.budgetDates[currentIndex] : {})
  }

  useEffect(() => {
    if (Object?.keys(selectedBudgetDate || {}).length != 0 && focused) {
      setCycleSaveAmount(selectedBudgetDate?.cycleSaveAmount)
      setTotalSavings(selectedBudgetDate?.totalCurrentSaving)
      setIncome(selectedBudgetDate?.netIncome)
      setAllDebts(selectedBudgetDate?.debts_dates)
      const myNotifications = selectedBudgetDate?.debts_dates?.length ? selectedBudgetDate?.debts_dates?.filter((item) => item.debtAmount <= 0) : []
      if (calculateDebtsTotalAmount(selectedBudgetDate?.debts_dates) == 0) {
        if (selectedBudget?.savingsGoal && selectedBudget?.savingsGoal <= selectedBudgetDate?.totalCurrentSaving) {
          myNotifications?.push('reached savings goal')
        }
        else if (!selectedBudget?.savingsGoal) {
          myNotifications?.push('no savings goal')
        }
      }
      if (primaryIncome?.incomeType == 'Variable Income') {
        myNotifications?.push('variable income')
      }

      let next_date = onPressNextArrow(primaryIncome?.frequency, selectedBudgetDate?.nextPayDate)
      const nextIncomes = selectedBudget?.Income?.filter((i) => {
        return calculateDateIfBetween(selectedBudgetDate?.nextPayDate, next_date, i?.nextPayDate) && i?.incomeSource !== selectedBudget?.Income[0]?.incomeSource && parseInt(i?.netIncome) > parseInt(i?.usedIncome ?? 0)
      })


      const expenses = selectedBudgetDate?.expenses
      setAllExpenses(expenses)

      const variableExpense = expenses?.filter(i => i.expenseType == 'Variable')

      const payments = calculateTotalPayments(selectedBudgetDate?.debts_dates ?? [], expenses ?? [], selectedBudgetDate?.oneTimeExpenses ?? []) ?? 0;
      setTotalPayments(payments);
      const savings = selectedBudgetDate?.netIncome - payments - selectedBudget?.accountMinimum - selectedBudgetDate?.carryOver + parseInt(selectedBudgetDate?.cycleSaveAmount)
      if (autoFill == true) {
        addRemainingSavingsToDebt(parseInt(savings), selectedBudgetDate?.debts_dates, setAllDebts, setToSave, setToPay);
      }
      else {
        setToSave(selectedBudgetDate?.cycleSaveAmount)
        setToPay(calculateDebts(selectedBudgetDate?.debts_dates))
      }

      if (parseInt(calculateRemaining()) < 0) {
        myNotifications.push('negative budget')
      }

      setTimeout(() => {
        if (nextIncomes?.length > 0) {
          myNotifications.push(...variableExpense)
        }
        if (nextIncomes?.length > 0) {
          myNotifications.push(...nextIncomes)
        }
        setNotifications(myNotifications)
      }, 1000);
    }
  }, [selectedBudgetDate, focused])

  // useEffect(()=>{
  //   setToSave(cycleSaveAmount)
  // }, [cycleSaveAmount])

  useEffect(() => {
    const total_save = parseFloat(toSave) + parseFloat(totalSavings)
    // alert(total_save)
    setTotalSavings(total_save)
  }, [toSave])

  useEffect(() => {
    setSelectedBudgetDate(selectedBudget?.budgetDates?.length > 0 ? selectedBudget?.budgetDates[currentIndex] : {})
  }, [currentIndex])

  useEffect(() => {
    const payments = calculateTotalPayments(allDebts ?? [], allExpenses ?? [], selectedBudgetDate?.oneTimeExpenses ?? []) ?? 0;
    setTotalPayments(payments);
  }, [allDebts, allExpenses, selectedBudgetDate?.oneTimeExpenses])

  const onDragEnd = ({ data, from, to }) => {
    // Update the list indexes and revert paymentAmount and debtAmount to original
    const updatedData = data.map((item, index) => {
      const originalItem = selectedBudgetDate.debts_dates.find((originalItem) => originalItem.id === item.id);
      return { ...item, debtAmount: originalItem?.debtAmount, paymentAmount: originalItem?.paymentAmount };
    });

    setAllDebts(updatedData);

    const total = calculateTotalPayments([], allExpenses ?? [], selectedBudgetDate?.oneTimeExpenses ?? []) ?? 0;

    if (autoFill == true) {
      addRemainingSavingsToDebt(selectedBudgetDate?.netIncome - total - selectedBudget?.accountMinimum, updatedData, setAllDebts, setTotalSavings, setToPay)
    }
  }

  // set user data
  useEffect(() => {
    setUser(redux_user ?? [])
  }, [redux_user])


  //All Functions
  // render flatlist for expenses
  const showExpenses = ({ item, index }) => {
    return (
      <SwipableListHomeExpense
        index={index}
        currentlyOpenIndex={currentlyOpenIndex}
        setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(index)}
        ExpenseName={item?.userExpenseName}
        ExpenseDate={item?.nextBillDue ? item?.nextBillDue : '-'}
        ExpenseAmount={convert_numbers(item?.expenseAmount)}
        Currency={selectedBudget?.currency}
        CurrentDate={selectedBudgetDate?.nextPayDate}
        onPressEdit={() => {
          setEditExpenseDataIndex(index)
          setEditExpenseModal(!editExpenseModal)
          setEditExpenseData(item)
          setEditExpenseAmount(item?.expenseAmount)
        }}
        onPress={() => { onPressExpenseDelete(item, index) }}
        iconVisible={item?.expenseType == 'Fixed' ? false : true}
        swipeEnabled={item?.expenseType ? false : true}
      />
    )
  }

  // render flatlist for debts
  const showDebts = ({ item, drag, isActive, getIndex }) => {
    const index = getIndex()
    return (
      <ScaleDecorator>
        <ShowHomeDebts
          DebtsName={item?.debtName}
          DebtsPayment={convert_numbers(item?.paymentAmount ?? 0)}
          TotalDebts={convert_numbers(item?.debtAmount)}
          Currency={budget?.currency}
          Drag={drag}
          onPressEdit={() => {
            setEditDebtDataIndex(index)
            setEditDebtAmount(item?.debtAmount ?? 0)
            setEditDebtsData(item)
            setEditDebtsModal(!editDebtsModal)
          }}
        />
      </ScaleDecorator>
    )
  }

  // When user open three dot menu to select items
  const onPressThreeDotItemData = (item) => {
    if (item == Translate('MyBudgetScreen.editCurrentIncome')) {
      setThreeDotModal(!threeDotModal)
      setTimeout(() => {
        setEditCurrentIncomeModal(!editCurrentIncomeModal)
      }, 500);

    } else if (item == Translate('MyBudgetScreen.editCurrentSavings')) {
      setThreeDotModal(!threeDotModal)
      setTimeout(() => {
        setEditCurrentSavingsModal(!editCurrentSavingsModal)
      }, 500);

    } else {
      setThreeDotModal(!threeDotModal)
      setTimeout(() => {
        props.navigation.navigate(routes.editBudget, { budget: selectedBudget })
      }, 500);

    }
  }

  // When user plus icon
  const onPressAddIcon = (item) => {
    if (item == Translate('MyBudgetScreen.oneTimeExpense')) {
      setAddIconModal(!addIconModal)
      setTimeout(() => {
        props.navigation.navigate(routes.oneTimeExpense, { selectedBudget, selectedBudgetDate, setSelectedBudget, setSelectedBudgetDate, currentIndex })
      }, 500);
    } else if (item == Translate('MyBudgetScreen.additionalIncome')) {
      setAddIconModal(!addIconModal)
      setTimeout(() => {
        setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
      }, 500);
    } else {
      setAddIconModal(!addIconModal)
      props.navigation.navigate(routes.createBudget)
    }
  }

  // onPressSkip
  const onPressSkip = () => {
    setToolTipModal(false)
    user.firstTimeLogin = false
    dispatch(Users(user))
    setTimeout(() => {
      saveData('Users', user?.userId, { firstTimeLogin: false })
      props.navigation.navigate(routes.createBudget)
    }, 500);

  }

  // onPresssNext
  const onPresssNext = () => {
    setToolTipModal(false)
    setTimeout(() => {
      props.navigation.navigate(routes.createBudget)
    }, 500);

  }

  // When user select another budget
  const onPressBudgets = (item) => {
    dispatch(Budget(item))
    var nearestDateIndex = 0;
    if (item?.budgetDates?.length > 0) {
      nearestDateIndex = calculateNearestDateIndex(item);
    }
    else {
      setNewBudgetData()
    }

    setBudgetName(item?.budgetName)
    setSelectedBudget(item)
    setCurrentIndex(nearestDateIndex)
    setSelectedBudgetDate(item?.budgetDates[nearestDateIndex])
    setBudgetsModal(!budgetsModal)
  }

  // if user want to add one time expense from modal
  const onSelectExpense = (expense) => {
    setExpenseName(expense)
    setExpensesCategoriesModal(!expensesCategoriesModal)
    setTimeout(() => {
      setOneTimeExpenseModal(!oneTimeExpenseModal)
    }, 500);

  }

  // if user want to add one time expense from modal
  const onPressAdditionalIncomeitems = (source) => {
    if (typeof (source) == 'object') {
      setAdditionalIncomeName(source?.incomeSource)
      setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
      setTimeout(() => {
        setAdditionalIncomeModal(!additionalIncomeModal)
      }, 500);
    }
    else {
      setAdditionalIncomeName(source)
      setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
      setTimeout(() => {
        setAdditionalIncomeModal(!additionalIncomeModal)
      }, 500);
    }


  }

  // when user press on back arrow to change date
  const onPressBackArrow = async () => {
    setCurrentIndex(currentIndex - 1 < 0 ? 0 : currentIndex - 1)
  };

  // when user press on right arrow to change date
  const onPressRightArrow = () => {
    // FIND NEXT PAY DATE AND ADD NEW BUDGET
    let nextPayDate = onPressNextArrow(primaryIncome?.frequency, selectedBudgetDate?.nextPayDate)
    calculateNextDateBudgets(nextPayDate)
  }

  // this function called when onPressRightArrow function executed
  const calculateNextDateBudgets = async (next_date) => {
    const newIndex = currentIndex + 1

    const allDebtsUpdated = allDebts?.map((i) => { return { ...i, paymentAmount: 0 } })

    let budget_date = {
      totalCurrentSaving: totalSavings,
      carryOver: parseFloat(0),
      cycleSaveAmount: parseFloat(0),
      netIncome: parseInt(selectedBudget?.Income[0]?.netIncome) + (parseInt(selectedBudgetDate?.carryOver) ?? 0),
      nextPayDate: next_date,
      debts_dates: allDebtsUpdated,
    };

    const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, budget_date)
    const updated_expenses = updateExpensesMonths(expenses, budget_date.nextPayDate)
    budget_date.expenses = updated_expenses

    if (selectedBudget?.budgetDates[newIndex]) {
      setCurrentIndex(newIndex)
    }
    else {
      const local_budget = { ...selectedBudget };
      local_budget.budgetDates.push(budget_date);

      //// update budgets array ended
      dispatch(Budget(local_budget));

      // if (redux_myBudget?._id) {
      //   // current_budget = local_budget;
      //   addToArray('Budgets', redux_myBudget?._id, 'budgetDates', budget_date)
      // }

      setCurrentIndex(newIndex)
    }
  };

  // when user edit the expense amount
  const onPressEditExpenseDone = (amount) => {
    if (editExpenseData?.expenseType == 'Variable') {
        const local_budget = { ...selectedBudgetDate }
        let editExpense = local_budget?.expenses?.findIndex(i=> i.id == editExpenseData?.id)
        let _item = {
          ...local_budget?.expenses[editExpense],
          expenseAmount: amount
        };

        console.log('first', _item, editExpense)

        local_budget.expenses[editExpense] = _item
        setSelectedBudgetDate(local_budget)
        updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'expenses', local_budget.expenses)
        setEditExpenseModal(!editExpenseModal)

    } else {
      if (amount.length > 0) {
        const local_budget = { ...selectedBudgetDate }
        let editExpense = local_budget?.oneTimeExpenses[editExpenseDataIndex]

        let _item = {
          ...editExpense,
          expenseAmount: amount
        };
        local_budget.oneTimeExpenses[editExpenseDataIndex] = _item
        setSelectedBudgetDate(local_budget)
        updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'oneTimeExpenses', local_budget.oneTimeExpenses)
        setEditExpenseModal(!editExpenseModal)
      }
    }


  }

  // when user press the delete icon to delete expense
  const onPressExpenseDelete = (item_data, item_index) => {
    let filteredArray = selectedBudgetDate?.oneTimeExpenses?.filter((item, index) => index != item_index)
    selectedBudget.budgetDates[currentIndex].oneTimeExpenses = filteredArray
    var local_budget = { ...selectedBudgetDate }
    local_budget.oneTimeExpenses = filteredArray
    setSelectedBudgetDate(local_budget)
    dispatch(Budget(selectedBudget))
    updateArrayObjectKey("Budgets", selectedBudget?._id, 'budgetDates', currentIndex, 'oneTimeExpenses', filteredArray)
  }

  // when user click cross icon to delete budget
  const onPressDeleteBudget = () => {
    setDeleteThreeDotModal(!deleteThreeDotModal)
    var nearestDateIndex = 0;
    let arr = [...allBudget];
    let target = arr[deleteBudgetIndex];
    arr.splice(deleteBudgetIndex, 1);
    setAllBudget(arr);
    if (arr?.length == 0) {
      dispatch(AllBudget(arr));
      dispatch(Budget({}));
    } else {
      dispatch(AllBudget(arr));
      dispatch(Budget(arr[0]));
      setMyBudget(arr[0]?.budgetDates[nearestDateIndex]);
      setBudgetName(arr[0]?.budgetName);
      setBudget(arr[0]);
    }
    deleteDoc('Budgets', target?._id);
  };

  // when user edit carry over amount
  const onPressCarryOverDone = (data) => {
    setEditCarryOverAmount(data)
    let amount = data == '' ? 0 : data
    // data.carryOver = amount
    // setMyBudget(data)
    selectedBudget.budgetDates[currentIndex].carryOver = amount
    var local_budget = { ...selectedBudgetDate }
    local_budget.carryOver = amount
    setSelectedBudgetDate(local_budget)
    // setBudget(budget)
    dispatch(Budget(selectedBudget))
    // saveRemaining(amount)
    updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'carryOver', amount)
    setEditCarryOverModal(!editCarryOverModal)
  }

  // when user edit payment amount for debts amount
  const onPressDebtsEditDone = (debtAmount) => {
    setEditDebtAmount(debtAmount)
    const all_debts = [...allDebts]
    let editDebt = all_debts[editDebtDataIndex]
    let originalDebt = selectedBudgetDate.debts_dates.find((originalItem) => originalItem.id === editDebt.id);

    let _item = {
      debtAmount: originalDebt?.debtAmount - debtAmount,
      debtName: editDebt?.debtName,
      id: editDebt?.id,
      paymentAmount: debtAmount,
    };

    all_debts[editDebtDataIndex] = _item
    setAllDebts(all_debts)
    setToPay(calculateDebts(all_debts))
    // updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'netIncome', new_income)
    setEditDebtsModal(!editDebtsModal)
  }

  // when user edit save amount for cycle save
  const onPressCycleSaveDone = (data) => {
    setCycleSaveAmount(parseInt(data))
    let amount = data == '' ? 0 : data
    // data.carryOver = amount
    // setMyBudget(data)
    selectedBudget.budgetDates[currentIndex].cycleSaveAmount = amount
    var local_budget = { ...selectedBudgetDate }
    local_budget.cycleSaveAmount = amount
    setSelectedBudgetDate(local_budget)
    // setBudget(budget)
    dispatch(Budget(selectedBudget))
    // saveRemaining(amount)
    updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'cycleSaveAmount', amount)
    setEditSaveAmountModal(!editSaveAmountModal)
    //
  }

  // when user edit savings goal amount
  const onPressSavingsGoalDone = (data) => {
    setSavingsGoal(parseInt(data))
    let amount = data == '' ? 0 : data
    const local_budget = { ...selectedBudget };
    local_budget.savingsGoal = amount
    dispatch(Budget(local_budget));
    saveData('Budgets', redux_myBudget?._id, { savingsGoal: amount })
    notificationRef?.current?.swipeTop()
    setTimeout(() => {
      setEditSavingsGoal(false)
    }, 500);
  }

  // when user change carryOver amount
  const saveRemaining = text => {
    let save =
      myBudget?.netIncome -
      calculateExpenses(allExpenses, myBudget?.oneTimeExpenses ? myBudget?.oneTimeExpenses : []) -
      calculateDebts(newDebts) -
      parseFloat(text ?? myBudget?.carryOver)

    if (parseFloat(save) < budget?.accountMinimum) {
      setRemainAfterSave(parseFloat(save) + parseFloat(text))
      return parseFloat(save) + parseFloat(text)
    } else {
      setRemainAfterSave(budget?.accountMinimum)
      return budget?.accountMinimum
    }
  };

  // calculate remaining amount
  const calculateRemaining = () => {
    if (autoFill == true) {
      if (calculateDebtsRemaining(selectedBudgetDate?.debts_dates) > 0) {
        return `${income - totalPayments - cycleSaveAmount - selectedBudgetDate?.carryOver}`
      }
      else {
        return `${income - totalPayments - selectedBudgetDate?.carryOver - toSave}`
      }
    }
    else {
      return `${income - totalPayments - cycleSaveAmount - selectedBudgetDate?.carryOver - toSave}`
    }
  };

  // calculate remaining amount
  // const calculateRemainingSavings = () => {
  //   if (autoFill == true) {
  //       return `${income - totalPayments - selectedBudgetDate?.carryOver}`
  //   }
  //   else {
  //     return `${income - totalPayments - cycleSaveAmount - selectedBudgetDate?.carryOver}`
  //   }
  // };

  const addAdditionalIncome = () => {
    if (additionalIncomeName == '') {
      Error('Select an income source first')
    }
    else if (additionalIncomeName == Translate('MyBudgetScreen.Other')) {
      var new_budget = { ...selectedBudgetDate }
      const new_income = parseInt(selectedBudgetDate?.netIncome) + parseInt(additionalIncome)
      new_budget.netIncome = new_income

      const new_current_budget = { ...selectedBudget }
      new_current_budget.budgetDates[currentIndex] = new_budget

      dispatch(Budget(new_current_budget))
      updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'netIncome', new_income)
    }
    else if (additionalIncomeName == Translate('MyBudgetScreen.transferSavings')) {
      var new_budget = { ...selectedBudgetDate }
      const new_income = parseInt(new_budget?.netIncome) + parseInt(additionalIncome)
      new_budget.netIncome = new_income
      new_budget.totalCurrentSaving = parseInt(new_budget?.totalCurrentSaving) - parseInt(additionalIncome)
      const new_current_budget = { ...selectedBudget }
      new_current_budget.budgetDates[currentIndex] = new_budget

      dispatch(Budget(new_current_budget))
      saveData('Budgets', selectedBudget?._id, { budgetDates: new_current_budget.budgetDates })
    }
    else {
      var new_budget = { ...selectedBudgetDate }
      const new_income = parseInt(selectedBudgetDate?.netIncome) + parseInt(additionalIncome)
      new_budget.netIncome = new_income

      var new_current_budget = { ...selectedBudget }
      new_current_budget.budgetDates[currentIndex] = new_budget

      new_current_budget.Income = new_current_budget.Income?.map((i) => {

        if (i?.incomeSource === additionalIncomeName) {
          return { ...i, usedIncome: parseInt(parseInt((i?.usedIncome ?? 0)) + parseInt(additionalIncome)) }
        }
        else {
          return i
        }

      })
      dispatch(Budget(new_current_budget))
      saveData('Budgets', selectedBudget?._id, { Income: new_current_budget.Income })
      updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'netIncome', new_income)
    }
    setAdditionalIncomeModal(!additionalIncomeModal)
  }

  const changeIncome = (data) => {
    var new_budget = { ...selectedBudgetDate }
    const new_income = parseInt(data)
    new_budget.netIncome = new_income

    var new_current_budget = { ...selectedBudget }
    new_current_budget.budgetDates[currentIndex] = new_budget

    dispatch(Budget(new_current_budget))

    updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'netIncome', new_income)
    setEditCurrentIncomeModal(false)
    // setAdditionalIncomeModal(false)

  }

  const changeSavings = (data) => {
    var new_budget = { ...selectedBudgetDate }
    const new_savings = parseInt(data)
    new_budget.totalCurrentSaving = new_savings

    var new_current_budget = { ...selectedBudget }
    new_current_budget.budgetDates[currentIndex] = new_budget

    dispatch(Budget(new_current_budget))

    updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'totalCurrentSaving', new_savings)
    setEditCurrentSavingsModal(false)
    // setAdditionalIncomeModal(false)

  }

  const renderOtherIncomes = () => {
    let next_date = onPressNextArrow(primaryIncome?.frequency, selectedBudgetDate?.nextPayDate)
    const nextIncomes = selectedBudget?.Income?.filter((i) => {
      return calculateDateIfBetween(selectedBudgetDate?.nextPayDate, next_date, i?.nextPayDate) && i?.incomeSource !== selectedBudget?.Income[0]?.incomeSource && parseInt(i?.netIncome) > parseInt(i?.usedIncome ?? 0)
    }) ?? []
    return [...nextIncomes, Translate('MyBudgetScreen.transferSavings'), Translate('MyBudgetScreen.Other')]
  }

  const renderToSaveAndToPay = () => {

    if (toPay > 0 && toSave > 0) {
      return `${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(toPay)}   ${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(toSave)}`
    }
    else if (toSave > 0) {
      return `${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(toSave)}`
    }
    else if (toPay > 0) {
      return `${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(toPay)}`
    }
  }


  const renderToSaveAndToPayTitle = () => {
    if (toPay > 0 && toSave > 0) {
      return Translate("MyBudgetScreen.toSaveAndToPay")
    }
    else if (toSave > 0) {
      return Translate("MyBudgetScreen.toSave")
    }
    else if (toPay > 0) {
      return Translate("MyBudgetScreen.toPay")
    }
  }

  const renderNotifications = () => {
    return (
      <View style={{ flex: 1, height: height(15), paddingTop: 0, margin: 0 }}>
        <Swiper
          cards={notifications}
          ref={notificationRef}
          // cardHorizontalMargin={0}
          cardVerticalMargin={height(1)}
          // cardStyle={{height:'100%'}}
          renderCard={(item) => {
            if (item?.expenseType == 'Variable' && typeof (item) == 'object') {
              return (
                <NotificationView
                  NotificationText={`Please update your variable expense amount for ${item?.userExpenseName}`}
                  Button1Text={'Update Expense'}
                  Button2Text={'Skip'}
                  onPressButton1={() => {
                    setEditExpenseDataIndex(0) // wrong index given, have to find here later
                    setEditExpenseModal(!editExpenseModal)
                    setEditExpenseData(item)
                    setEditExpenseAmount(item?.expenseAmount)
                  }}
                  onPressButton2={() => {
                    notificationRef?.current?.swipeTop()
                  }}
                />
              )
            }
            else if (item?.netIncome && typeof (item) == 'object') {
              return (
                <NotificationView
                  NotificationText={`Payday is here for ${item?.incomeSource}, choose what to do with this extra income`}
                  Button1Text={'Add to budget'}
                  Button2Text={'Skip'}
                  onPressButton1={() => {
                    setAdditionalIncomeName(item?.incomeSource)
                    setTimeout(() => {
                      setAdditionalIncomeModal(true)
                    }, 500);

                    notificationRef?.current?.swipeTop()
                  }}
                  onPressButton2={() => {
                    notificationRef?.current?.swipeTop()
                  }}
                />
              )
            }
            else if (item === 'negative budget') {
              return (
                <NotificationView
                  NotificationText={'Budget is negative after expenses, would you like to add funds to current income'}
                  Button1Text={'Add Funds'}
                  Button2Text={'Skip'}
                  onPressButton1={() => {
                    setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
                  }}
                  onPressButton2={() => {
                    notificationRef?.current?.swipeTop()
                  }}
                />
              )
            }
            else if (item === 'reached savings goal') {
              return (
                <NotificationView
                  NotificationText={Translate('MyBudgetScreen.notificationText1')}
                  Button1Text={Translate('InsightsScreen.updateSavingsGoal')}
                  onPressButton1={() => {
                    setEditSavingsGoal(true)
                  }}
                />
              )
            }
            else if (item === 'no savings goal') {
              return (
                <NotificationView
                  NotificationText={'You have not setup your savings goal yet!'}
                  Button1Text={Translate('InsightsScreen.updateSavingsGoal')}
                  onPressButton1={() => {
                    setEditSavingsGoal(true)
                  }}
                />
              )
            }
            else if (item === 'variable income') {
              return (
                <NotificationView
                  NotificationText={`Please update your variable income amount for this budget cycle!`}
                  Button1Text={'Update Income'}
                  Button2Text={'Skip'}
                  onPressButton1={() => {
                    setEditCurrentIncomeModal(true)
                  }}
                  onPressButton2={() => {
                    notificationRef?.current?.swipeTop()
                  }}
                />
              )
            }
            else {
              return (
                <NotificationView
                  NotificationText={`You have paid the full debt amount for “${item?.debtName}”. Choose an option.`}
                  Button1Text={Translate('MyBudgetScreen.removeDebt')}
                  Button2Text={Translate('MyBudgetScreen.modifyDebtAmount')}
                  onPressButton1={() => {
                    console.log('hey')
                    const index = selectedBudgetDate?.debts_dates?.findIndex((i) => i.id == item.id)
                    const new_debts = selectedBudgetDate?.debts_dates?.filter((i) => i.id !== item.id)
                    console.log('NEW DEBTS', new_debts)
                    const new_budget_date = { ...selectedBudgetDate }
                    new_budget_date.debts_dates = new_debts
                    setAllDebts(new_debts)
                    setSelectedBudgetDate(new_budget_date)
                    updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'debts_dates', new_debts)

                  }}
                  onPressButton2={() => {
                    const index = allDebts.findIndex((i) => i.id == item.id)
                    setEditDebtDataIndex(index)
                    setEditDebtAmount(item?.paymentAmount ?? 0)
                    setEditDebtsData(item)
                    setEditDebtsModal(!editDebtsModal)
                  }}
                />
              )
            }

          }}
          onSwiped={(cardIndex) => { console.log(cardIndex) }}
          onSwipedAll={() => { setNotifications([]) }}
          cardIndex={0}
          stackSize={1}
          backgroundColor='transparent'
        />
      </View>
    )
  }

  return (

    <Wrappers.Wrapper style={styles.main}>
      <GestureHandlerRootView>
        {redux_allBudget?.length == 0 ?
          <Headers.Primary logoSource onPressProfileIcon={() => props.navigation.navigate(routes.setting)} user={user} />
          :
          <Headers.MyBudgetHeader
            title={budgetName}
            user={user}
            onPressLeftIcon={() => setThreeDotModal(!threeDotModal)}
            onPressBudget={() => setBudgetsModal(!budgetsModal)}
            onPressPlusIcon={() => setAddIconModal(!addIconModal)}
            onPressProfileIcon={() => props.navigation.navigate(routes.setting)}
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
                props.navigation.navigate(routes.createBudget)
              }
            }}
            Text={Translate('MyBudgetScreen.emptyViewText')}
          />
          :
          <Wrappers.Wrapper>

            <ScrollViews.KeyboardAvoiding>
              {notifications.length > 0 && calculateNearestDateIndex(redux_myBudget) == currentIndex && renderNotifications()}
              <Spacers.Small />
              <Wrappers.Component>
                {/* <NotificationView
              NotificationText={Translate('MyBudgetScreen.notificationText')}
              Button1Text={Translate('MyBudgetScreen.removeDebt')}
              Button2Text={Translate('MyBudgetScreen.modifyDebtAmount')}
              onPressButton1={() => setNotification(false)}
              onPressButton2={() => setEditDebtsModal(!editDebtsModal)}
            /> */}

                {/* {renderSavingsGoalNotification()} */}
                {/* use later */}
                {/* {notification &&
            <NotificationView
              NotificationText={Translate('MyBudgetScreen.notificationText')}
              Button1Text={Translate('MyBudgetScreen.removeDebt')}
              Button2Text={Translate('MyBudgetScreen.modifyDebtAmount')}
              onPressButton1={() => setNotification(false)}
              onPressButton2={() => setEditDebtsModal(!editDebtsModal)}
            />
          } */}
                {/* <NotificationView
            NotificationText={Translate('MyBudgetScreen.notificationText1')}
            Button1Text={Translate('InsightsScreen.updateSavingsGoal')}
            Button2Text={Translate('InsightsScreen.updateCurrentSavings')}
            success
          /> */}
                {/* use later */}

                <Spacers.Small />
                <SaveAmountView
                  title={renderToSaveAndToPayTitle()}
                  // saveAmount={`${selectedCurrencySymbol(budget?.currency)} ${calculateSavings() < 0 ? 0 : calculateSavings()}`}
                  saveAmount={renderToSaveAndToPay()}
                  // totalSaving={`${selectedCurrencySymbol(budget?.currency)} ${parseInt(myBudget?.totalCurrentSaving)}`}
                  totalSaving={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(totalSavings)}`}
                />
                <Spacers.Small />

                <Wrappers.Component>
                  <PayDateArrows
                    onPressLeft={() => onPressBackArrow()}
                    disabled={currentIndex == 0 ? true : false}
                    backArrowColor={currentIndex == 0 ? colors.gray : colors.black}
                    onPressRight={() => onPressRightArrow()}
                    title={Translate('MyBudgetScreen.payDate')}
                    value={selectedBudgetDate?.nextPayDate}
                  />
                </Wrappers.Component>
              </Wrappers.Component>

              <Spacers.Base />
              <IncomeView income={Translate('OnBoardingScreen.onBoardingTitle2')} incomeAmount={`${selectedCurrencySymbol(budget?.currency)} ${convert_numbers(income)}`} />

              <Spacers.Small />
              <Wrappers.Wrapper>
                <ExpenseHeaderHome />

                <FlatList
                  data={allExpenses}
                  renderItem={showExpenses}
                  scrollEnabled={false}
                  keyExtractor={item => item.id}
                />

                {selectedBudgetDate?.oneTimeExpenses?.length > 0 &&
                  <FlatList
                    data={selectedBudgetDate?.oneTimeExpenses}
                    renderItem={showExpenses}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                  />
                }

              </Wrappers.Wrapper>

              <Spacers.Base />
              <CopilotStep text={ToolTiopsText.text23} order={22} name="homeDebts">
                <CopilotView>
                  <CopilotStep text={ToolTiopsText.text24} order={23} name="homeDebts1">
                    <CopilotView>
                      <Wrappers.Wrapper>
                        {allDebts?.length > 0 &&
                          <DebtsHeaderHome />
                        }
                        <DraggableFlatList
                          data={allDebts ?? []}
                          renderItem={showDebts}
                          keyExtractor={(item, index) => index}
                          scrollEnabled={false}
                          onDragEnd={onDragEnd}
                        />
                      </Wrappers.Wrapper>
                    </CopilotView>
                  </CopilotStep>
                </CopilotView>
              </CopilotStep>
              <Spacers.Base />
              <Wrappers.Component>
                <TotalAmountView text={Translate('MyBudgetScreen.totalPayments')} totalAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(totalPayments)}`} />
                <Spacers.Small />

                <Wrappers.Wrapper>
                  <CopilotStep text={ToolTiopsText.text25} order={24} name="homeSave">
                    <CopilotView>
                      <CopilotStep text={ToolTiopsText.text26} order={25} name="homeCarry">
                        <CopilotView>
                          <Wrappers.Wrapper style={styles.carryOverView}>
                            <CarryOverView text={Translate('MyBudgetScreen.carryOver')}
                              disabled={false}
                              saveAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(selectedBudgetDate?.carryOver)}`}
                              onPressEdit={() => setEditCarryOverModal(!editCarryOverModal)} />

                            <CarryOverView text={Translate('MyBudgetScreen.Save')}
                              disabled={false}
                              // saveAmount={`${selectedCurrencySymbol(budget?.currency)} ${calculateSavings() < myBudget?.cycleSaveAmount ? calculateSavings() < 0 ? 0 : calculateSavings() : myBudget?.cycleSaveAmount}`}
                              saveAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(selectedBudgetDate?.cycleSaveAmount)}`}
                              onPressEdit={() => setEditSaveAmountModal(!editSaveAmountModal)} />
                          </Wrappers.Wrapper>
                        </CopilotView>
                      </CopilotStep>
                    </CopilotView>
                  </CopilotStep>
                </Wrappers.Wrapper>

                <Spacers.Small />
                <TotalAmountView text={Translate('MyBudgetScreen.totalRemaining')}
                  totalAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(calculateRemaining())}`}
                  color={calculateRemaining() < 0 ? colors.red : colors.textColor}
                />
              </Wrappers.Component>
              <Spacers.DoubleBase />
              <Spacers.DoubleBase />

            </ScrollViews.KeyboardAvoiding>
          </Wrappers.Wrapper>
        }
        {/* left three dot header */}
        <Modals.SimpleModal
          isVisible={threeDotModal}
          toggleModal={() => setThreeDotModal(!threeDotModal)}
          onChangeVisibility={() => setThreeDotModal(!threeDotModal)}
          data={[Translate('MyBudgetScreen.editCurrentSavings'), Translate('MyBudgetScreen.editCurrentIncome'), Translate('MyBudgetScreen.editBudget')]}
          onPressItem={(item) => onPressThreeDotItemData(item)}
        />

        {/* Select budgets header */}
        <Modals.SimpleModal
          isVisible={budgetsModal}
          toggleModal={() => setBudgetsModal(!budgetsModal)}
          onChangeVisibility={() => setBudgetsModal(!budgetsModal)}
          data={allBudget}
          onPressItem={(item) => onPressBudgets(item)}
          // textColor={budgetName}
          onPressDeleteIcon={(index) => {
            setDeleteBudgetIndex(index)
            setBudgetsModal(!budgetsModal)
            setTimeout(() => {
              setDeleteThreeDotModal(true)
            }, 500);

          }}
        />

        {/* plus icon header */}
        <Modals.SimpleModal
          isVisible={addIconModal}
          toggleModal={() => setAddIconModal(!addIconModal)}
          onChangeVisibility={() => setAddIconModal(!addIconModal)}
          Title={Translate('MyBudgetScreen.plusHeaderModalTitle')}
          margin={true}
          data={[Translate('MyBudgetScreen.additionalIncome'), Translate('MyBudgetScreen.oneTimeExpense'), Translate('MyBudgetScreen.newBudget')]}
          onPressItem={(item) => onPressAddIcon(item)}
          textColor={colors.button}
        />

        {/* Add one time expense  */}
        <Modals.EditHomeModal
          isVisible={oneTimeExpenseModal}
          toggleModal={() => setOneTimeExpenseModal(!oneTimeExpenseModal)}
          onChangeVisibility={() => setOneTimeExpenseModal(!oneTimeExpenseModal)}
          Title={Translate('MyBudgetScreen.addOneTimeExpense')}
          // value={oneTimeExpenseAmount}
          onChangeText={(ote) => setOneTimeExpenseAmount(ote)}
          expenseName={expenseName}
          onChangeExpense={(en) => setExpenseName(en)}
          onPressMenuIcon={() => {
            setTimeout(() => {
              setExpensesCategoriesModal(!expensesCategoriesModal)
            }, 500)
            setOneTimeExpenseModal(!oneTimeExpenseModal)
          }}
          insideIconName={expenseImage(expenseName) == null ? 'list-circle-outline' : ''}
          expenseImage={expenseImage(expenseName)}
          additionalIncome={oneTimeExpenseAmount}
          onPressDone={(expense) => {
            if (expense?.userExpenseName?.length == 0 || expense?.expenseAmount?.length == 0) {
              Toast.show('Expense name or amount cannot be empty');
            } else if (
              saveRemaining(expense?.expenseAmount) -
              parseFloat(myBudget?.carryOver ?? 0) >=
              parseInt(0)
            ) {
              const copy_my_budget = { ...myBudget };
              if (copy_my_budget?.oneTimeExpenses?.length > 0) {
                copy_my_budget.oneTimeExpenses.push(expense);
              } else {
                copy_my_budget.oneTimeExpenses = [expense];
              }
              const all_budget_data = { ...budget };
              all_budget_data.budgetDates[currentIndex] = copy_my_budget;
              saveData('Budgets', budget?._id, {
                budgetDates: all_budget_data.budgetDates,
              });
              setMyBudget(copy_my_budget);
              setBudget(all_budget_data)
              setOneTimeExpenseModal(!oneTimeExpenseModal)
            } else {
              Toast.show('Higher amount entered!');
            }
          }}
          Currency={budget?.currency}
        />

        {/* Add additional income */}
        <Modals.EditHomeModal
          isVisible={additionalIncomeModal}
          toggleModal={() => setAdditionalIncomeModal(!additionalIncomeModal)}
          onChangeVisibility={() => setAdditionalIncomeModal(!additionalIncomeModal)}
          Title={Translate('MyBudgetScreen.addAdditionalIncome')}
          additionalIncomeName={additionalIncomeName}
          setAdditionalIncomeName={(ain) => setAdditionalIncomeName(ain)}
          onPressSource={() => {
            setAdditionalIncomeModal(!additionalIncomeModal)
            setTimeout(() => {
              setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
            }, 500);
          }}
          amountLimit={additionalIncome?.netIncome}
          additionalIncome={additionalIncome}
          setAdditionalIncome={setAdditionalIncome}
          onPressDone={addAdditionalIncome}
        />

        {/* Add source from Add additional income */}
        <Modals.SimpleModal
          isVisible={additionalIncomeSourceModal}
          toggleModal={() => setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)}
          onChangeVisibility={() => setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)}
          data={renderOtherIncomes()}
          objKey={'Incomes'}
          onPressItem={(item) => onPressAdditionalIncomeitems(item)}
        />

        {/* Add expense from Add one time expense  */}
        <Modals.ExpensesCategoriesModal
          isVisible={expensesCategoriesModal}
          toggleModal={() => setExpensesCategoriesModal(!expensesCategoriesModal)}
          Title={Translate('selectCategory')}
          // ref={ref}
          setExpenseName={(expense) => onSelectExpense(expense)}
        />



        {/* delete from select expense header */}
        <Modals.DeleteModal
          isVisible={deleteThreeDotModal}
          toggleModal={() => setDeleteThreeDotModal(!deleteThreeDotModal)}
          onChangeVisibility={() => setDeleteThreeDotModal(!deleteThreeDotModal)}
          Title={Translate('MyBudgetScreen.deleteModalText')}
          allBudgets={allBudget}
          currentBudget={budget}
          onPresssDelete={() => onPressDeleteBudget()}
          onPressCancel={() => setDeleteThreeDotModal(!deleteThreeDotModal)}
        />

        {/* edit curent income from three dot header */}
        {editCurrentIncomeModal &&
          <Modals.EditCurrentIncomeModal
            isVisible={editCurrentIncomeModal}
            toggleModal={() => { setEditCurrentIncomeModal(!editCurrentIncomeModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditCurrentIncomeModal(!editCurrentIncomeModal), setErrorMessage('') }}
            Title={Translate('MyBudgetScreen.editCurrentIncome')}
            placeholder={income?.toString()}
            Currency={selectedBudget?.currency}
            onPressDone={changeIncome}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        }

        {/* edit curent savings from three dot header */}
        {editCurrentSavingsModal &&
          <Modals.EditCurrentIncomeModal
            isVisible={editCurrentSavingsModal}
            toggleModal={() => { setEditCurrentSavingsModal(!editCurrentSavingsModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditCurrentSavingsModal(!editCurrentSavingsModal), setErrorMessage('') }}
            Title={Translate('MyBudgetScreen.editCurrentSavings')}
            placeholder={totalSavings?.toString()}
            Currency={selectedBudget?.currency}
            onPressDone={changeSavings}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        }

        {/* Edit Modal for expenses */}

        {editExpenseModal &&
          <Modals.EditVariableModal
            isVisible={editExpenseModal}
            toggleModal={() => { setEditExpenseModal(!editExpenseModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditExpenseModal(!editExpenseModal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.editAmountFor')} ${editExpenseData?.userExpenseName}`}
            onPressDone={(amount) => onPressEditExpenseDone(amount)}
            editExpenseAmount={editExpenseAmount.toString() ?? '0'}
            placeholder={editExpenseAmount}
            setEditExpenseAmount={setEditExpenseAmount}
            onPressExpenseData={editExpenseData}
            // amountLimit={calculateRemainingSavings()}
            Currency={selectedBudget?.currency}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        }



        {/* Edit Modal for debts */}
        {editDebtsModal &&
          <Modals.EditModalBudgetDebt
            isVisible={editDebtsModal}
            toggleModal={() => { setEditDebtsModal(!editDebtsModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditDebtsModal(!editDebtsModal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.inputAmountFor')} ${editDebtsData?.debtName}`}
            onPressExpenseData={selectedBudget}
            editExpenseAmount={editDebtAmount == 0 ? '' : editDebtAmount.toString()}
            placeholder={editDebtAmount}
            setEditExpenseAmount={setEditDebtAmount}
            Currency={selectedBudget?.currency}
            onPressDone={(data) => onPressDebtsEditDone(data)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            // amountLimit={`${income}`}
            totalDebt={parseInt(editDebtsData.paymentAmount) + parseInt(editDebtsData.debtAmount)}
          />
        }

        {/* Edit Modal for carryOver amount */}

        {editCarryOverModal &&
          <Modals.EditModal
            isVisible={editCarryOverModal}
            toggleModal={() => { setEditCarryOverModal(!editCarryOverModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditCarryOverModal(!editCarryOverModal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.inputCarryOver')}`}
            onPressExpenseData={selectedBudgetDate}
            editExpenseAmount={editCarryOverAmount == 0 ? '' : editCarryOverAmount.toString()}
            placeholder={editCarryOverAmount}
            setEditExpenseAmount={setEditCarryOverAmount}
            Currency={selectedBudget?.currency}
            onPressDone={(data) => onPressCarryOverDone(data)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            // amountLimit={calculateRemaining()}
            amountLimit={additionalIncome?.netIncome}
          />
        }


        {/* Edit Modal for save Amount */}
        {editSaveAmountModal &&
          <Modals.EditModal
            isVisible={editSaveAmountModal}
            toggleModal={() => { setEditSaveAmountModal(!editSaveAmountModal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditSaveAmountModal(!editSaveAmountModal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.inputSave')}`}
            onPressExpenseData={selectedBudget}
            editExpenseAmount={cycleSaveAmount == 0 ? '' : cycleSaveAmount.toString()}
            placeholder={cycleSaveAmount}
            setEditExpenseAmount={setCycleSaveAmount}
            Currency={selectedBudget?.currency}
            onPressDone={(data) => onPressCycleSaveDone(data)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            amountLimit={editSaveAmountModal ? null : calculateRemaining()}
          />
        }

        {/* Edit Modal for savings goal */}
        {editSavingsGoal &&
          <Modals.EditSavingsGoalModal
            isVisible={editSavingsGoal}
            toggleModal={() => { setEditSavingsGoal(!editSavingsGoal), setErrorMessage('') }}
            onChangeVisibility={() => { setEditSavingsGoal(!editSavingsGoal), setErrorMessage('') }}
            Title={`${Translate('MyBudgetScreen.savingsGoal')}`}
            onPressExpenseData={selectedBudget}
            editExpenseAmount={savingsGoal}
            placeholder={savingsGoal}
            setEditExpenseAmount={setSavingsGoal}
            Currency={selectedBudget?.currency}
            onPressDone={(data) => onPressSavingsGoalDone(data)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            // amountLimit={totalSavings ?? 0}
          />
        }

        {/* modal for tooltip */}
        <Modals.tooltipModal
          isVisible={toolTipModal}
          toggleModal={() => setToolTipModal(!toolTipModal)}
          Title={Translate('OnBoardingScreen.modalTitle')}
          onPressSkip={() => onPressSkip()}
          onPresssNext={() => onPresssNext()}
        />
      </GestureHandlerRootView>
    </Wrappers.Wrapper>

  );
};

export default MyBudget;
