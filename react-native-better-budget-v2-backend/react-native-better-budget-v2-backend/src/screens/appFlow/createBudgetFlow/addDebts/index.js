import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Buttons, Headers, Modals, Spacers, TextInputs, Texts, Wrappers } from '../../../../components';
import { colors, routes, selectedCurrencySymbol } from '../../../../services';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AllBudget, Budget } from '../../../../Redux/actions/App';
import { saveData, uniqueID, updateArrayObjectKey } from '../../../../services/utils/utility';
import { convert_numbers, remove_commas } from '../../../../services/utils/helperFunctions';
import { calculateNearestDateIndex } from '../../../../services/functions';
import { useIsFocused } from '@react-navigation/native';

const AddDebts = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const focused = useIsFocused()

    // redux data
    let redux_user = useSelector(state => state?.Auth?.user)
    let redux_myBudget = useSelector(state => state?.App?.userBudget)
    let redux_allBudget = useSelector(state => state?.App?.allBudget?? [], shallowEqual)

    // Previous Screen data
    let { budgetDetail } = route?.params || {}
    let { screen } = route?.params || ''

    // useStates
    const [myBudget, setMyBudget] = useState(redux_myBudget ?? []);
    const [allBudget, setAllBudget] = useState(redux_allBudget ?? []);
    const [user, setUser] = useState(redux_user ?? []);
    const [debtName, setDebtName] = useState('');
    const [debtAmount, setDebtAmount] = useState('');
    const [debts, setDebts] = useState([])
    const [isModalDebtsVisible, setModalDebtsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})
    const [allDebts, setAllDebts] = useState(redux_myBudget?.Debts ?? []);
    const [currentIndex, setCurrentIndex] = useState(0);



    useEffect(() => {
        setMyBudget(redux_myBudget ?? [])
        const index = calculateNearestDateIndex(redux_myBudget)
        setCurrentIndex(index)
        setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})
    }, [redux_myBudget, focused])
    // All useEffects
    // for set redux data in useStates
    useEffect(() => {
        setMyBudget(redux_myBudget)
        setAllBudget(redux_allBudget)
        setUser(redux_user)
    }, [redux_user, redux_myBudget])

    useEffect(() => {
        if (screen == 'expenses') {
            setAllDebts(selectedBudgetDate.debts_dates)
        }
        else {
            setAllDebts(redux_myBudget?.Debts ?? [])
        }
    }, [selectedBudgetDate, focused, screen])

    // All Functions
    // onPress countinue button
    const onPressCountinue = () => {
        setIsLoading(true)
        if (screen == 'expenses') {
            var local_budget = { ...selectedBudgetDate }
            local_budget.debts_dates = [...local_budget.debts_dates, ...debts]
            myBudget.budgetDates[currentIndex].debts_dates = local_budget.debts_dates
            setSelectedBudgetDate(local_budget)
            dispatch(Budget(myBudget))
            updateArrayObjectKey("Budgets", myBudget?._id, 'budgetDates', currentIndex, 'debts_dates', local_budget.debts_dates)
            setIsLoading(false)
            navigation.goBack()

        } else {
            let budget = { ...budgetDetail, Debts: debts }
            budget.budgetDates = [];
            budget.timeZone = -1 * new Date().getTimezoneOffset()
            budget.reminderTime = '05:00 AM'
            dispatch(Budget(budget))
            dispatch(AllBudget([...redux_myBudget, budget]))
            saveData('Budgets', budget?._id, budget)
            setModalDebtsVisible(!isModalDebtsVisible)
            setIsLoading(false)
            navigation.navigate(routes.expenses, { fromCreate: true })
        }
    }

    // onPress countinue button
    const onPressSkip = () => {
        budgetDetail.budgetDates = [];
        budgetDetail.Debts = []
        budgetDetail.timeZone = -1 * new Date().getTimezoneOffset()
        budgetDetail.reminderTime = '05:00 AM'

        dispatch(Budget(budgetDetail))
        dispatch(AllBudget([...redux_allBudget, budgetDetail]))
        saveData('Budgets', budgetDetail?._id, budgetDetail)
        navigation.navigate(routes.expenses, { fromCreate: true })
    }

    // debts add function
    const onPressAdd = () => {
        setDebtName('')
        setDebtAmount('')
        let id = uniqueID()
        let data = {
            id: id,
            debtName: debtName,
            debtAmount: debtAmount,
        }
        setDebts([...debts, data])
        setModalDebtsVisible(!isModalDebtsVisible)
    }

    // debt remove function
    const onPressRemoveIcon = (index) => {
        let debt = [...debts];
        let target = debt[index];
        debt.splice(index, 1);
        setDebts(debt)
    }

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <Headers.Main
                title={Translate('AddDebtScreen.Debts')}
                onBackPress={() => navigation.goBack()}
                tooltipStatus={false}
            />

            <Wrappers.Component>
                <Spacers.Base />

                <TextInputs.TextInputLowerBordered
                    placeholder={Translate('AddDebtScreen.debtName')}
                    value={debtName}
                    onChangeText={en => setDebtName(en)}
                />
                <Spacers.Base />

                <Wrappers.Wrapper>
                    <TextInputs.TextInputLowerBorder
                        title={Translate('totalAmount')}
                        placeholder="0"
                        value={convert_numbers(debtAmount)}
                        keyboardType={'numeric'}
                        onChangeText={ea => setDebtAmount(remove_commas(ea))}
                        Currency={selectedCurrencySymbol(budgetDetail?.currency)}
                    />
                </Wrappers.Wrapper>

                <Spacers.DoubleBase />
                <Wrappers.Component>
                    <Buttons.ButtonColored
                        text={Translate('Add')}
                        buttonColor={debtName && debtAmount ? colors.textColor : colors.disableText}
                        disabled={debtName && debtAmount ? false : true}
                        tintColor={colors.white}
                        onPress={() => onPressAdd()}
                    />
                </Wrappers.Component>
            </Wrappers.Component>

            <Modals.ShowDebtsModal
                isVisible={isModalDebtsVisible}
                toggleModal={() => setModalDebtsVisible(!isModalDebtsVisible)}
                onPressAddDebts={() => { setModalDebtsVisible(!isModalDebtsVisible) }}
                onPressCountinue={() => onPressCountinue()}
                debts={debts}
                onPressRemoveIcon={(index) => { onPressRemoveIcon(index) }}
                Currency={budgetDetail?.currency ? budgetDetail?.currency : myBudget?.currency}
                isLoading={isLoading}
            />

            {screen !== 'expenses' &&
                <Wrappers.Wrapper style={styles.absoluteText}>
                    <TouchableOpacity activeOpacity={1} onPress={() => onPressSkip()}>
                        <Texts.SmallText style={styles.skipText}>{Translate('Skip')}</Texts.SmallText>
                    </TouchableOpacity>
                </Wrappers.Wrapper>
            }
        </Wrappers.Wrapper>
    );
};

export default AddDebts;
