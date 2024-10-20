import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Headers, ScrollViews, Spacers, Wrappers } from '../../../components';
import { colors, selectedCurrencySymbol } from '../../../services';
import { styles } from './styles';
import PayDateArrows from '../../../screenComponents/payDateArrows';
import { IncomeView, TotalAmountView } from '../../../screenComponents/homeScreenComponents';
import { SwipableListHomeExpense } from '../../../screenComponents/homeScreenExpenses';
import { ExpenseHeaderHome } from '../../../components/staticComponents';
import Translate from '../../../services/languageStrings/translate';
import { useSelector } from 'react-redux';
import { calculateShowingExpenses, calculateTotalPayments, onPressNextArrow } from '../../../services/functions';
import { convert_numbers } from '../../../services/utils/helperFunctions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import moment from 'moment';
import { totalSize, height, width } from 'react-native-dimension';

const SimulatedBudget = (props) => {

    const { newBudget } = props.route.params



    //NEW STATES
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedBudgetDate, setSelectedBudgetDate] = useState(null)
    const [selectedBudget, setSelectedBudget] = useState(newBudget ?? []);
    const [income, setIncome] = useState(newBudget?.Income[0]?.netIncome ?? 0)
    const [primaryIncome, setPrimaryIncome] = useState(newBudget?.Income[0] ?? {});
    const [totalPayments, setTotalPayments] = useState(0);
    const [allExpenses, setAllExpenses] = useState([]);
    const [month, setMonth] = useState(moment().startOf('month'))
    const [nextPayDate, setNextPayDate] = useState(newBudget?.Income[0]?.nextPayDate)
    const [monthlyBudgets, setMonthlyBudgets] = useState([])
    const [nextPayDateArray, setNextPayDateArray] = useState([newBudget?.Income[0]?.nextPayDate])
    const [monthlyIndex, setMonthlyIndex] = useState(0)

    useEffect(() => {
        setBudgetData(newBudget)
    }, [newBudget])

    // Modify your data preparation logic

    const setNewBudgetData = (currentMonth, index = 0, goingBack = false) => {

        const income = newBudget?.Income[0]
        // Calculate the start and end dates of the month
        let _nextPayDate = nextPayDateArray[index]

        const firstDayOfMonth = moment(currentMonth, 'MM/DD/YYYY').startOf('month');
        const lastDayOfMonth = moment(currentMonth, 'MM/DD/YYYY').endOf('month');

        let budget_date = {
            netIncome: newBudget?.Income ? parseFloat(income?.netIncome) : 0,
        };

        const monthBudgets = []

        while (moment(_nextPayDate, 'MM/DD/YYYY')?.isSameOrBefore(lastDayOfMonth) && moment(_nextPayDate, 'MM/DD/YYYY')?.isSameOrAfter(firstDayOfMonth)) {

            const expenses = calculateShowingExpenses(income, selectedBudget, { nextPayDate: _nextPayDate })
            const payments = calculateTotalPayments([], expenses ?? [], []) ?? 0;
            monthBudgets.push({
                ...budget_date,
                nextPayDate: _nextPayDate, // Convert moment object back to Date
                expenses: expenses,
                payments: payments
            });

            // Calculate the nextPayDate using your custom function
            _nextPayDate = onPressNextArrow(income?.frequency, _nextPayDate); 

        }

        if (goingBack == false) {
            const local_pay_array = [...nextPayDateArray]
            local_pay_array?.push(_nextPayDate)
            setNextPayDateArray(local_pay_array)
        }
        setNextPayDate(_nextPayDate)
        setMonthlyBudgets(monthBudgets)
        console.log("MONTHLY BUDGETS", JSON.stringify(monthBudgets))
    };



    const setBudgetData = (budget) => {
        const currentMonth = moment().startOf('month');
        setNewBudgetData(currentMonth)
        setSelectedBudget(budget)
        setSelectedBudgetDate(budget?.budgetDates[currentIndex])
    }

    useEffect(() => {
        if (selectedBudgetDate) {
            setIncome(selectedBudgetDate?.netIncome)
            const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, selectedBudgetDate)
            setAllExpenses(expenses)
            const payments = calculateTotalPayments(selectedBudgetDate?.debts_dates ?? [], expenses ?? [], selectedBudgetDate?.oneTimeExpenses ?? []) ?? 0;
            setTotalPayments(payments);
        }
    }, [selectedBudgetDate])


    useEffect(() => {
        if(monthlyBudgets.length == 0){
            const my_month = moment(month).add(1, 'month')
            setMonth(my_month)
            // setNewBudgetData(my_month, 0, false)
        }
    }, [monthlyBudgets])


    //All Functions
    // render flatlist for expenses
    const showExpenses = (item, index, monthBudget) => {
        return (
            <SwipableListHomeExpense
                index={index}
                ExpenseName={item?.userExpenseName}
                ExpenseDate={item?.nextBillDue ? item?.nextBillDue : '-'}
                ExpenseAmount={convert_numbers(item?.expenseAmount)}
                Currency={selectedBudget?.currency}
                CurrentDate={monthBudget?.nextPayDate}
                iconVisible={item?.expenseType == 'Fixed' ? false : true}
            />
        )
    }


    // when user press on back arrow to change date
    const onPressBackArrow = async () => {
        setMonthlyIndex(0)
        const index = currentIndex - 1 < 0 ? 0 : currentIndex - 1
        setCurrentIndex(index)
        if (index >= 0) {
            const my_month = moment(month).subtract(1, 'month')
            setMonth(my_month)
            setNewBudgetData(my_month, index, true)
        }
    };

    // when user press on right arrow to change date
    const onPressRightArrow = () => {
        setMonthlyIndex(0)
        const index = currentIndex + 1
        setCurrentIndex(index)
        const my_month = moment(month).add(1, 'month')
        setMonth(my_month)
        setNewBudgetData(my_month, index)
    }

    const onPressRightMonthly = () => {
        setMonthlyIndex(monthlyIndex + 1)
    }
    const onPressLeftMonthly = () => {
        setMonthlyIndex(monthlyIndex - 1)
    }



    // calculate remaining amount
    const calculateRemaining = () => {
        return `${income - totalPayments}`
    };

    const calculateMonthlyIncome = () => {
        var netIncome = 0
        monthlyBudgets.map((i) => netIncome += i.netIncome)
        return netIncome
    }

    const calculateMonthlyExpense = () => {
        var payments = 0
        monthlyBudgets.map((i) => payments += calculateTotalPayments([], i?.expenses ?? [], []) ?? 0)
        return payments
    }


    return (

        <Wrappers.Wrapper style={styles.main}>
            <GestureHandlerRootView>
                <Headers.Main
                    title={newBudget?.budgetName}
                    onBackPress={() => props.navigation.goBack()}
                    tooltipStatus={false}
                />
                <ScrollViews.KeyboardAvoiding>
                    <Spacers.Small />
                    <Wrappers.Component>
                        <Spacers.Small />

                        <Wrappers.Component>
                            <PayDateArrows
                                onPressLeft={() => onPressBackArrow()}
                                disabled={currentIndex == 0 ? true : false}
                                backArrowColor={currentIndex == 0 ? colors.gray : colors.black}
                                onPressRight={() => onPressRightArrow()}
                                title={Translate('MyBudgetScreen.payDate')}
                                value={moment(month).format('MMMM')}
                            />
                        </Wrappers.Component>
                    </Wrappers.Component>
                    <Spacers.Base />

                    <IncomeView income={`Monthly Income`} incomeAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(calculateMonthlyIncome())}`} />
                    {/* <Spacers.Base /> */}
                    <IncomeView income={`Monthly Expense`} incomeAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(calculateMonthlyExpense())}`} />
                    {/* <Spacers.Base /> */}
                    <IncomeView income={`Left Over`} incomeAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(calculateMonthlyIncome() - calculateMonthlyExpense())}`} />


                    <Spacers.Base />
                    {/* {monthlyBudgets.map((item) => { */}
                    {/* return ( */}
                    <>
                        <Wrappers.Component>
                            <PayDateArrows
                                onPressLeft={() => onPressLeftMonthly()}
                                disabled={monthlyIndex == 0 ? true : false}
                                rightDisabled={monthlyBudgets.length == 0 || monthlyIndex == monthlyBudgets.length - 1 ? true : false}
                                backArrowColor={monthlyIndex == 0 ? colors.gray : colors.black}
                                rightArrowColor={monthlyBudgets.length == 0 || monthlyIndex == monthlyBudgets.length - 1 ? colors.gray : colors.black}
                                onPressRight={() => onPressRightMonthly()}
                                title={Translate('MyBudgetScreen.payDate')}
                                value={monthlyBudgets[monthlyIndex]?.nextPayDate}
                                width={true}
                            />
                        </Wrappers.Component>
                        <Spacers.Base />
                        <IncomeView income={`${Translate('OnBoardingScreen.onBoardingTitle2')} on ${monthlyBudgets[monthlyIndex]?.nextPayDate}`} incomeAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(monthlyBudgets[monthlyIndex]?.netIncome)}`} />

                        <Spacers.Small />
                        <Wrappers.Wrapper>
                            <ExpenseHeaderHome />

                            <FlatList
                                data={monthlyBudgets[monthlyIndex]?.expenses}
                                // renderItem={showExpenses}
                                renderItem={({ item: expense, index }) => showExpenses(expense, index, monthlyBudgets[monthlyIndex])}
                                scrollEnabled={false}
                                keyExtractor={item => item.id}
                            />

                        </Wrappers.Wrapper>

                        <Spacers.Base />
                        <Wrappers.Component>
                            <TotalAmountView text={Translate('MyBudgetScreen.totalPayments')} totalAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(monthlyBudgets[monthlyIndex]?.payments)}`} />
                            <Spacers.Small />
                            <TotalAmountView text={Translate('MyBudgetScreen.totalRemaining')}
                                totalAmount={`${selectedCurrencySymbol(selectedBudget?.currency)} ${convert_numbers(monthlyBudgets[monthlyIndex]?.netIncome - monthlyBudgets[monthlyIndex]?.payments)}`}
                            />
                        </Wrappers.Component>
                        <Spacers.DoubleBase />
                    </>
                    {/* ) */}
                    {/* // })} */}

                    <Spacers.DoubleBase />
                    <Spacers.DoubleBase />

                </ScrollViews.KeyboardAvoiding>

            </GestureHandlerRootView>
        </Wrappers.Wrapper>

    );
};

export default SimulatedBudget;