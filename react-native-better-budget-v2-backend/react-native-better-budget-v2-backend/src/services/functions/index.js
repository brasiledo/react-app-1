import moment from "moment";
import { saveData } from "../utils/utility";
import { Budget } from "../../Redux/actions/App";

export const onPressNextArrow = (payFrequency, payDate) => {
    if (payFrequency == 'Weekly') {
        const next_date = moment(payDate, 'MM/DD/YYYY')
            .add(7, 'days')
            .format('MM/DD/YYYY');
        return next_date
    } else if (payFrequency == 'Bi-Weekly') {
        const next_date = moment(payDate, 'MM/DD/YYYY')
            .add(14, 'days')
            .format('MM/DD/YYYY');
        return next_date
    } else if (payFrequency == 'Semi-Monthly') {
        var next_date;
        const current_date = moment(payDate, 'MM/DD/YYYY').get('date');
        if (current_date == 1) {
            next_date = moment(payDate, 'MM/DD/YYYY')
                .add(14, 'days')
                .format('MM/DD/YYYY');
            return next_date
        } else if (current_date == 15) {
            const pay_month =
                (moment(payDate, 'MM/DD/YYYY').get('month') + 1) % 12;
            const pay_year = moment(payDate, 'MM/DD/YYYY').get('year');
            const next_month = pay_month + 1;
            if (next_month == 1) {
                next_date = moment(
                    `${pay_month + 1}/01/${pay_year}`,
                    'MM/DD/YYYY',
                ).format('MM/DD/YYYY');
                next_date = moment(next_date, 'MM/DD/YYYY')
                    .add(1, 'year')
                    .format('MM/DD/YYYY');
            } else {
                next_date = moment(
                    `${pay_month + 1}/01/${pay_year}`,
                    'MM/DD/YYYY',
                ).format('MM/DD/YYYY');
            }
            return next_date
        } else if (current_date == 16) {
            const pay_month =
                (moment(payDate, 'MM/DD/YYYY').get('month') + 1) % 13;
            const pay_year = moment(payDate, 'MM/DD/YYYY').get('year');
            const endOfMonth = moment(`${pay_year}-${pay_month}-16`)
                .endOf('month')
                .get('date');
            next_date = moment(
                `${pay_month}/${endOfMonth}/${pay_year}`,
                'MM/DD/YYYY',
            ).format('MM/DD/YYYY');
            return next_date
        } else {
            const pay_month =
                (moment(payDate, 'MM/DD/YYYY').get('month') + 1) % 12;
            const pay_year = moment(payDate, 'MM/DD/YYYY').get('year');
            const next_month = pay_month + 1;
            if (next_month == 1) {
                next_date = moment(
                    `${pay_month + 1}/16/${pay_year}`,
                    'MM/DD/YYYY',
                ).format('MM/DD/YYYY');
                next_date = moment(next_date, 'MM/DD/YYYY')
                    .add(1, 'year')
                    .format('MM/DD/YYYY');
            } else {
                next_date = moment(
                    `${pay_month + 1}/16/${pay_year}`,
                    'MM/DD/YYYY',
                ).format('MM/DD/YYYY');
            }
            return next_date
        }
    } else {
        const next_date = moment(payDate, 'MM/DD/YYYY')
            .add(1, 'month')
            .format('MM/DD/YYYY');
        return next_date
    }
};

export const calculateNearestDateIndex = (budgets) => {
    // const currentDate = moment(new Date(), 'MM/DD/YYYY');

    // let nearestDateIndex = 0;
    // let nearestDateDiff = Number.MAX_SAFE_INTEGER;

    // budgets?.budgetDates?.forEach((item, index) => {
    //     const nextPayDate = moment(item?.nextPayDate, 'MM/DD/YYYY');
    //     const diff = currentDate.diff(nextPayDate, 'days');

    //     if (diff >= 0 && diff < nearestDateDiff) {
    //         nearestDateDiff = diff;
    //         nearestDateIndex = index;
    //     }
    // });

    // return nearestDateIndex;
    return budgets?.budgetDates?.length - 1 ?? 0
};

export const calculateExpenses = (expenses, oneTimeExpenses) => {
    // const my_expenses = myBudget?.Expenses ?? [];
    let all_expenses = [...expenses]
    if (oneTimeExpenses?.length > 0) {
        all_expenses = [...expenses, ...oneTimeExpenses];
    }
    let total_expenses = all_expenses?.reduce(function (prev, item) {
        return prev + parseFloat(item?.expenseAmount);
    }, 0);
    return total_expenses ?? 0;

};

export const switchIndexes = (arr, index1, index2) => {
    // Make a copy of the original array to avoid mutating the original data
    const newArray = [...arr];

    // Check if the provided indexes are valid
    if (index1 < 0 || index1 >= newArray.length || index2 < 0 || index2 >= newArray.length) {
        console.error('Invalid indexes provided.');
        return newArray; // Return the original array as is
    }

    // Swap the objects at index1 and index2
    const temp = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = temp;

    return newArray;
}


export const addRemainingSavingsToDebt = (savings, newDebts, setNewDebts, setToSave, setToPay) => {
    let remainingSavings = savings > 0 ? savings : 0;
    let totalPayment = 0;

    const updatedDebts = newDebts?.map((debt, index) => {
        const oldPaymentAmount = parseFloat(debt.paymentAmount) || 0;
        const oldDebtAmount = parseFloat(debt.debtAmount) || 0;

        const paymentForThisDebt = Math.min(oldDebtAmount - oldPaymentAmount, remainingSavings);
        totalPayment += paymentForThisDebt;

        const updatedPaymentAmount = oldPaymentAmount + paymentForThisDebt;
        const updatedDebtAmount = oldDebtAmount - paymentForThisDebt;

        remainingSavings -= paymentForThisDebt;

        return { ...debt, paymentAmount: updatedPaymentAmount, debtAmount: updatedDebtAmount };
    });

    setToSave(remainingSavings);
    setToPay(totalPayment);
    setNewDebts(updatedDebts);
};




export const calculateDebts = (debts) => {
    let total_debts = debts?.reduce(function (prev, item) {
        return prev + parseFloat(item?.paymentAmount ?? 0);
    }, 0);

    return total_debts ?? 0;
};

export const calculateDebtsTotalAmount = (debts) => {
    let total_debts = debts?.reduce(function (prev, item) {
        return prev + parseFloat(item?.debtAmount ?? 0);
    }, 0);
    return total_debts ?? 0;
};

export const calculateDebtsRemaining = (debts) => {
    let total_debts = debts?.reduce(function (prev, item) {
        return prev + parseFloat(item.debtAmount ?? 0);
    }, 0);

    let final_debts = total_debts ?? 0

    return final_debts - calculateDebts(debts);
};

export const calculateDateIfBetween = (budgetDate, budgetNextDate, IncomePayDate) => {

    const budgetDateObj = moment(budgetDate, 'MM/DD/YYYY');
    const budgetNextDateObj = moment(budgetNextDate, 'MM/DD/YYYY');
    const IncomePayDateObj = moment(IncomePayDate, 'MM/DD/YYYY');

    if (
        IncomePayDateObj.isBetween(budgetDateObj, budgetNextDateObj, 'day', '[]') ||
        IncomePayDateObj.isSame(budgetDateObj, 'day') ||
        IncomePayDateObj.isSame(budgetNextDateObj, 'day')
    ) {
        return true;
    }
    else {
        return false
    }
}

export const calculateExpenseForFrequency = (budget_date, next_budget_date, expense_date, frequency) => {
    console.log(budget_date, next_budget_date, expense_date, frequency)
    const expenseDateObj = moment(expense_date, 'MM/DD/YYYY');
    const budgetDateObj = moment(budget_date, 'MM/DD/YYYY');
    const nextBudgetDateObj = moment(next_budget_date, 'MM/DD/YYYY');

    if (
        expenseDateObj.isBetween(budgetDateObj, nextBudgetDateObj, 'day', '[]') ||
        expenseDateObj.isSame(budgetDateObj, 'day') ||
        expenseDateObj.isSame(nextBudgetDateObj, 'day')
    ) {
        return true;
    }

    const newExpenseDateObj = moment(expenseDateObj).add(frequency, 'months');

    if (newExpenseDateObj.isAfter(nextBudgetDateObj)) {
        return false;
    }

    return calculateExpenseForFrequency(budget_date, next_budget_date, newExpenseDateObj, frequency);
}

export const calculateExpensesForMonth = (monthYear, expense_date, expense_amount, frequency) => {
    const expenseDateObj = moment(expense_date, 'MM/DD/YYYY');
    const { firstDayOfMonth, lastDayOfMonth } = findFirstAndLastDayOfMonth(monthYear)
    const firstDayOfMonthObj = moment(firstDayOfMonth, 'MM/DD/YYYY');
    const lastDayOfMonthObj = moment(lastDayOfMonth, 'MM/DD/YYYY');

    if (
        expenseDateObj.isBetween(firstDayOfMonthObj, lastDayOfMonthObj, 'day', '[]') ||
        expenseDateObj.isSame(firstDayOfMonthObj, 'day') ||
        expenseDateObj.isSame(lastDayOfMonthObj, 'day')
    ) {
        return totalExpense += expense_amount;
    }

    const newExpenseDateObj = moment(expenseDateObj).add(frequency, 'months');

    if (newExpenseDateObj.isAfter(lastDayOfMonthObj)) {
        return false;
    }

    return calculateExpensesForMonth(monthYear, newExpenseDateObj, frequency);
}

const findFirstAndLastDayOfMonth = (monthYear) => {
    const monthStart = moment(monthYear, 'MMMM YYYY').startOf('month');
    const monthEnd = moment(monthYear, 'MMMM YYYY').endOf('month');

    const firstDayOfMonth = monthStart.format('MM/DD/YYYY');
    const lastDayOfMonth = monthEnd.format('MM/DD/YYYY');

    return { firstDayOfMonth, lastDayOfMonth };
};

export const calculateShowingExpenses = (primaryIncome, selectedBudget, selectedBudgetDate) => {
    let next_date = onPressNextArrow(primaryIncome?.frequency, selectedBudgetDate?.nextPayDate)

    const updatedExpenses = selectedBudget?.Expenses?.map(expense => {
        if (expense.expenseFrequency === "Twice a Month") {
            const firstExpense = { ...expense, nextBillDue: expense.firstBillDue, firstBillDue: '-' };
            const secondExpense = { ...expense, nextBillDue: expense.nextBillDue, firstBillDue: '-' };
            return [firstExpense, secondExpense];
        }
        return expense;
    }).flat();

    let showing_expenses = updatedExpenses?.filter((i, index) => {
        if (i?.expenseFrequency == 'Twice a Month') {
            var first_date = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
            var budget_date = moment(next_date, 'MM/DD/YYYY');
            const isWithinBudget = calculateExpenseForFrequency(first_date, budget_date, moment(i?.nextBillDue, 'MM/DD/YYYY'), 1)
            return isWithinBudget
        }
        if (i?.expenseFrequency == 'Monthly') {
            var first_date = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
            var budget_date = moment(next_date, 'MM/DD/YYYY');
            const isWithinBudget = calculateExpenseForFrequency(first_date, budget_date, moment(i?.nextBillDue, 'MM/DD/YYYY'), 1)
            return isWithinBudget
        }
        else if (i?.expenseFrequency == 'Every 3 Months') {
            var first_date = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
            var budget_date = moment(next_date, 'MM/DD/YYYY');
            const isWithinBudget = calculateExpenseForFrequency(first_date, budget_date, moment(i?.nextBillDue, 'MM/DD/YYYY'), 3)
            return isWithinBudget
        }
        else if (i?.expenseFrequency == 'Every 6 Months') {
            var first_date = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
            var budget_date = moment(next_date, 'MM/DD/YYYY');
            const isWithinBudget = calculateExpenseForFrequency(first_date, budget_date, moment(i?.nextBillDue, 'MM/DD/YYYY'), 6)
            return isWithinBudget
        }
        else if (i?.expenseFrequency == 'Every Year') {
            var first_date = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
            var budget_date = moment(next_date, 'MM/DD/YYYY');
            const isWithinBudget = calculateExpenseForFrequency(first_date, budget_date, moment(i?.nextBillDue, 'MM/DD/YYYY'), 12)
            return isWithinBudget
        }
        else if (i?.expenseFrequency == 'Every Pay Cycle') {
            return true;
        } else {
            return false;
        }
    });

    return showing_expenses
}

export const updateExpensesMonths = (expenses, date) => {
    const updatedExpenses = expenses?.map(expense => {

        // Assuming date format is MM/DD/YYYY
        const newNextBillDue = expense.nextBillDue == '-' ? '-' : moment(date, 'MM/DD/YYYY')
            ?.date(expense?.nextBillDue?.split('/')[1]) // Set the day to the existing day
            ?.format('MM/DD/YYYY');

        return {
            ...expense,
            nextBillDue: newNextBillDue
        };
    });
    return updatedExpenses;
};

export const calculateTotalSavings = (budget, debt = false) => {
    if (debt == false) {
        return budget?.totalCurrentSaving - budget?.cycleSaveAmount
    }
    else {
        return budget?.totalCurrentSaving
    }
}

export const calculateTotalPayments = (debts, expenses, oneTimeExpense) => {
    return calculateDebts(debts) + calculateExpenses(expenses, oneTimeExpense)
}

export const calculateGraph = (selectedBudget, selectedBudgetDate, selectedDebt, debtPayments = []) => {
    const income = selectedBudget?.Income[0];
    const expenses = calculateShowingExpenses(income, selectedBudget, selectedBudgetDate);
    const total = calculateTotalPayments([], expenses ?? [], []) ?? 0;
    const payLeft = parseFloat(income?.netIncome) - total - selectedBudget?.accountMinimum;
    let nextPayDate = selectedBudgetDate?.nextPayDate
    const remainingDebt = parseFloat(selectedDebt?.debtAmount);
    if (remainingDebt > 0) {
        if (payLeft >= remainingDebt) {
            selectedDebt.debtAmount = '0';
            debtPayments.push({ debtAmount: '0', payDate: nextPayDate });
            nextPayDate = onPressNextArrow(income?.frequency, selectedBudgetDate?.nextPayDate);
            calculateGraph(selectedBudget, { nextPayDate: nextPayDate }, selectedDebt, debtPayments);
        } else {
            selectedDebt.debtAmount = (remainingDebt - payLeft).toString();
            debtPayments.push({ debtAmount: remainingDebt - payLeft, payDate: nextPayDate });
            nextPayDate = onPressNextArrow(income?.frequency, selectedBudgetDate?.nextPayDate);
            calculateGraph(selectedBudget, { nextPayDate: nextPayDate }, selectedDebt, debtPayments);
        }
    } else {
    }
};

export const calculateGraphSavings = (selectedBudget, selectedBudgetDate, savingsGoal, savingPayments = [], accumulatedSavings = 0) => {
    const income = selectedBudget?.Income[0];
    const expenses = calculateShowingExpenses(income, selectedBudget, selectedBudgetDate);
    const totalExpenses = calculateTotalPayments([], expenses ?? [], []) ?? 0;
    const payLeft = parseFloat(income?.netIncome) - totalExpenses - selectedBudget?.accountMinimum;
    let nextPayDate = selectedBudgetDate?.nextPayDate;

    if (parseFloat(accumulatedSavings) < parseFloat(savingsGoal)) {
        const amountToSave = Math.min(payLeft, savingsGoal - accumulatedSavings);
        accumulatedSavings += amountToSave; // Add current savings to accumulated savings
        savingPayments.push({ savingAmount: accumulatedSavings, payDate: nextPayDate });
        nextPayDate = onPressNextArrow(income?.frequency, selectedBudgetDate?.nextPayDate);
        calculateGraphSavings(selectedBudget, { nextPayDate: nextPayDate }, savingsGoal, savingPayments, accumulatedSavings);
    } else {
        // Insufficient pay left to save or other conditions met
    }
};

export const calculateProjectedSavings = (selectedBudget, selectedBudgetDate, targetDate, savingPayments = [], accumulatedSavings = 0) => {
    // const income = selectedBudget?.Income[0];
    // const expenses = calculateShowingExpenses(income, selectedBudget, selectedBudgetDate);
    // const totalExpenses = calculateTotalPayments([], expenses ?? [], []) ?? 0;
    // const payLeft = parseFloat(income?.netIncome) - totalExpenses - selectedBudget?.accountMinimum;
    // let nextPayDate = moment(selectedBudgetDate?.nextPayDate, 'MM/DD/YYYY');
    // const targetDateMoment = moment(targetDate, 'MM/DD/YYYY');

    // if (nextPayDate.isBefore(targetDateMoment)) {
    //     const daysUntilTarget = targetDateMoment.diff(nextPayDate, 'days');
    //     const amountToSave = Math.min(payLeft, daysUntilTarget);
    //     accumulatedSavings += amountToSave; // Add current savings to accumulated savings
    //     savingPayments.push({ savingAmount: accumulatedSavings, payDate: nextPayDate});
    //     console.log('savingPayments', savingPayments)
    //     nextPayDate = nextPayDate.add(1, 'day');
    //     calculateGraphSavings(selectedBudget, { nextPayDate: nextPayDate.format('MM/DD/YYYY') }, targetDate, savingPayments, accumulatedSavings);
    // } else {
    //     // Target date reached or other conditions met
    // }

    const income = selectedBudget?.Income[0];
    const expenses = calculateShowingExpenses(income, selectedBudget, selectedBudgetDate);
    const totalExpenses = calculateTotalPayments([], expenses ?? [], []) ?? 0;
    const payLeft = parseFloat(income?.netIncome) - totalExpenses - selectedBudget?.accountMinimum;
    let nextPayDate = selectedBudgetDate?.nextPayDate;

    if (moment(nextPayDate, 'MM/DD/YYYY').isBefore(moment(targetDate, 'MM/DD/YYYY')) || moment(nextPayDate, 'MM/DD/YYYY').isSame(moment(targetDate, 'MM/DD/YYYY'))) {
        const amountToSave = Math.min(payLeft, accumulatedSavings);
        accumulatedSavings += amountToSave; // Add current savings to accumulated savings
        savingPayments.push({ savingAmount: accumulatedSavings, payDate: nextPayDate });
        nextPayDate = onPressNextArrow(income?.frequency, selectedBudgetDate?.nextPayDate);
        calculateProjectedSavings(selectedBudget, { nextPayDate: nextPayDate }, targetDate, savingPayments, accumulatedSavings);
    } else {
        // Insufficient pay left to save or other conditions met
    }
};





export function formatNumberAbbreviated(number) {
    const SI_SYMBOL = ["", "k", "M", "B", "T"];

    if (isNaN(number)) {
        return "";
    }

    if (number === 0) {
        return "0";
    }

    const order = Math.floor(Math.log10(Math.abs(number)) / 3);
    const abbreviation = SI_SYMBOL[order];
    const formattedNumber = (number / Math.pow(1000, order)).toFixed(2);

    return `${formattedNumber}${abbreviation}`;
}

export const categorizeExpenses = (expenses) => {
    const categorizedExpenses = expenses?.reduce((categories, expense) => {
        const { expenseType } = expense;
        if (!categories[expenseType]) {
            categories[expenseType] = [];
        }
        categories[expenseType].push(expense);
        return categories;
    }, {});

    return categorizedExpenses
}
