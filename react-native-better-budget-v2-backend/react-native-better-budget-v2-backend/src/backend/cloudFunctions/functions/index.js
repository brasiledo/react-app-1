const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const fieldValue = admin.firestore.FieldValue;
admin.initializeApp();

const firestore = admin.firestore();
const budgetsCollectionRef = firestore.collection('Budgets');

function uniqueID() {
    // this.setState({indicator: true});
    function chr4() {
        return Math.random()
            .toString(16)
            .slice(-4);
    }
    return (
        chr4() +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        chr4() +
        chr4()
    );
}


async function saveData(collection, doc, jsonObject) {
    await firestore
        .collection(collection)
        .doc(doc)
        .set(jsonObject, { merge: true })
        .catch(function (error) {
            throw error;
        });
    //console.log("Document successfully written!");
}

async function updateArrayObjectKey(collectionName, documentId, arrayFieldName, indexToUpdate, keyToUpdate, newValue) {

    const documentRef = firestore.collection(collectionName).doc(documentId);

    return documentRef.get()
        .then((doc) => {
            if (doc.exists) {
                const dataArray = doc.data()[arrayFieldName];
                const objectToUpdate = dataArray[indexToUpdate];

                // Update the specific key within the object
                objectToUpdate[keyToUpdate] = newValue;

                return documentRef.update({ [arrayFieldName]: dataArray });
            } else {
                throw new Error('Document does not exist.');
            }
        })
        .then(() => {
            console.log('Array object key updated successfully.');
        })
        .catch((error) => {
            console.error('Error updating array object key:', error);
        });
}

async function addToArray(collection, doc, array, value) {
    let docRef = await firestore.collection(collection).doc(doc);
    let docData = await docRef.get();
    if (docData.exists && docData.data()[array] != undefined) {
        docRef.update({
            [array]: fieldValue.arrayUnion(value),
        });
    } else {
        saveData(collection, doc, { [array]: [value] });
    }
}

async function getData(collection, doc, objectKey) {
    // check if data exists on the given path
    if (objectKey === undefined) {
        return firestore
            .collection(collection)
            .doc(doc)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    return doc.data();
                } else {
                    return false;
                }
            });
    } else {
        return firestore
            .collection(collection)
            .doc(doc)
            .get()
            .then(function (doc) {
                if (doc.exists && doc.data()[objectKey] != undefined) {
                    return doc.data()[objectKey];
                } else {
                    return false;
                }
            });
    }
}

const findNextDate = (payFrequency, payDate) => {
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

const calculateShowingExpenses = (primaryIncome, selectedBudget, selectedBudgetDate) => {
    let next_date = findNextDate(primaryIncome?.frequency, selectedBudgetDate?.nextPayDate)

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

const updateExpensesMonths = (expenses, date) => {
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


const calculateExpenseForFrequency = (budget_date, next_budget_date, expense_date, frequency) => {
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

const calculateNextDateBudget = async (next_date, selectedBudgetDate, primaryIncome, selectedBudget) => {

    let budget_date = {
        totalCurrentSaving: selectedBudgetDate?.totalCurrentSaving,
        carryOver: parseFloat(0),
        cycleSaveAmount: parseFloat(0),
        netIncome: selectedBudget?.Income[0]?.netIncome + (parseInt(selectedBudgetDate?.carryOver) ?? 0),
        nextPayDate: next_date,
        debts_dates: selectedBudgetDate?.debts_dates,
        notificationSent:false
    };

    const expenses = calculateShowingExpenses(primaryIncome, selectedBudget, budget_date)
    const updated_expenses = updateExpensesMonths(expenses, budget_date.nextPayDate)
    budget_date.expenses = updated_expenses

    console.log('budget_date', budget_date)

    console.log('selectedBudget', selectedBudget)

    addToArray('Budgets', selectedBudget?._id, 'budgetDates', budget_date)
};





exports.dailyUpdateIncomeDates = functions.pubsub
    .schedule('every day 00:00') // You can customize the schedule here (e.g., 'every 5 minutes', 'every day 09:00', etc.)
    .onRun(async (context) => {
        try {
            const today = moment().startOf('day');
            const snapshot = await budgetsCollectionRef.get();

            // Iterate through each document in the "Budgets" collection
            for (const doc of snapshot.docs) {
                const budget = doc.data();

                if (budget?.Income) {
                    // Use forEach to loop through the "Income" array and update "payDate"
                    budget?.Income?.forEach((income, index) => {
                        if (income?.nextPayDate) {
                            const payDate = moment(income?.nextPayDate, 'MM/DD/YYYY').startOf('day');

                            // Check if the payDate is today
                            if (payDate.isSame(today, 'day')) {
                                // Add 7 days to the payDate
                                income.nextPayDate = findNextDate(income?.frequency, income?.nextPayDate)
                                income.usedIncome = 0


                            }
                        }
                    });

                    // Update the "Income" array with the modified income objects
                    // await doc.ref.update({ Income: budget.Income });
                }
            }
            console.log('Date update completed.');
            return null;
        } catch (error) {
            console.error('Error updating dates:', error);
            return null;
        }
    });

exports.dailyUpdateBudgetDates = functions.pubsub
    .schedule('*/30 * * * *') // You can customize the schedule here (e.g., 'every 5 minutes', 'every day 09:00', etc.)
    .onRun(async (context) => {
        try {
            // const today = moment().startOf('day').format('MM/DD/YYYY');
            const snapshot = await budgetsCollectionRef.get();

            // Iterate through each document in the "Budgets" collection
            for (const doc of snapshot.docs) {
                const budget = doc.data();

                if (budget?.budgetDates?.length > 0) {
                    let today = moment().utcOffset(budget?.timeZone).format('MM/DD/YYYY')
                    const primaryIncome = budget?.Income[0]
                    const latestBudget = budget?.budgetDates[budget?.budgetDates?.length - 1]

                    if (today === latestBudget?.nextPayDate) {
                        const nextPayDate = findNextDate(primaryIncome?.frequency, latestBudget?.nextPayDate)
                        calculateNextDateBudget(nextPayDate, latestBudget, primaryIncome, budget)
                    }
                }
            }
            console.log('Date update completed.');
            return null;
        } catch (error) {
            console.error('Error updating dates:', error);
            return null;
        }
    });


exports.sendPayDayNotifications = functions.pubsub
    .schedule('*/30 * * * *') // You can customize the schedule here (e.g., 'every 5 minutes', 'every day 09:00', etc.)
    .onRun(async (context) => {
        try {
            // const today = moment().startOf('day').format('MM/DD/YYYY');
            const snapshot = await budgetsCollectionRef.get();

            // Iterate through each document in the "Budgets" collection
            for (const doc of snapshot.docs) {
                const budget = doc.data();

                if (budget?.budgetDates?.length > 0) {
                    const today = moment().utcOffset(budget?.timeZone).format('MM/DD/YYYY')
                    const reminderTime = budget?.reminderTime ?? "05:00 AM"
                    const primaryIncome = budget?.Income[0]
                    const latestBudget = budget?.budgetDates?.find((i) => i?.nextPayDate === today && i?.notificationSent != true)
                    const latestBudgetIndex = budget?.budgetDates?.findIndex((i) => i?.nextPayDate === today && i?.notificationSent != true)

                    if (latestBudget && moment().utcOffset(budget?.timeZone).format('hh:mm A') === reminderTime) {
                        const _id = uniqueID();
                        const notification = {
                            title: 'Payday is here!',
                            text: 'Hey there, your payday is today. Open the app to check out your budget now!',
                            userId: budget.userId,
                            id: _id,
                            createdAt: Date.parse(new Date())
                        };
                        updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', latestBudgetIndex, 'notificationSent', true)
                        saveData('Notifications', _id, notification);
                    }
                }
            }
            console.log('Date update completed.');
            return null;
        } catch (error) {
            console.error('Error updating dates:', error);
            return null;
        }
    });


exports.SendPushNotifications = functions.firestore
    .document('Notifications/{id}')
    .onCreate(async (snap, context) => {
        let data = snap.data();
        let { title, text, userId } = data

        getData('Users', userId).then(async (user) => {
            const payload = {
                notification: {
                    title: title,
                    body: text,
                }
            }
            admin.messaging().sendToDevice(user?.fcm_token, payload)
        })
            .catch((err) => {
                console.log(err)
            })
    })



