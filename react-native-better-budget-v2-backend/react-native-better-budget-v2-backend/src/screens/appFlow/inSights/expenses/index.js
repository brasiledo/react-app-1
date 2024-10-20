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
import { saveData, uniqueID } from '../../../../services/utils/utility';
import { Budget } from '../../../../Redux/actions/App';
import moment from 'moment';

const SimulatedExpenses = ({ navigation, route }) => {
    const ref = useRef();
    const dispatch = useDispatch()

    // redux data
    let redux_user = useSelector(state => state?.Auth?.user)
    let redux_myBudget = useSelector(state => state?.App?.userBudget)


    // tooltips
    const CopilotView = walkthroughable(View);
    const { start, goToNth, currentStep } = useCopilot()



    // useStates
    const [user, setUser] = useState(redux_user ?? []);
    const [myBudget, setMyBudget] = useState(redux_myBudget ?? []);
    const [expenseType, setExpenseType] = useState('Fixed');
    const [expenseIndex, setExpenseIndex] = useState(-1)
    const [expenseName, setExpenseName] = useState('');
    const [userExpenseName, setUserExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseFrequency, setExpenseFrequency] = useState('');
    const [firstBillDue, setFirstBillDue] = useState('');
    const [nextBillDue, setNextBillDue] = useState('');
    const [expenses, setExpenses] = useState(redux_myBudget?.Expenses ?? [])
    const [isModalBottomVisible, setModalBottomVisible] = useState(false);
    const [isModalFirstDateVisible, setModalFirstDateVisible] = useState(false);
    const [isModalNextDateVisible, setModalNextDateVisible] = useState(false);
    const [isModalExpensesVisible, setModalExpensesVisible] = useState(false);
    const [isModalExpensesCategoriesVisible, setModalExpensesCategoriesVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(0);
    const [tooltipValue, setTooltipValue] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [allExpenses, setAllExpenses] = useState(redux_myBudget?.Expenses ?? [])


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

    useEffect(() => {
        setTimeout(() => {
            setModalExpensesVisible(true)
        }, 500);
    }, [])

    // onPress countinue button
    const onPressCountinue = () => {
        setIsLoading(true)
        // var all_local_expenses = [...allExpenses]
        // all_local_expenses = [...all_local_expenses, ...expenses]
        setIsLoading(false)
        setModalExpensesVisible(!isModalExpensesVisible)
        navigation.navigate(routes.simulatedBudget, { newBudget: { ...myBudget, Expenses: expenses } })
    }

    // debts add function
    const onPressAdd = () => {
        if (expenseIndex >= 0) {
            setExpenseIndex(-1)
            let id = uniqueID()
            let data = {
                id: id,
                expenseName: expenseName,
                userExpenseName: userExpenseName,
                expenseType: expenseType,
                expenseAmount: expenseAmount,
                expenseFrequency: expenseFrequency,
                firstBillDue: firstBillDue ? firstBillDue : '-',
                nextBillDue: nextBillDue ? nextBillDue : '-',
            }
            const new_expenses = [...expenses]
            new_expenses[expenseIndex] = data
            setExpenses(new_expenses)
            setModalExpensesVisible(!isModalExpensesVisible)
        }
        else {
            setExpenseIndex(-1)
            let id = uniqueID()
            let data = {
                id: id,
                expenseName: expenseName,
                userExpenseName: userExpenseName,
                expenseType: expenseType,
                expenseAmount: expenseAmount,
                expenseFrequency: expenseFrequency,
                firstBillDue: firstBillDue ? firstBillDue : '-',
                nextBillDue: nextBillDue ? nextBillDue : '-',
            }
            setExpenses([...expenses, data])
            setModalExpensesVisible(!isModalExpensesVisible)
        }


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
                title={Translate('SimulatedExpenses.simulatedExpense')}
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
                        value={expenseAmount}
                        keyboardType={'numeric'}
                        onChangeText={ea => setExpenseAmount(ea)}
                        Currency={selectedCurrencySymbol(redux_myBudget?.currency)}
                    />
                    <Spacers.Base />
                </Wrappers.Wrapper>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setModalBottomVisible(!isModalBottomVisible)
                        Keyboard.dismiss()
                    }}>
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
                        text={expenseIndex >= 0 ? Translate('Update') : Translate('Add')}
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

            {/* <Modals.ExpensesModal
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
            /> */}

            <Modals.SimulatedExpensesModal
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
                onPressExpense={(item, index) => {
                    setExpenseIndex(index)
                    setExpenseType(item?.expenseType)
                    setExpenseName(item?.expenseName)
                    setExpenseAmount(item?.expenseAmount)
                    setExpenseFrequency(item?.expenseFrequency)
                    setFirstBillDue(item?.firstBillDue)
                    setNextBillDue(item?.nextBillDue)
                    setUserExpenseName(item?.userExpenseName)
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

export default SimulatedExpenses;
