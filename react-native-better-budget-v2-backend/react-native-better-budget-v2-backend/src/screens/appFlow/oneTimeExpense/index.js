import React, { useState, useRef, useEffect } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons, Headers, Modals, Spacers, TextInputs, Wrappers } from '../../../components';
import { colors, expenseImage, routes, selectedCurrencySymbol } from '../../../services';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';
import { saveData } from '../../../services/utils/utility';
import { Budget } from '../../../Redux/actions/App';

const OneTimeExpense = ({ navigation, route }) => {
    const ref = useRef();
    const dispatch = useDispatch()

    // redux data
    let redux_user = useSelector(state => state?.Auth?.user)
    let redux_myBudget = useSelector(state => state?.App?.userBudget)

    // Previous Screen data
    const { currentIndex, selectedBudget, selectedBudgetDate, setSelectedBudget, setSelectedBudgetDate } = route?.params || {};



    // useStates
    const [user, setUser] = useState(redux_user ?? []);
    const [myBudget, setMyBudget] = useState(redux_myBudget ?? []);
    const [expenseName, setExpenseName] = useState('');
    const [userExpenseName, setUserExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [isModalExpensesCategoriesVisible, setModalExpensesCategoriesVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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


    // expense add function
    const onPressAdd = () => {
        const expense = { expenseName: expenseName, expenseAmount: expenseAmount, userExpenseName:userExpenseName }
        const copy_my_budget = { ...selectedBudgetDate };
        if (copy_my_budget?.oneTimeExpenses?.length > 0) {
            copy_my_budget.oneTimeExpenses.push(expense);
        } else {
            copy_my_budget.oneTimeExpenses = [expense];
        }
        const all_budget_data = { ...selectedBudget };
        all_budget_data.budgetDates[currentIndex] = copy_my_budget;

        saveData('Budgets', selectedBudget?._id, {budgetDates: all_budget_data.budgetDates});
        setSelectedBudget(all_budget_data)
        setSelectedBudgetDate(copy_my_budget)
        dispatch(Budget(all_budget_data))
        navigation.goBack()
    }


    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <Headers.Main
                title={Translate('MyBudgetScreen.addOneTimeExpense')}
                onBackPress={() => navigation.goBack()}
                tooltipStatus={false}
            />

            <Wrappers.Component>
                <Spacers.Base />
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

                <Spacers.Base />

                <Wrappers.Wrapper>
                    <TextInputs.TextInputLowerBorder
                        title={Translate('Amount')}
                        placeholder="0"
                        value={expenseAmount}
                        keyboardType={'numeric'}
                        onChangeText={val => setExpenseAmount(val)}
                        Currency={selectedCurrencySymbol(selectedBudget?.currency)}
                    />
                    <Spacers.Base />
                </Wrappers.Wrapper>


                <Spacers.Base />
                <Wrappers.Component>
                    <Buttons.ButtonColored
                        text={Translate('Add')}
                        buttonColor={expenseName && expenseAmount
                            ? colors.textColor : colors.disableText}
                        disabled={expenseName && expenseAmount
                            ? false : true}
                        tintColor={colors.white}
                        onPress={() => onPressAdd()}
                    />
                </Wrappers.Component>
            </Wrappers.Component>


            <Modals.ExpensesCategoriesModal
                isVisible={isModalExpensesCategoriesVisible}
                toggleModal={() => setModalExpensesCategoriesVisible(!isModalExpensesCategoriesVisible)}
                Title={Translate('selectCategory')}
                ref={ref}
                setExpenseName={(expense) => onSelectExpense(expense)}
            />
        </Wrappers.Wrapper>
    );
};

export default OneTimeExpense;
