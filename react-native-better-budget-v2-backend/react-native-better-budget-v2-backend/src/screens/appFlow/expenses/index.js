import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Buttons, Headers, Modals, Spacers, StaticComponents, Wrappers } from '../../../components';
import { DebtsHeader, ExpenseHeader } from '../../../components/staticComponents';
import { ShowDebts } from '../../../screenComponents/showDebts';
import { SwipableListButton } from '../../../screenComponents/showExpenses';
import { colors, routes, selectedCurrencySymbol } from '../../../services';
import { convert_numbers, getDisabledDates } from '../../../services/utils/helperFunctions';
import moment from 'moment';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Budget } from '../../../Redux/actions/App';
import { saveData, updateArrayObjectKey } from '../../../services/utils/utility';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { calculateNearestDateIndex } from '../../../services/functions';

const Expenses = ({ navigation, route }) => {



  const fromCreate = route?.params?.fromCreate ?? false

  useLayoutEffect(() => {
    const showBottomTab = false
    navigation.setOptions({ tabBarStyle: { display: fromCreate ? "none" : "flex" } });
  }, [navigation, fromCreate]);

  const dispatch = useDispatch()
  const focused = useIsFocused()

  // redux data
  let redux_user = useSelector(state => state?.Auth?.user)
  let redux_myBudget = useSelector(state => state?.App?.userBudget)
  let redux_allBudget = useSelector(state => state?.App?.allBudget)

  // useStates
  const [myBudget, setMyBudget] = useState(redux_myBudget ?? []);
  const [user, setUser] = useState(redux_user ?? []);
  const [allExpenses, setAllExpenses] = useState(fromCreate ? redux_myBudget.Expenses ?? [] : []);
  const [allDebts, setAllDebts] = useState(fromCreate ? redux_myBudget?.Debts ?? [] : []);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [selectedDebts, setSelectedDebts] = useState([]);
  const [editExpenses, setEditExpenses] = useState(false);
  const [editDebts, setEditDebts] = useState(false);
  const [editExpenseAmount, setEditExpenseAmount] = useState(editExpenseData?.expenseAmount ?? '');
  const [editExpenseFrequency, setEditExpenseFrequency] = useState(editExpenseData?.expenseFrequency ?? '');
  const [editFirstExpenseDate, setFirstEditExpenseDate] = useState(editExpenseData?.firstBillDue ?? '');
  const [editExpenseDate, setEditExpenseDate] = useState(editExpenseData?.nextBillDue ?? '');
  const [editExpenseType, setEditExpenseType] = useState(editExpenseData?.expenseType ?? '');
  const [editExpenseName, setEditExpenseName] = useState(editExpenseData?.userExpenseName ?? '');
  const [editExpenseData, setEditExpenseData] = useState({});
  const [editDebtData, setEditDebtData] = useState({})
  const [editDebtName, setEditDebtName] = useState('')
  const [editDebtAmount, setEditDebtAmount] = useState(0)
  const [markedDates, setMarkedDates] = useState({})
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
  const [currentlyOpenDebtIndex, setCurrentlyOpenDebtIndex] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})

  // modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editDebtModal, setEditDebtModal] = useState(false)
  const [addModal, setAddModal] = useState(false);
  const [isModalDateVisible, setModalDateVisible] = useState(false);

  //All useEffects
  // useEffect for edit expense data
  useEffect(() => {
    setEditExpenseFrequency(editExpenseData?.expenseFrequency ?? '')
    setEditExpenseDate(editExpenseData?.nextBillDue ?? '')
    setFirstEditExpenseDate(editExpenseData?.firstBillDue)
    setEditExpenseType(editExpenseData?.expenseType ?? '')
    setEditExpenseName(editExpenseData?.userExpenseName ?? '')
  }, [editExpenseData])

  useEffect(() => {
    if (!fromCreate) {
      const index = calculateNearestDateIndex(redux_myBudget)
      setCurrentIndex(index)
      setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})
    }
  }, [redux_myBudget, fromCreate])

  // for semi-monthly dates
  useEffect(() => {
    if (editExpenseFrequency == 'Semi-Monthly') {
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
  }, [editExpenseData])

  // set budget data
  useEffect(() => {
    setMyBudget(redux_myBudget ?? [])
    const index = calculateNearestDateIndex(redux_myBudget)
    setCurrentIndex(index)
    setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})

  }, [redux_myBudget, focused])

  useEffect(() => {

    if (!fromCreate) {
      setAllDebts(selectedBudgetDate.debts_dates)
      setAllExpenses(redux_myBudget?.Expenses ?? [])
    }
    if (fromCreate) {
      setAllDebts(redux_myBudget?.Debts ?? [])
      setAllExpenses(redux_myBudget?.Expenses ?? [])
    }
  }, [selectedBudgetDate, focused, fromCreate])

  // set user data
  useEffect(() => {
    setUser(redux_user ?? [])
  }, [redux_user])


  //All Functions
  // select date function

  const onSetFirstDate = _date => {
    setFirstEditExpenseDate(_date?.dateString);
    setModalDateVisible(!isModalDateVisible);
  };
  const onSetSecondDate = _date => {
    setEditExpenseDate(moment(_date?.dateString).format('MM/DD/YYYY'));
    setModalDateVisible(!isModalDateVisible);
    setTimeout(() => {
      setEditModal(true)
    }, 1000);

  };

  // when user press on text to add new expense or debt
  const onPressSimpleModalData = (item) => {
    setAddModal(!addModal)
    if (item == Translate('addDebt'))
      navigation.navigate(routes.addDebts, { screen: 'expenses' })
    else
      navigation.navigate(routes.addRecurringExpenses, { screen: 'expenses' })
  }

  // when press on 'edit' or 'done' text
  const onPressHeaderLeftText = () => {
    setSelectedExpenses([])
    setSelectedDebts([])
    setEditExpenses(!editExpenses)
    setEditDebts(!editDebts)
  }

  // render flatlist for expenses
  const showExpenses = ({ item, index }) => {
    return (
      <SwipableListButton
        user={user}
        index={editExpenses ? '' : index}
        currentlyOpenIndex={currentlyOpenIndex}
        setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(editExpenses ? '' : index)}
        ExpenseName={item?.userExpenseName}
        ExpenseFrequency={item?.expenseFrequency}
        ExpenseDate={item?.nextBillDue}
        ExpenseAmount={convert_numbers(item?.expenseAmount)}
        Currency={myBudget?.currency}
        editButton={editExpenses}
        checked={selectedExpenses.includes(index) === true ? true : false}
        onValueChange={() => onClickExpenses(index)}
        onPress={() => {
          setEditModal(!editModal)
          setEditExpenseData(item)
          setEditExpenseAmount(item?.expenseAmount)
          setEditExpenseFrequency(item?.expenseFrequency)
          setEditExpenseDate(item?.nextBillDue)
          setEditExpenseType(item?.expenseType)
          setEditExpenseName(item?.userExpenseName)
        }}
        onPressDelete={() => {
          // console.log('delete')
          setSelectedExpenses([index])
          setDeleteModal(!deleteModal)
        }}
      />
    )
  }

  // render flatlist for debts
  const showDebts = ({ item, drag, isActive, getIndex }) => {
    const index = getIndex()
    return (
      <ScaleDecorator>
        <ShowDebts
          user={user}
          index={editDebts ? '' : index}
          currentlyOpenIndex={currentlyOpenDebtIndex}
          setCurrentlyOpenIndex={() => setCurrentlyOpenDebtIndex(editDebts ? '' : index)}
          DebtsName={item?.debtName}
          DebtsAmount={convert_numbers(item?.debtAmount)}
          Currency={myBudget?.currency}
          Drag={drag}
          editButton={editDebts}
          checked={selectedDebts.includes(index) === true ? true : false}
          onValueChange={() => onClickDebts(index)}
          onPress={() => {
            setEditDebtModal(!editDebtModal)
            setEditDebtData(item)
            setEditDebtName(item?.debtName)
            setEditDebtAmount(item?.debtAmount)
          }}
          onPressDelete={() => {
            setSelectedDebts([index])
            setDeleteModal(!deleteModal)
          }}
        />
      </ScaleDecorator>
    )
  }

  // selected expenses list
  const onClickExpenses = id => {
    if (selectedExpenses.includes(id) === true) {
      const updatedArr = selectedExpenses?.filter(e => e !== id);
      setSelectedExpenses(updatedArr);
    } else {
      var array1 = [...selectedExpenses, id];
      setSelectedExpenses(array1);
    }
  };

  // selected debts list
  const onClickDebts = id => {
    if (selectedDebts.includes(id) === true) {
      const updatedArr = selectedDebts?.filter(e => e !== id);
      setSelectedDebts(updatedArr);
    } else {
      var array1 = [...selectedDebts, id];
      setSelectedDebts(array1);
    }
  };

  // when press on 'delete' text
  const onPressDelete = () => {
    if (selectedDebts?.length > 0 && selectedExpenses?.length > 0) {
      deleteExpense()
      deleteDebts()
      setEditExpenses(false)
      setEditDebts(false)
    } else if (selectedDebts?.length > 0 && selectedExpenses?.length == 0) {
      deleteDebts()
      setEditDebts(false)
    } else {
      deleteExpense()
      setEditExpenses(false)
    }

  }

  // Expenses delete Function
  const deleteExpense = () => {

    const budgetExpenses = myBudget.budgetDates[currentIndex].expenses ?? []

    const filteredExpenses = allExpenses?.filter(
      (item, index) => !selectedExpenses.includes(index),
    );

    const filteredBudgetExpenses = budgetExpenses?.filter(
      (item, index) => !selectedExpenses.includes(index),
    );
    setAllExpenses(filteredExpenses);
    myBudget.budgetDates[currentIndex].expenses = filteredBudgetExpenses
    myBudget.Expenses = filteredExpenses
    var local_budget = { ...selectedBudgetDate }
    local_budget.expenses = filteredBudgetExpenses
    setSelectedBudgetDate(local_budget)
    dispatch(Budget(myBudget))
    saveData("Budgets", myBudget?._id, { Expenses: filteredExpenses })
    updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'expenses', filteredExpenses)
    setSelectedExpenses([])
  }

  // Debts delete Function
  const deleteDebts = () => {
    const filteredDebts = allDebts?.filter(
      (item, index) => !selectedDebts.includes(index),
    );
    setAllDebts(filteredDebts);
    myBudget.budgetDates[currentIndex].debts_dates = filteredDebts
    var local_budget = { ...selectedBudgetDate }
    local_budget.debts_dates = filteredDebts
    setSelectedBudgetDate(local_budget)
    dispatch(Budget(myBudget))
    updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'debts_dates', filteredDebts)
    setSelectedDebts([])
  }

  // when user edit the expense amount
  const editExpense = (selectedId) => {
    
    allExpenses?.map(item => {
      if (item?.id === selectedId?.id) {
        item.expenseAmount = selectedId?.expenseAmount
        item.expenseFrequency = editExpenseFrequency
        item.firstBillDue = editFirstExpenseDate
        item.nextBillDue = editExpenseDate
        item.expenseType = editExpenseType
        item.userExpenseName = editExpenseName

        setEditExpenseAmount(selectedId?.expenseAmount)
      }
    })

    let budgetExpenses = myBudget.budgetDates[currentIndex].expenses ?? []

    budgetExpenses?.map(item => {
      if (item?.id === selectedId?.id) {
        item.expenseAmount = selectedId?.expenseAmount
        item.expenseFrequency = editExpenseFrequency
        item.firstBillDue = editFirstExpenseDate
        item.nextBillDue = editExpenseDate
        item.expenseType = editExpenseType
        item.userExpenseName = editExpenseName

        setEditExpenseAmount(selectedId?.expenseAmount)
      }
    })


    console.log('budgetExpenses', budgetExpenses)
    

    setAllExpenses(allExpenses);
    myBudget.budgetDates[currentIndex].expenses = budgetExpenses
    var local_budget = { ...selectedBudgetDate }
    local_budget.expenses = budgetExpenses
    setSelectedBudgetDate(local_budget)
    dispatch(Budget(myBudget))
    saveData("Budgets", myBudget?._id, {Expenses:allExpenses})
    updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'expenses', budgetExpenses)
    setSelectedExpenses([])
    setEditModal(!editModal)
  }

  const editDebt = (selectedId) => {
    allDebts?.map(item => {
      if (item?.id === selectedId?.id) {
        item.debtAmount = selectedId?.debtAmount

        setEditDebtAmount(selectedId?.debtAmount)
      }
    })

    setAllDebts(allDebts);
    myBudget.budgetDates[currentIndex].debts_dates = allDebts
    var local_budget = { ...selectedBudgetDate }
    local_budget.debts_dates = allDebts
    setSelectedBudgetDate(local_budget)
    dispatch(Budget(myBudget))
    updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'debts_dates', allDebts)
    setSelectedDebts([])
    setEditDebtModal(!editDebtModal)
  }

  const onPressDate = () => {
    setEditModal(false)
    setTimeout(() => {
      setModalDateVisible(!isModalDateVisible)
    }, 500);
  }

  const onDragEnd = ({ data, from, to }) => {
    setAllDebts(data);
    // myBudget.Debts = data;
    // myBudget.budgetDates = []
    // dispatch(Budget(myBudget))
    // saveData('Budgets', myBudget?._id, { Debts: data, budgetDates: [] })
  }

  const onPressFinish = () => {
    navigation.replace(routes.app)
  }


  return (
    <Wrappers.Wrapper style={styles.main}>
      <GestureHandlerRootView>
        {redux_allBudget?.length == 0 ?
          <Headers.EmptyViewHeader
            title={Translate('Expenses')}
            // onPressProfileIcon={() => navigation.navigate(routes.setting)}
            user={user}
          />
          :
          <Headers.ExpenseHeader
            title={Translate('Expenses')}
            leftTitle={editExpenses ? Translate('Done') : Translate('Edit')}
            rightTitle={editExpenses ? Translate('Delete') : <Icon name='plus' type='feather' />}
            onPressLeftText={() => onPressHeaderLeftText()}
            onPressRightText={() => {
              if (editExpenses) {
                if (selectedDebts?.length > 0 || selectedExpenses?.length > 0) {
                  setDeleteModal(!deleteModal)
                }
              }
              else {
                setAddModal(!addModal)
              }
            }}
            tooltipStatus={false}
            user={user}
            rightTitleStyles={{ color: selectedDebts?.length > 0 || selectedExpenses?.length > 0 ? colors.red : colors.gray }}
          />
        }

        {redux_allBudget?.length == 0 ?
          <StaticComponents.EmptyView
            expenseSource
            onPressButton={() => navigation.navigate(routes.createBudget)}
            Text={Translate('ExpenseScreen.emptyViewText')}
          />
          :
          <ScrollView>

            <Spacers.Small />
            <Wrappers.Wrapper>
              {allExpenses?.length > 0 &&
                <ExpenseHeader />
              }
              <FlatList
                data={allExpenses}
                renderItem={showExpenses}
                keyExtractor={item => item.id}
              />

              <Spacers.DoubleBase />
              {allDebts?.length > 0 &&
                <DebtsHeader />
              }
              {/* <FlatList
              data={allDebts}
              renderItem={showDebts}
              keyExtractor={item => item.id}
            /> */}

              <DraggableFlatList
                data={allDebts ?? []}
                renderItem={showDebts}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
                onDragEnd={onDragEnd}
              />

            </Wrappers.Wrapper>
          </ScrollView>
        }



        <Modals.DeleteModal
          isVisible={deleteModal}
          toggleModal={() => setDeleteModal(!deleteModal)}
          onChangeVisibility={() => setDeleteModal(!deleteModal)}
          Title={Translate('deleteModalTitle')}
          onPresssDelete={() => {
            onPressDelete()
            setDeleteModal(!deleteModal)
          }}
          onPressCancel={() => setDeleteModal(!deleteModal)}
        />

        {editModal &&
          <Modals.EditExpenseModal
            isVisible={editModal}
            toggleModal={() => { setEditModal(!editModal) }}
            Title={Translate('editExpense')}
            onPressDate={onPressDate}
            expenseAmount={editExpenseData?.expenseAmount}
            placeholder={editExpenseData?.expenseAmount}
            onPressDone={(data) => editExpense(data)}
            selectedExpenseData={editExpenseData}
            setEditExpenseFrequency={(freq) => setEditExpenseFrequency(freq)}
            setEditExpenseDate={setEditExpenseDate}
            setEditExpenseType={setEditExpenseType}
            setEditExpenseName={setEditExpenseName}
            // editExpenseAmount={editExpenseAmount}
            editExpenseName={editExpenseName}
            editExpenseFrequency={editExpenseFrequency}
            editExpenseDate={editExpenseDate}
            editExpenseType={editExpenseType}
            Currency={myBudget?.currency}
          />
        }

        {editDebtModal &&

          <Modals.EditDebtModal
            isVisible={editDebtModal}
            toggleModal={() => { setEditDebtModal(!editDebtModal) }}
            // Title={Translate('editDebt')}
            Title={editDebtName}
            debtAmount={editDebtData?.debtAmount}
            placeholder={editDebtData?.debtAmount}
            onPressDone={(data) => editDebt(data)}
            selectedDebtData={editDebtData}
            setEditDebtAmount={setEditDebtAmount}
            setEditDebtName={setEditDebtName}
            editDebtAmount={editDebtAmount}
            editDebtName={editDebtName}
            Currency={myBudget?.currency}
          />

        }

        <Modals.CalendarModal
          isVisible={isModalDateVisible}
          toggleModal={() => setModalDateVisible(!isModalDateVisible)}
          onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
          Title={Translate('nextPayDate')}
          budgetType={editExpenseFrequency}
          selectValue={_date => onSetSecondDate(_date)}
          markedDates={markedDates}
          calculateDisabledDates={date => {
            const year = date.year;
            const month = date.month;
            if (editExpenseFrequency == 'Semi-Monthly') {
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

        <Modals.SimpleModal
          isVisible={addModal}
          toggleModal={() => setAddModal(!addModal)}
          onChangeVisibility={() => setAddModal(!addModal)}
          Title={Translate('Add')}
          data={[Translate('recurringExpense'), Translate('addDebt')]}
          onPressItem={(item) => onPressSimpleModalData(item)}
          textColor={colors.button}
        />
      </GestureHandlerRootView>

      {fromCreate &&
        <Wrappers.Component style={styles.absoluteText}>
          <Buttons.ButtonColored
            text={Translate('ShowBudgetDetailScreen.Finish')}
            buttonColor={colors.textColor}
            tintColor={colors.white}
            onPress={() => onPressFinish()}
          />
        </Wrappers.Component>
      }
    </Wrappers.Wrapper>
  );
};

export default Expenses;
