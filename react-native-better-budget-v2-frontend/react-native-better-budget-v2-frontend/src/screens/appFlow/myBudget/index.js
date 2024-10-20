import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Headers, Modals, ScrollViews, Spacers, StaticComponents, Texts, Wrappers } from '../../../components';
import { expenseImage, routes } from '../../../services';
import { styles } from './styles';
import PayDateArrows from '../../../screenComponents/payDateArrows';
import moment from 'moment';
import { CarryOverView, IncomeView, NotificationView, SaveAmountView, TotalAmountView } from '../../../screenComponents/homeScreenComponents';
import { SwipableListHomeExpense } from '../../../screenComponents/homeScreenExpenses';
import { DebtsHeaderHome, ExpenseHeaderHome } from '../../../components/staticComponents';
import { ToolTiopsText, dummyDebts, dummyExpenses } from '../../../services/dummyData';
import { ShowHomeDebts } from '../../../screenComponents/homeScreenDebts';
import Translate from '../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { useSelector } from 'react-redux';

const MyBudget = ({ navigation }) => {
  const ref = useRef()

  // redux Data
  let _allBudget = useSelector(state => state?.App?.allBudget)
  let _myBudget = useSelector(state => state?.App?.userBudget)

  // useStates
  const [allBudget, setAllBudget] = useState(_allBudget ?? []);
  const [myBudget, setMyBudget] = useState(_myBudget ?? []);
  const [allExpenses, setAllExpenses] = useState(_myBudget?.Expenses ?? []);
  const [allDebts, setAllDebts] = useState(_myBudget?.Debts ?? []);
  const [currentIncome, setCurrentIncome] = useState('200');
  const [budgetName, setBudgetName] = useState(_myBudget?.budgetName ?? '');
  const [budgetNames, setBudgetNames] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [oneTimeExpenseAmount, setOneTimeExpenseAmount] = useState('');
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [additionalIncomeName, setAdditionalIncomeName] = useState('');
  const [editExpenseAmount, setEditExpenseAmount] = useState('');
  const [editDebtAmount, setEditDebtAmount] = useState('');
  const [editCarryOverAmount, setEditCarryOverAmount] = useState('');
  const [editSaveAmount, setEditSaveAmount] = useState('');
  const [notification, setNotification] = useState(true);
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
  // Modals
  const [threeDotModal, setThreeDotModal] = useState(false);
  const [budgetsModal, setBudgetsModal] = useState(false);
  const [editCurrentIncomeModal, setEditCurrentIncomeModal] = useState(false);
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

  // All useEffects
  // set budget values
  useEffect(() => {
    setAllBudget(_allBudget)
    setMyBudget(_myBudget)
    setBudgetName(_myBudget?.budgetName)
    setAllExpenses(_myBudget?.Expenses)
    setAllDebts(_myBudget?.Debts)

    // get all budget names
    let newArray = []
    let budget = _allBudget?.filter((item) => {
      newArray.push(item?.budgetName)
    })
    setBudgetNames(newArray)

  }, [_myBudget, _allBudget])

  //All Functions
  // render flatlist for expenses
  const showExpenses = ({ item, index }) => {
    return (
      <SwipableListHomeExpense
        index={index}
        currentlyOpenIndex={currentlyOpenIndex}
        setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(index)}
        ExpenseName={item?.expenseName}
        ExpenseDate={item?.expenseDate}
        ExpenseAmount={item?.expenseAmount}
        onPressEdit={() => setEditExpenseModal(!editExpenseModal)}
        onPress={() => { }}
      />
    )
  }

  // render flatlist for debts
  const showDebts = ({ item, index }) => {
    return (
      <ShowHomeDebts
        DebtsName={item?.debtName}
        DebtsPayment={'$ 0'}
        TotalDebts={item?.debtAmount}
        onPressEdit={() => setEditDebtsModal(!editDebtsModal)}
      />
    )
  }

  // When user open three dot menu to select items
  const onPressThreeDotItemData = (item) => {
    if (item == Translate('MyBudgetScreen.editCurrentIncome')) {
      setThreeDotModal(!threeDotModal)
      setEditCurrentIncomeModal(!editCurrentIncomeModal)
    } else {
      setThreeDotModal(!threeDotModal)
      navigation.navigate(routes.editBudget)
    }
  }

  // When user open three dot menu to select items
  const onPressAddIcon = (item) => {
    if (item == Translate('MyBudgetScreen.oneTimeExpense')) {
      setAddIconModal(!addIconModal)
      setOneTimeExpenseModal(!oneTimeExpenseModal)
    } else if (item == Translate('MyBudgetScreen.additionalIncome')) {
      setAddIconModal(!addIconModal)
      setAdditionalIncomeModal(!additionalIncomeModal)
    } else {
      navigation.navigate(routes.showBudgetDetail)
      // navigation.navigate(routes.createBudget)
      setAddIconModal(!addIconModal)
    }
  }

  // When user select another budget
  const onPressBudgets = (item) => {
    setBudgetName(item?.budgetName)
    setMyBudget(item)
    setBudgetsModal(!budgetsModal)
  }

  // if user want to add one time expense from modal
  const onSelectExpense = (expense) => {
    setExpenseName(expense)
    setExpensesCategoriesModal(!expensesCategoriesModal)
    setOneTimeExpenseModal(!oneTimeExpenseModal)
  }

  // if user want to add one time expense from modal
  const onPressAdditionalIncomeitems = (source) => {
    setAdditionalIncomeName(source)
    setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
    setAdditionalIncomeModal(!additionalIncomeModal)
  }

  return (
    <Wrappers.Wrapper style={styles.main}>
      {/* <Headers.Primary logoSource onPressProfileIcon={() => navigation.navigate(routes.setting)} /> */}
      <Headers.MyBudgetHeader
        title={budgetName}
        onPressLeftIcon={() => setThreeDotModal(!threeDotModal)}
        onPressBudget={() => setBudgetsModal(!budgetsModal)}
        onPressPlusIcon={() => setAddIconModal(!addIconModal)}
        onPressProfileIcon={() => navigation.navigate(routes.setting)}
      />

      {/* <StaticComponents.EmptyView
        expenseSource
        onPressButton={() => props.navigation.navigate(routes.createBudget)}
        Text={Translate('MyBudgetScreen.emptyViewText')}
      /> */}

      <ScrollViews.KeyboardAvoiding>
        <Spacers.Small />
        <Wrappers.Component>
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

          <Spacers.Small />
          <SaveAmountView saveAmount={'$500'} totalSaving={'$1,000'} />
          <Spacers.Small />

          {/* <CopilotStep text={ToolTiopsText.text1} order={0} name="currency">
            <CopilotView> */}
          <Wrappers.Component>
            <PayDateArrows
              // onPressLeft={() => onPressBackArrow()}
              // disabled={currentIndex == 0 ? true : false}
              // leftContainerStyle={{
              //   backgroundColor:
              //     currentIndex == 0 ? Colors.gray : Colors.Brazilian_Green,
              // }}
              // onPressRight={() => onPressNextArrow()}
              title={Translate('MyBudgetScreen.payDate')}
              value={moment().format('LL')}
            />
          </Wrappers.Component>

          {/* </CopilotView>
          </CopilotStep> */}
        </Wrappers.Component>

        <Spacers.Base />
        <IncomeView income={Translate('OnBoardingScreen.onBoardingTitle2')} incomeAmount={'$ 2,000'} />

        <Spacers.Small />
        <Wrappers.Wrapper>
          <ExpenseHeaderHome />
          <FlatList
            data={myBudget?.Expenses}
            renderItem={showExpenses}
            keyExtractor={item => item.id}
          />
        </Wrappers.Wrapper>

        <Spacers.Base />
        <Wrappers.Wrapper>
          {myBudget?.Debts?.length > 0 &&
            <DebtsHeaderHome />
          }
          <FlatList
            data={myBudget?.Debts}
            renderItem={showDebts}
            keyExtractor={item => item.id}
          />
        </Wrappers.Wrapper>

        <Spacers.Base />
        <Wrappers.Component>
          <TotalAmountView text={Translate('MyBudgetScreen.totalPayments')} totalAmount={'$ 1,100'} />
          <Spacers.Small />

          <Wrappers.Wrapper>
            <Wrappers.Wrapper style={styles.carryOverView}>
              <CarryOverView text={Translate('MyBudgetScreen.carryOver')} saveAmount={'$ 20'} onPressEdit={() => setEditCarryOverModal(!editCarryOverModal)} />
              <CarryOverView text={Translate('MyBudgetScreen.Save')} saveAmount={'$ 0'} onPressEdit={() => setEditSaveAmountModal(!editSaveAmountModal)} />
            </Wrappers.Wrapper>
          </Wrappers.Wrapper>

          <Spacers.Small />
          <TotalAmountView text={Translate('MyBudgetScreen.totalRemaining')} totalAmount={'$ 100'} />
        </Wrappers.Component>
        <Spacers.Small />

      </ScrollViews.KeyboardAvoiding>

      {/* left three dot header */}
      <Modals.SimpleModal
        isVisible={threeDotModal}
        toggleModal={() => setThreeDotModal(!threeDotModal)}
        onChangeVisibility={() => setThreeDotModal(!threeDotModal)}
        data={[Translate('MyBudgetScreen.editCurrentIncome'), Translate('MyBudgetScreen.editBudget')]}
        onPressItem={(item) => onPressThreeDotItemData(item)}
      />

      {/* Select budgets header */}
      <Modals.SimpleModal
        isVisible={budgetsModal}
        toggleModal={() => setBudgetsModal(!budgetsModal)}
        onChangeVisibility={() => setBudgetsModal(!budgetsModal)}
        data={allBudget}
        onPressItem={(item) => onPressBudgets(item)}
        textColor={budgetName}
        onPressDeleteIcon={() => {
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
          setExpensesCategoriesModal(!expensesCategoriesModal)
          setOneTimeExpenseModal(!oneTimeExpenseModal)
        }}
        insideIconName={expenseImage(expenseName) == null ? 'list-circle-outline' : ''}
        expenseImage={expenseImage(expenseName)}
        additionalIncome={oneTimeExpenseAmount}
        onPressDone={() => setOneTimeExpenseModal(!oneTimeExpenseModal)}
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
          setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)
        }}
        additionalIncome={additionalIncome}
        onPressDone={() => setAdditionalIncomeModal(!additionalIncomeModal)}
      />

      {/* Add source from Add additional income */}
      <Modals.SimpleModal
        isVisible={additionalIncomeSourceModal}
        toggleModal={() => setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)}
        onChangeVisibility={() => setAdditionalIncomeSourceModal(!additionalIncomeSourceModal)}
        data={['Dan’s Paycheck • $1,200 • 12/27/22', Translate('MyBudgetScreen.transferSavings'), Translate('MyBudgetScreen.Other')]}
        onPressItem={(item) => onPressAdditionalIncomeitems(item)}
      />

      {/* Add expense from Add one time expense  */}
      <Modals.ExpensesCategoriesModal
        isVisible={expensesCategoriesModal}
        toggleModal={() => setExpensesCategoriesModal(!expensesCategoriesModal)}
        Title={Translate('selectCategory')}
        ref={ref}
        setExpenseName={(expense) => onSelectExpense(expense)}
      />

      {/* edit curent income from three dot header */}
      <Modals.EditModal
        isVisible={editCurrentIncomeModal}
        toggleModal={() => setEditCurrentIncomeModal(!editCurrentIncomeModal)}
        onChangeVisibility={() => setEditCurrentIncomeModal(!editCurrentIncomeModal)}
        Title={Translate('MyBudgetScreen.editCurrentIncome')}
        // onPressExpenseData={editExpenseData}
        expenseAmount={currentIncome}
        onPressDone={() => setEditCurrentIncomeModal(!editCurrentIncomeModal)}
      />

      {/* delete from select expense header */}
      <Modals.DeleteModal
        isVisible={deleteThreeDotModal}
        toggleModal={() => setDeleteThreeDotModal(!deleteThreeDotModal)}
        onChangeVisibility={() => setDeleteThreeDotModal(!deleteThreeDotModal)}
        Title={Translate('MyBudgetScreen.deleteModalText')}
        onPresssDelete={() => {
          // onPressDeleteBudget()
          setDeleteThreeDotModal(!deleteThreeDotModal)
          // setBudgetsModal(!budgetsModal)
        }}
        onPressCancel={() => {
          setDeleteThreeDotModal(!deleteThreeDotModal)
          // setBudgetsModal(!budgetsModal)
        }}
      />

      {/* Edit Modal for expenses */}
      <Modals.EditModal
        isVisible={editExpenseModal}
        toggleModal={() => setEditExpenseModal(!editExpenseModal)}
        onChangeVisibility={() => setEditExpenseModal(!editExpenseModal)}
        Title={`${Translate('MyBudgetScreen.editAmountFor')} Mortage/Rent`}
        // onPressExpenseData={editExpenseData}
        expenseAmount={editExpenseAmount}
        onPressDone={() => setEditExpenseModal(!editExpenseModal)}
        skip
        onPressSkip={() => setEditExpenseModal(!editExpenseModal)}
      />

      {/* Edit Modal for debts */}
      <Modals.EditModal
        isVisible={editDebtsModal}
        toggleModal={() => setEditDebtsModal(!editDebtsModal)}
        onChangeVisibility={() => setEditDebtsModal(!editDebtsModal)}
        Title={`${Translate('MyBudgetScreen.inputAmountFor')} Mortage/Rent`}
        // onPressExpenseData={editExpenseData}
        expenseAmount={editDebtAmount}
        onPressDone={() => setEditDebtsModal(!editDebtsModal)}
      />

      {/* Edit Modal for carryOver amount */}
      <Modals.EditModal
        isVisible={editCarryOverModal}
        toggleModal={() => setEditCarryOverModal(!editCarryOverModal)}
        onChangeVisibility={() => setEditCarryOverModal(!editCarryOverModal)}
        Title={Translate('MyBudgetScreen.inputCarryOver')}
        // onPressExpenseData={editExpenseData}
        expenseAmount={editCarryOverAmount}
        onPressDone={() => setEditCarryOverModal(!editCarryOverModal)}
      />

      {/* Edit Modal for save Amount */}
      <Modals.EditModal
        isVisible={editSaveAmountModal}
        toggleModal={() => setEditSaveAmountModal(!editSaveAmountModal)}
        onChangeVisibility={() => setEditSaveAmountModal(!editSaveAmountModal)}
        Title={Translate('MyBudgetScreen.inputSave')}
        // onPressExpenseData={editExpenseData}
        expenseAmount={editSaveAmount}
        onPressDone={() => setEditSaveAmountModal(!editSaveAmountModal)}
      />


      {/* Amount exceeds the $500 (variable for amount) remaining income (error for debts input modal) */}
    </Wrappers.Wrapper>
  );
};

export default MyBudget;
