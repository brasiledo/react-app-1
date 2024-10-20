import React, { useState, useRef, useEffect } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons, Headers, Modals, Spacers, TextInputs, Wrappers } from '../../../../components';
import { MultipleView } from '../../../../screenComponents/createBudget';
import { colors, expenseImage, routes, selectedCurrencySymbol } from '../../../../services';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../../../services/dummyData';
import { saveData, uniqueID, updateArrayObjectKey } from '../../../../services/utils/utility';
import { Budget } from '../../../../Redux/actions/App';
import moment from 'moment';
import { convert_numbers, remove_commas } from '../../../../services/utils/helperFunctions';
import { calculateNearestDateIndex } from '../../../../services/functions';
import { useIsFocused } from '@react-navigation/native';

const AddRecurringExpenses = ({ navigation, route }) => {
    const ref = useRef();
    const dispatch = useDispatch()

    // redux data
    let redux_user = useSelector(state => state?.Auth?.user)
    let redux_myBudget = useSelector(state => state?.App?.userBudget)


    // tooltips
    const CopilotView = walkthroughable(View);
    const { start, goToNth, currentStep } = useCopilot()

    // Previous Screen data
    let { item } = route?.params || {};
    let debtsMultiple = route?.params?.debtIncome || [];
    let debtsSingle = route?.params?.data || {};
    let { screen } = route?.params || ''


    // useStates
    const [user, setUser] = useState(redux_user ?? []);
    const [myBudget, setMyBudget] = useState(redux_myBudget ?? []);
    const [expenseType, setExpenseType] = useState('Fixed');
    const [expenseName, setExpenseName] = useState('');
    const [userExpenseName, setUserExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseFrequency, setExpenseFrequency] = useState('');
    const [firstBillDue, setFirstBillDue] = useState('');
    const [nextBillDue, setNextBillDue] = useState('');
    const [expenses, setExpenses] = useState([])
    const [isModalBottomVisible, setModalBottomVisible] = useState(false);
    const [isModalFirstDateVisible, setModalFirstDateVisible] = useState(false);
    const [isModalNextDateVisible, setModalNextDateVisible] = useState(false);
    const [isModalExpensesVisible, setModalExpensesVisible] = useState(false);
    const [isModalExpensesCategoriesVisible, setModalExpensesCategoriesVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(0);
    const [tooltipValue, setTooltipValue] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allExpenses, setAllExpenses] = useState(redux_myBudget?.Expenses ?? []);
    const [allDebts, setAllDebts] = useState(redux_myBudget?.Debts ?? []);

    const focused = useIsFocused()

    // set budget data
    useEffect(() => {
        setIsLoading(false)
        setMyBudget(redux_myBudget ?? [])
        const index = calculateNearestDateIndex(redux_myBudget)
        setCurrentIndex(index)
        setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})
        setAllDebts(redux_myBudget?.Debts ?? [])
    }, [redux_myBudget, focused])

    // useEffect(() => {
    //     if (Object.keys(selectedBudgetDate || {}).length != 0) {
    //         const expenses = selectedBudgetDate?.expenses
    //         setAllExpenses(expenses)
    //     }
    // }, [selectedBudgetDate])


    // timeout for tooltip visible
    setTimeout(() => {
        setTooltipVisible(1)
    }, 1000);

    // for start tooltip
    useEffect(() => {
        if (redux_user?.firstTimeLogin == true) {
            if (debtsSingle?.frequency !== undefined) {
                void start()
                void goToNth(9)
                setTimeout(() => {
                    setTooltipValue(1)
                }, 1000);
            } else {
                void start()
                void goToNth(11)
                setTimeout(() => {
                    setTooltipValue(1)
                }, 1000);
            }
        }
    }, [tooltipVisible])

    // for tooltip first index
    useEffect(() => {
        if (currentStep?.order == 11) {
            if (debtsSingle?.frequency !== undefined) {
                void goToNth(9)
            } else {
                void goToNth(11)
            }
        }
    }, [tooltipValue])


    // set user data
    useEffect(() => {
        setUser(redux_user ?? [])
        setMyBudget(redux_myBudget ?? [])
    }, [redux_user, redux_myBudget])

    // All Functions
    // if user want to add expense from modal
    const onSelectExpense = (expense) => {
        setExpenseName(expense)
        setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)
    }

    // onPress countinue button
    const onPressCountinue = () => {
        setIsLoading(true)
        if (screen == 'expenses') {
            const budgetExpenses = myBudget.budgetDates[currentIndex].expenses
            const newExpenses = [...allExpenses, ...expenses]
            const newBudgetExpenses = [...budgetExpenses]
            expenses.map((i)=>{
                console.log('moment(i?.firstBillDue).isBefore(moment(selectedBudgetDate?.nextPayDate))', moment(i?.firstBillDue, 'MM/DD/YYYY').isBefore(moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY')))
                console.log('moment(i?.firstBillDue).isBefore(moment(selectedBudgetDate?.nextPayDate))', moment(i?.nextBillDue, 'MM/DD/YYYY').isBefore(moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY')))
                if(moment(i?.firstBillDue, 'MM/DD/YYYY').isBefore(moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY'))){
                    newBudgetExpenses.push({...i, nextBillDue: i?.firstBillDue, firstBillDue: '-'})
                }
                if(moment(i?.nextBillDue, 'MM/DD/YYYY').isBefore(moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY'))){
                    newBudgetExpenses.push(i)
                }
            })
            setAllExpenses(newExpenses);
            myBudget.budgetDates[currentIndex].expenses = newBudgetExpenses
            myBudget.Expenses = newExpenses
            var local_budget = { ...selectedBudgetDate }
            local_budget.expenses = newBudgetExpenses
            setSelectedBudgetDate(local_budget)
            dispatch(Budget(myBudget))
            saveData("Budgets", myBudget?._id, {Expenses: newExpenses})
            updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'expenses', newBudgetExpenses)
            setIsLoading(false)
            navigation.goBack()
        } else {
            let budgetDetail = { ...item, Income: debtsSingle?.frequency !== undefined ? [debtsSingle] : debtsMultiple, Expenses: expenses }
            setModalExpensesVisible(!isModalExpensesVisible)
            setIsLoading(false)
            navigation.navigate(routes.addDebts, { budgetDetail })
        }
    }

    // debts add function
    const onPressAdd = () => {

        let id = uniqueID()
        let data = {
            id: id,
            expenseName: expenseName,
            userExpenseName: userExpenseName,
            expenseType: expenseType,
            expenseAmount: expenseAmount,
            expenseFrequency: expenseFrequency,
            firstBillDue: firstBillDue ? firstBillDue : '-',
            nextBillDue: expenseFrequency == 'Every Pay Cycle' ? '-' : nextBillDue,
        }
        setExpenses([...expenses, data])
        setModalExpensesVisible(!isModalExpensesVisible)
    }

    // debt remove function
    const onPressRemoveIcon = (index) => {
        let expense = [...expenses];
        let target = expense[index];
        expense.splice(index, 1);
        setExpenses(expense)
    }

    // select date function
    const onSetFirstDate = _date => {
        setFirstBillDue(moment(_date?.dateString).format('MM/DD/YYYY'));
        setModalFirstDateVisible(!isModalFirstDateVisible);
    };
    // select date function
    const onSetNextDate = _date => {
        setNextBillDue(moment(_date?.dateString).format('MM/DD/YYYY'));
        setModalNextDateVisible(!isModalNextDateVisible);
    };

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <Headers.Main
                title={Translate('RecurringExpensesScreen.recurringExpenses')}
                onBackPress={() => navigation.goBack()}
                tooltipStatus={false}
            />

            <Wrappers.Component>
                <Spacers.Base />
                {currentStep?.order == 11 || currentStep?.order == 13 || currentStep?.order == undefined ?
                    <TextInputs.TextInputLowerBordered
                        placeholder={Translate('MyBudgetScreen.expenseName')}
                        value={userExpenseName}
                        onChangeText={en => setUserExpenseName(en)}
                        insideIconName={expenseImage(expenseName) == null ? 'list-circle-outline' : ''}
                        expenseImage={expenseImage(expenseName)}
                        inputStyle={styles.iconTextInput}
                        onPressMenuIcon={() => {
                            setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)
                            Keyboard.dismiss()
                        }}
                        onBlur={() => {
                            if (expenseName !== '') {

                            }
                            else {
                                setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)
                                Keyboard.dismiss()
                            }
                        }}
                    />
                    :
                    <CopilotStep text={ToolTiopsText.text11} order={10} name="expenseName">
                        <CopilotView>
                            <TextInputs.TextInputLowerBordered
                                placeholder={Translate('MyBudgetScreen.expenseName')}
                                value={userExpenseName}
                                onChangeText={en => setUserExpenseName(en)}
                                insideIconName={expenseImage(expenseName) == null ? 'list-circle-outline' : ''}
                                expenseImage={expenseImage(expenseName)}
                                inputStyle={styles.iconTextInput}
                                onPressMenuIcon={() => {
                                    setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)
                                    Keyboard.dismiss()
                                }}
                                onBlur={() => {
                                    if (expenseName !== '') {

                                    }
                                    else {
                                        setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)
                                        Keyboard.dismiss()
                                    }
                                }}
                            />
                        </CopilotView>
                    </CopilotStep>
                }
                <Spacers.Base />

                <MultipleView
                    Title={Translate('RecurringExpensesScreen.expenseType')}
                    Value1="Fixed"
                    Value2="Variable"
                    onPress={v => setExpenseType(v)}
                    textColor={
                        expenseType == 'Fixed'
                            ? colors.white
                            : colors.placeholderColor
                    }
                    viewColor={
                        expenseType == 'Fixed' ? colors.textColor : colors.lightRed
                    }
                    textColor1={
                        expenseType == 'Variable'
                            ? colors.white
                            : colors.placeholderColor
                    }
                    viewColor1={
                        expenseType == 'Variable' ? colors.textColor : colors.lightRed
                    }
                />
                <Spacers.Base />
                <Wrappers.Wrapper>
                    <TextInputs.TextInputLowerBorder
                        title={expenseType == 'Fixed' ? Translate('Amount') : Translate('RecurringExpensesScreen.estimatedAmount')}
                        placeholder="0"
                        value={convert_numbers(expenseAmount)}
                        keyboardType={'numeric'}
                        onChangeText={text => {
                            setExpenseAmount(remove_commas(text))
                        }}
                        Currency={selectedCurrencySymbol(item?.currency)}
                    />
                    <Spacers.Base />
                </Wrappers.Wrapper>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setModalBottomVisible(!isModalBottomVisible)
                        Keyboard.dismiss()
                    }}
                    style={{}}
                >
                    <TextInputs.TextInputLowerBorder
                        title={Translate('Frequency')}
                        placeholder={Translate('Select')}
                        placeholderColor={colors.lightSilver}
                        value={expenseFrequency}
                        editable={false}
                        right={
                            <Icon
                                name={expenseFrequency ? 'triangle-down' : 'controller-play'}
                                type="entypo"
                                size={12}
                            />
                        }
                    />
                    <Spacers.Base />
                </TouchableOpacity>
                {expenseFrequency !== 'Every Pay Cycle' &&
                    <>
                        {expenseFrequency == 'Twice a Month' &&
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setModalFirstDateVisible(!isModalFirstDateVisible)
                                    Keyboard.dismiss()
                                }}>
                                <TextInputs.TextInputLowerBorder
                                    title={Translate('RecurringExpensesScreen.firstBillDue')}
                                    placeholder={Translate('Select')}
                                    placeholderColor={colors.lightSilver}
                                    value={firstBillDue}
                                    editable={false}
                                    right={
                                        <Icon
                                            name={firstBillDue ? 'triangle-down' : 'controller-play'}
                                            type="entypo"
                                            size={12}
                                        />
                                    }
                                />
                                <Spacers.Base />
                            </TouchableOpacity>
                        }

                        <Wrappers.Wrapper>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setModalNextDateVisible(!isModalNextDateVisible)
                                    Keyboard.dismiss()
                                }}>
                                <CopilotStep text={ToolTiopsText.text12} order={11} name="nextBillDue">
                                    <CopilotView>
                                        <TextInputs.TextInputLowerBorder
                                            title={Translate('RecurringExpensesScreen.nextBillDue')}
                                            placeholder={Translate('Select')}
                                            placeholderColor={colors.lightSilver}
                                            value={nextBillDue}
                                            editable={false}
                                            right={
                                                <Icon
                                                    name={nextBillDue ? 'triangle-down' : 'controller-play'}
                                                    type="entypo"
                                                    size={12}
                                                />
                                            }
                                        />
                                    </CopilotView>
                                </CopilotStep>
                            </TouchableOpacity>
                        </Wrappers.Wrapper>
                    </>
                }

                <Spacers.DoubleBase />
                <Wrappers.Component>
                    <Buttons.ButtonColored
                        text={Translate('Add')}
                        buttonColor={expenseName && expenseAmount && expenseFrequency &&
                            (expenseFrequency == 'Twice a Month' ? firstBillDue && nextBillDue : nextBillDue) ||
                            expenseFrequency == 'Every Pay Cycle'
                            ? colors.textColor : colors.disableText}
                        disabled={expenseName && expenseAmount && expenseFrequency &&
                            (expenseFrequency == 'Twice a Month' ? firstBillDue && nextBillDue : nextBillDue) ||
                            expenseFrequency == 'Every Pay Cycle'
                            ? false : true}
                        tintColor={colors.white}
                        onPress={() => onPressAdd()}
                    />
                </Wrappers.Component>
            </Wrappers.Component>

            <Modals.BottomModal1
                isVisible={isModalBottomVisible}
                toggleModal={() => setModalBottomVisible(!isModalBottomVisible)}
                OnSelectValue={() => setModalBottomVisible(!isModalBottomVisible)}
                Title={Translate('selectFrequency')}
                Data={['Every Pay Cycle', 'Monthly', 'Twice a Month', 'Every 3 Months', 'Every 6 Months', 'Every Year']}
                setFrequency={setExpenseFrequency}
                frequency={expenseFrequency}
            />

            <Modals.ExpensesModal
                isVisible={isModalExpensesVisible}
                toggleModal={() => setModalExpensesVisible(!isModalExpensesVisible)}
                expenses={expenses}
                onPressAddExpenses={() => {
                    setExpenseType('Fixed')
                    setExpenseName('')
                    setExpenseAmount('')
                    setExpenseFrequency('')
                    setUserExpenseName('')
                    setModalExpensesVisible(!isModalExpensesVisible)
                }}
                onPressRemoveIcon={(index) => { onPressRemoveIcon(index) }}
                onPressCountinue={() => { onPressCountinue() }}
                isLoading={isLoading}
            />

            <Modals.ExpensesCategoriesModal
                isVisible={isModalExpensesCategoriesVisible}
                toggleModal={() => setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)}
                Title={Translate('selectCategory')}
                ref={ref}
                setExpenseName={(expense) => onSelectExpense(expense)}
            />

            <Modals.CalendarModal
                isVisible={isModalFirstDateVisible}
                toggleModal={() => setModalFirstDateVisible(!isModalFirstDateVisible)}
                onChangeVisibility={() => setModalFirstDateVisible(!isModalFirstDateVisible)}
                Title={Translate('RecurringExpensesScreen.selectDate')}
                selectValue={_date => onSetFirstDate(_date)}
            />

            <Modals.CalendarModal
                isVisible={isModalNextDateVisible}
                toggleModal={() => setModalNextDateVisible(!isModalNextDateVisible)}
                onChangeVisibility={() => setModalNextDateVisible(!isModalNextDateVisible)}
                Title={Translate('RecurringExpensesScreen.selectDate')}
                selectValue={_date => onSetNextDate(_date)}
            />
        </Wrappers.Wrapper>
    );
};

export default AddRecurringExpenses;
