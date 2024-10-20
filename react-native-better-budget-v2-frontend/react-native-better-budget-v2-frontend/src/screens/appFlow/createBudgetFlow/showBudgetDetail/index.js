import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Buttons, Headers, Modals, Spacers, Wrappers } from '../../../../components';
import { DebtsHeader, ExpenseHeader } from '../../../../components/staticComponents';
import { ShowDebts } from '../../../../screenComponents/showDebts';
import { SwipableListButton } from '../../../../screenComponents/showExpenses';
import { colors, routes } from '../../../../services';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';
import { useDispatch, useSelector } from 'react-redux';
import { Budget } from '../../../../Redux/actions/App';
import { saveData } from '../../../../services/utils/utility';

const ShowBudgetDetail = ({ navigation, route }) => {

    const dispatch = useDispatch()
    // redux data
    let _budget = useSelector(state => state?.App?.userBudget)

    // useStates
    const [budget, setBudget] = useState(_budget ?? []);
    const [editExpenses, setEditExpenses] = useState(false);
    const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [selectedDebts, setSelectedDebts] = useState([]);
    const [editExpenseData, setEditExpenseData] = useState({});
    const [editExpenseAmount, setEditExpenseAmount] = useState(editExpenseData?.expenseAmount ?? '');
    const [allExpenses, setAllExpenses] = useState(_budget?.Expenses ?? []);
    const [allDebts, setAllDebts] = useState(_budget?.Debts ?? []);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    // All useEffects
    // set budget values
    useEffect(() => {
        setBudget(_budget)
    }, [_budget])

    // All Functions
    // onPress finish button
    const onPressFinish = () => {
        navigation.replace(routes.app)
    }

    // render flatlist for expenses
    const showExpenses = ({ item, index }) => {
        return (
            <SwipableListButton
                index={editExpenses ? '' : index}
                currentlyOpenIndex={currentlyOpenIndex}
                setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(editExpenses ? '' : index)}
                ExpenseName={item?.expenseName}
                ExpenseFrequency={item?.expenseFrequency}
                ExpenseDate={item?.firstBillDue}
                ExpenseAmount={item?.expenseAmount}
                editButton={editExpenses}
                checked={selectedExpenses.includes(index) === true ? true : false}
                onValueChange={() => onClickExpenses(index)}
                onPress={() => {
                    setEditModal(!editModal)
                    setEditExpenseData(item)
                    setEditExpenseAmount(item?.expenseAmount)
                }}
            />
        )
    }

    // render flatlist for debts
    const showDebts = ({ item, index }) => {
        return (
            <ShowDebts
                DebtsName={item?.debtName}
                DebtsAmount={item?.debtAmount}
                editButton={editExpenses}
                checked={selectedDebts.includes(index) === true ? true : false}
                onValueChange={() => onClickDebts(index)}
            />
        )
    }

    // when press on 'edit' or 'done' text
    const onPressHeaderLeftText = () => {
        setSelectedExpenses([])
        setSelectedDebts([])
        setEditExpenses(!editExpenses)
    }

    // when press on 'delete' text
    const onPressDelete = async () => {
        if (selectedDebts?.length > 0 && selectedExpenses?.length > 0) {
            await deleteExpense()
            await deleteDebts()
        } else if (selectedDebts?.length > 0 && selectedExpenses?.length == 0) {
            deleteDebts()
        } else {
            deleteExpense()
        }
        setEditExpenses(!editExpenses)
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

    // Expenses delete Function
    const deleteExpense = () => {
        const filteredExpenses = allExpenses?.filter(
            (item, index) => !selectedExpenses.includes(index),
        );
        setAllExpenses(filteredExpenses);
        setSelectedExpenses([])
        budget.Expenses = filteredExpenses
        dispatch(Budget(budget))
        saveData('Budgets', budget?._id, { Expenses: budget?.Expenses })
    }

    // Debts delete Function
    const deleteDebts = () => {
        const filteredDebts = allDebts?.filter(
            (item, index) => !selectedDebts.includes(index),
        );
        setAllDebts(filteredDebts);
        setSelectedDebts([])
        budget.Debts = filteredDebts
        dispatch(Budget(budget))
        saveData('Budgets', budget?._id, { Debts: budget?.Debts })
    }

    // when user edit the expense amount
    const onPressEditDone = (selectedId) => {
        let filteredArray = allExpenses?.filter(item => {
            if (item?.id === selectedId?.id) {
                item.expenseAmount = editExpenseAmount
            }
        })
        budget.Expenses = allExpenses
        dispatch(Budget(budget))
        saveData('Budgets', budget?._id, { Expenses: budget?.Expenses })
        setEditModal(!editModal)
    }

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <Headers.Main
                title={Translate('Expenses')}
                leftTitle={editExpenses ? Translate('Done') : Translate('Edit')}
                rightTitle={editExpenses ? Translate('Delete') : '         '}
                onPressLeftText={() => onPressHeaderLeftText()}
                onPressRightText={() => setDeleteModal(!deleteModal)}
            />

            <ScrollView style={!editExpenses ? styles.bottomView : {}}>
                <Spacers.Small />
                <Wrappers.Wrapper>
                    <ExpenseHeader />
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

            <Modals.EditModal
                isVisible={editModal}
                toggleModal={() => setEditModal(!editModal)}
                onChangeVisibility={() => setEditModal(!editModal)}
                Title={Translate('editExpense')}
                // value={editExpenseAmount}
                editExpenseAmount={editExpenseAmount}
                setEditExpenseAmount={setEditExpenseAmount}
                onPressExpenseData={editExpenseData}
                expenseAmount={editExpenseData?.expenseAmount}
                onPressDone={(editId) => onPressEditDone(editId)}
            />

            {!editExpenses &&
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

export default ShowBudgetDetail;
