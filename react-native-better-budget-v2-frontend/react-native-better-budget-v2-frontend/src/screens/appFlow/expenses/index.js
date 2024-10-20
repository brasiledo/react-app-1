import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, Modals, Spacers, StaticComponents, Wrappers } from '../../../components';
import { DebtsHeader, ExpenseHeader } from '../../../components/staticComponents';
import { ShowDebts } from '../../../screenComponents/showDebts';
import { SwipableListButton } from '../../../screenComponents/showExpenses';
import { routes } from '../../../services';
import { dummyDebts, dummyExpenses } from '../../../services/dummyData';
import { getDisabledDates } from '../../../services/utils/helperFunctions';
import moment from 'moment';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';

const Expenses = ({ navigation, route }) => {

  // useStates
  const [allExpenses, setAllExpenses] = useState(dummyExpenses ?? []);
  const [allDebts, setAllDebts] = useState(dummyDebts ?? []);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [selectedDebts, setSelectedDebts] = useState([]);
  const [editExpenses, setEditExpenses] = useState(false);
  const [editExpenseAmount, setEditExpenseAmount] = useState('');
  const [editExpenseFrequency, setEditExpenseFrequency] = useState(editExpenseData?.ExpenseFrequency ?? '');
  const [editExpenseDate, setEditExpenseDate] = useState(editExpenseData?.ExpenseDate ?? '');
  const [editExpenseData, setEditExpenseData] = useState({});
  const [markedDates, setMarkedDates] = useState({})
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
  // modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [isModalDateVisible, setModalDateVisible] = useState(false);

  //All useEffects
  // useEffect for edit expense data
  useEffect(() => {
    setEditExpenseFrequency(editExpenseData?.ExpenseFrequency ?? '')
    setEditExpenseDate(editExpenseData?.ExpenseDate ?? '')
  }, [editExpenseData])

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


  //All Functions
  // select date function
  const onSetDate = _date => {
    setEditExpenseDate(_date);
    setModalDateVisible(!isModalDateVisible);
  };

  // when user press on text to add new expense or debt
  const onPressSimpleModalData = (item) => {
    if (item == Translate('Debt'))
      navigation.navigate(routes.addDebts, { screen: 'expenses' })
    else
      navigation.navigate(routes.addRecurringExpenses, { screen: 'expenses' })
  }

  // when press on 'edit' or 'done' text
  const onPressHeaderLeftText = () => {
    setSelectedExpenses([])
    setSelectedDebts([])
    setEditExpenses(!editExpenses)
  }

  // render flatlist for expenses
  const showExpenses = ({ item, index }) => {
    return (
      <SwipableListButton
        index={editExpenses ? '' : index}
        currentlyOpenIndex={currentlyOpenIndex}
        setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(editExpenses ? '' : index)}
        ExpenseName={item?.ExpenseName}
        ExpenseFrequency={item?.ExpenseFrequency}
        ExpenseDate={item?.ExpenseDate}
        ExpenseAmount={item?.ExpenseAmount}
        editButton={editExpenses}
        checked={selectedExpenses.includes(index) === true ? true : false}
        onValueChange={() => onClickExpenses(index)}
        onPress={() => {
          setEditModal(!editModal)
          setEditExpenseData(item)
          setEditExpenseAmount(item?.ExpenseAmount)
        }}
      />
    )
  }

  // render flatlist for debts
  const showDebts = ({ item, index }) => {
    return (
      <ShowDebts
        DebtsName={item?.DebtName}
        DebtsAmount={item?.DebtAmount}
        editButton={editExpenses}
        checked={selectedDebts.includes(index) === true ? true : false}
        onValueChange={() => onClickDebts(index)}
      />
    )
  }

  // selected expenses list
  const onClickExpenses = id => {
    if (selectedExpenses.includes(id) === true) {
      const updatedArr = selectedExpenses.filter(e => e !== id);
      setSelectedExpenses(updatedArr);
    } else {
      var array1 = [...selectedExpenses, id];
      setSelectedExpenses(array1);
    }
  };

  // selected debts list
  const onClickDebts = id => {
    if (selectedDebts.includes(id) === true) {
      const updatedArr = selectedDebts.filter(e => e !== id);
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
    } else if (selectedDebts?.length > 0 && selectedExpenses?.length == 0) {
      deleteDebts()
    } else {
      deleteExpense()
    }
    setEditExpenses(!editExpenses)
  }

  // Expenses delete Function
  const deleteExpense = () => {
    const filteredExpenses = allExpenses?.filter(
      (item, index) => !selectedExpenses.includes(index),
    );
    setAllExpenses(filteredExpenses);
    setSelectedExpenses([])
  }

  // dEBTS delete Function
  const deleteDebts = () => {
    const filteredDebts = allDebts?.filter(
      (item, index) => !selectedDebts.includes(index),
    );
    setAllDebts(filteredDebts);
    setSelectedDebts([])
  }

  // when user edit the expense amount
  const editExpense = (selectedId) => {
    let filteredArray = allExpenses?.filter(item => {
      if (item?.id === selectedId) {
        item.ExpenseAmount = editExpenseAmount
        item.ExpenseFrequency = editExpenseFrequency
        item.ExpenseDate = editExpenseDate
      }
    })
  }

  return (
    <Wrappers.Wrapper style={styles.main}>
      {allDebts?.length == 0 && allExpenses?.length == 0 ?
        <Headers.EmptyViewHeader
          title={Translate('Expenses')}
          onPressProfileIcon={() => navigation.navigate(routes.setting)}
        />
        :
        <Headers.Main
          title={Translate('Expenses')}
          leftTitle={editExpenses ? Translate('Done') : Translate('Edit')}
          rightTitle={editExpenses ? Translate('Delete') : <Icon name='plus' type='feather' />}
          onPressLeftText={() => onPressHeaderLeftText()}
          onPressRightText={() => { editExpenses ? setDeleteModal(!deleteModal) : setAddModal(!addModal) }}
        />
      }

      {allDebts?.length == 0 && allExpenses?.length == 0 ?
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
            <FlatList
              data={allDebts}
              renderItem={showDebts}
              keyExtractor={item => item.id}
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

      <Modals.EditExpenseModal
        isVisible={editModal}
        Title={Translate('editExpense')}
        // value={editExpenseAmount}
        onPressExpenseData={editExpenseData}
        // onChangeText={(eea) => setEditExpenseAmount(eea)}
        setEditExpenseFrequency={(freq) => setEditExpenseFrequency(freq)}
        editExpenseFrequency={editExpenseFrequency}
        billDue={editExpenseDate}
        onPressDate={() => setModalDateVisible(!isModalDateVisible)}
        expenseAmount={editExpenseData?.ExpenseAmount}
        onPressDone={() => setEditModal(!editModal)}
      />

      <Modals.CalendarModal
        isVisible={isModalDateVisible}
        toggleModal={() => setModalDateVisible(!isModalDateVisible)}
        onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
        Title={Translate('nextPayDate')}
        budgetType={editExpenseFrequency}
        selectValue={_date => onSetDate(_date)}
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
        data={[Translate('recurringExpense'), Translate('Debt')]}
        onPressItem={(item) => onPressSimpleModalData(item)}
      />

    </Wrappers.Wrapper>
  );
};

export default Expenses;
