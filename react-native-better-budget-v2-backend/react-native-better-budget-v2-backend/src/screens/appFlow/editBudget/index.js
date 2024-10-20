import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, Modals, ScrollViews, Spacers, TextInputs, Wrappers } from '../../../components';
import { MultipleView } from '../../../screenComponents/createBudget';
import { colors, routes, selectedCurrency, selectedCurrencySymbol } from '../../../services';
import { convert_numbers, getDisabledDates, remove_commas } from '../../../services/utils/helperFunctions';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';
import moment from 'moment';
import { saveData } from '../../../services/utils/utility';
import { useDispatch, useSelector } from 'react-redux';
import { Budget, BudgetIndex } from '../../../Redux/actions/App';
import Toast from 'react-native-root-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Currencies } from '../../../services/dummyData';
import { width, height, totalSize } from "react-native-dimension";
import { useIsFocused } from '@react-navigation/native';
import { calculateNearestDateIndex } from '../../../services/functions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EditBudget = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const focused = useIsFocused()

    // previous screen data
    let redux_myBudget = useSelector(state => state?.App?.userBudget)

    // useStates
    const [budget, setBudget] = useState(redux_myBudget)
    const [budgetIncome, setBudgetIncome] = useState(redux_myBudget?.Income ?? [])
    const [budgetName, setBudgetName] = useState(budget?.budgetName ?? '');
    const [currency, setCurrency] = useState(budget?.currency);
    const [feature, setFeature] = useState(budget?.feature ?? '');
    const [incomeType, setIncomeType] = useState(budgetIncome[0]?.incomeType ?? '');
    const [incomeSource, setIncomeSource] = useState(budgetIncome[0]?.incomeSource ?? '');
    const [accountMinimum, setAccountMinimum] = useState(budget?.accountMinimum ?? '');
    const [netIncome, setNetIncome] = useState(budgetIncome[0]?.netIncome ?? '');
    const [frequency, setFrequency] = useState(budgetIncome[0]?.frequency ?? '');
    const [nextPayDate, setNextPayDate] = useState(budgetIncome[0]?.nextPayDate ?? '');
    const [markedDates, setMarkedDates] = useState({})
    const [incomeIndex, setIncomeIndex] = useState(0)
    const [reminderTime, setReminderTime] = useState(redux_myBudget?.reminderTime ?? "05:00 AM");

    const [isLoading, setIsLoading] = useState(false)


    const [selectedBudgetDate, setSelectedBudgetDate] = useState(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[0] : {})
    const [selectedBudget, setSelectedBudget] = useState(redux_myBudget ?? {})
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


    //Modals
    const [isModalFeatureVisible, setModalFeatureVisible] = useState(false);
    const [isModalMinimumVisible, setModalMinimunVisible] = useState(false);
    const [isModalBottomVisible, setModalBottomVisible] = useState(false);
    const [isCurrencyModalBottomVisible, setCurrencyModalBottomVisible] = useState(false);
    const [isModalDateVisible, setModalDateVisible] = useState(false);
    const [isModalDebtsVisible, setModalDebtsVisible] = useState(false);
    const [additionalIncomeModal, setAdditionalIncomeModal] = useState(false)

    //USE EFFECT
    useEffect(() => {
        setSelectedBudgetDate(selectedBudget?.budgetDates?.length > 0 ? selectedBudget?.budgetDates[currentIndex] : {})
    }, [currentIndex])

    useEffect(() => {
        if (focused || redux_myBudget) {
            const index = calculateNearestDateIndex(redux_myBudget)
            setCurrentIndex(index)
            setSelectedBudget(redux_myBudget)
            setSelectedBudgetDate(redux_myBudget?.budgetDates?.length > 0 ? redux_myBudget?.budgetDates[index] : {})
        }

    }, [redux_myBudget, focused])

    //All Functions
    // select date function
    const onSetDate = _date => {
        setNextPayDate(moment(_date?.dateString).format('MM/DD/YYYY'))
        setModalDateVisible(!isModalDateVisible);
    };

    const handleConfirmReminderTime = time => {
        setReminderTime(moment(time).format('hh:mm A'));
        setTimePickerVisibility(!isTimePickerVisible)
    };

    // debt remove function
    const onPressRemoveIcon = (index) => {
        let debts = [...budgetIncome];
        let target = debts[index];
        debts.splice(index, 1);
        setBudgetIncome(debts)
    }

    // onPress edit or done text in the header
    const onPressRightText = () => {
        setIsLoading(!isLoading)
        // budget.budgetName = budgetName
        // budget.incomeSource = incomeSource
        // budget.Income[incomeIndex].incomeType = incomeType
        // budget.Income[incomeIndex].netIncome = netIncome
        // budget.Income[incomeIndex].frequency = frequency
        // budget.Income[incomeIndex].nextPayDate = nextPayDate
        // budget.Income[incomeIndex].currency = currency
        // budget.feature = feature
        // budget.accountMinimum = accountMinimum
        // budget.budgetDates = []

        // dispatch(Budget(budget))

        // saveData('Budgets', budget?._id, budget).then((res) => {
        //     setIsLoading(!isLoading)
        //     navigation.goBack()
        // })

        var new_budget = { ...selectedBudgetDate }
        const new_income = parseInt(netIncome)
        new_budget.netIncome = new_income
        new_budget.nextPayDate = nextPayDate

        var new_current_budget = { ...selectedBudget }
        new_current_budget.budgetDates[currentIndex] = new_budget
        new_current_budget.Income[incomeIndex].netIncome = new_income
        new_current_budget.Income[incomeIndex].nextPayDate = nextPayDate
        new_current_budget.Income[incomeIndex].incomeType = incomeType
        new_current_budget.Income[incomeIndex].frequency = frequency
        new_current_budget.Income[incomeIndex].currency = currency
        new_current_budget.feature = feature
        new_current_budget.accountMinimum = accountMinimum
        new_current_budget.budgetName = budgetName
        new_current_budget.timeZone = -1 * new Date().getTimezoneOffset()
        new_current_budget.reminderTime = reminderTime ?? '05:00 AM'
            // new_current_budget.incomeSource = incomeSource
            // new_current_budget.budgetDates[currentIndex].netIncome = new_income

            dispatch(Budget(new_current_budget))
        // updateArrayObjectKey('Budgets', selectedBudget?._id, 'budgetDates', currentIndex, 'netIncome', new_income)
        saveData('Budgets', selectedBudget?._id, new_current_budget).then((res) => {
            setIsLoading(!isLoading)
            navigation.goBack()
        })


    }

    const saveBtnValidation = () => {
        const primaryBudget = budgetIncome
        if (budget?.budgetName == budgetName &&
            budget?.Income == budgetIncome &&
            primaryBudget?.incomeType == incomeType &&
            primaryBudget?.netIncome == netIncome &&
            primaryBudget?.frequency == frequency &&
            primaryBudget?.nextPayDate == nextPayDate &&
            budget?.feature == feature &&
            budget?.accountMinimum == accountMinimum
        ) {
            return true
        } else {
            return false
        }
    }

    const onPressAddIcon = (item, index) => {
        if (item == Translate('MyBudgetScreen.addAdditionalIncome')) {
            //code here
            setAdditionalIncomeModal(false)
            navigation.navigate(routes.addNetIncome, { fromEdit: true, setBudget: setBudget, setBudgetIncome: setBudgetIncome, budget: budget, budgetIncome });
        }
        else {
            setAdditionalIncomeModal(false)
            setIncomeType(item?.incomeType)
            setIncomeSource(item?.incomeSource)
            setNetIncome(item?.netIncome)
            setFrequency(item.frequency)
            setNextPayDate(item.nextPayDate)
            setIncomeIndex(index)

            // const objectIndex = budgetIncome.findIndex(obj => JSON.stringify(obj) === JSON.stringify(item));

            // if (objectIndex > -1) {
            //     // Remove the object from its original index
            //     const removedObject = budgetIncome.splice(objectIndex, 1)[0];

            //     // Place the object at index 0
            //     budgetIncome.unshift(removedObject);
            // }

            setBudgetIncome(budgetIncome)
            const new_budget = { ...budget }
            new_budget.Income = budgetIncome
            setBudget(new_budget)

        }
    }

    const onDragEnd = (data) => {
        // const item = data[0]
        // setAdditionalIncomeModal(false)
        // setIncomeType(item?.incomeType)
        // setIncomeSource(item?.incomeSource)
        // setNetIncome(item?.netIncome)
        // setFrequency(item.frequency)
        // setNextPayDate(item.nextPayDate)
        // setIncomeIndex(0)
        const filteredBudgetLocal = data.filter((i) => i !== Translate('MyBudgetScreen.addAdditionalIncome'))
        setBudgetIncome(filteredBudgetLocal)
        const new_budget = { ...budget }
        new_budget.Income = filteredBudgetLocal
        new_budget.budgetDates = []
        setBudget(new_budget)
        dispatch(Budget(new_budget))
        dispatch(BudgetIndex(0))
        saveData('Budgets', new_budget?._id, new_budget)
    }

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <ScrollViews.KeyboardAvoiding>
                <GestureHandlerRootView>
                    <Headers.EditBudgetHeader
                        title={Translate('MyBudgetScreen.editBudget')}
                        rightTitle={Translate('MyBudgetScreen.Save')}
                        onPressRightText={() => onPressRightText()}
                        color={saveBtnValidation() ? colors.disableText : colors.dodgerBlue}
                        disabled={saveBtnValidation() ? true : false}
                        onBackPress={() => navigation.goBack()}
                        tooltipStatus={false}
                        isLoading={isLoading}
                    />

                    <Wrappers.Component>
                        <Spacers.Base />
                        <TextInputs.TextInputLowerBordered
                            placeholder={Translate('budgetName')}
                            value={budgetName}
                            onChangeText={bn => setBudgetName(bn)}
                        />
                        <Spacers.Base />

                        {/* {budget?.Income?.length !== 1 ? */}
                        <TouchableOpacity onPress={() => setAdditionalIncomeModal(!additionalIncomeModal)} activeOpacity={0.5}>
                            <TextInputs.TextInputLowerBordered
                                placeholder={Translate('incomeSource')}
                                value={incomeSource}
                                onChangeText={bn => setIncomeSource(bn)}
                                editable={false}
                                right={
                                    <Icon
                                        name={incomeSource ? 'triangle-down' : 'controller-play'}
                                        type="entypo"
                                        size={12}
                                        onPress={() => setAdditionalIncomeModal(!additionalIncomeModal)}
                                    />
                                }
                            />
                        </TouchableOpacity>

                        <Spacers.Base />

                        <Wrappers.Wrapper>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setCurrencyModalBottomVisible(!isCurrencyModalBottomVisible)}>
                                <TextInputs.TextInputLowerBorder
                                    title={Translate('Currency')}
                                    value={`${selectedCurrencySymbol(currency)} ${selectedCurrency(currency)}`}
                                    editable={false}
                                    right={<Icon name={'controller-play'} type="entypo" size={12} />}
                                />
                            </TouchableOpacity>
                        </Wrappers.Wrapper>

                        <Spacers.Base />

                        <MultipleView
                            Title={Translate('incomeType')}
                            Value1="Fixed"
                            Value2="Variable"
                            onPress={v => {
                                setIncomeType(v + ' Income')
                                setNetIncome('0')
                            }}
                            textColor={
                                incomeType == 'Fixed Income'
                                    ? colors.white
                                    : colors.placeholderColor
                            }
                            viewColor={
                                incomeType == 'Fixed Income' ? colors.textColor : colors.lightRed
                            }
                            textColor1={
                                incomeType == 'Variable Income'
                                    ? colors.white
                                    : colors.placeholderColor
                            }
                            viewColor1={
                                incomeType == 'Variable Income' ? colors.textColor : colors.lightRed
                            }
                        />
                        <Spacers.Base />

                        {incomeType == 'Fixed Income' ? (
                            <Wrappers.Wrapper>
                                <TextInputs.TextInputLowerBorder
                                    title={Translate('netIncome')}
                                    placeholder="0"
                                    value={convert_numbers(netIncome)}
                                    keyboardType={'numeric'}
                                    onChangeText={text => {
                                        setNetIncome(remove_commas(text))
                                    }}
                                    Currency={selectedCurrencySymbol(currency)}
                                />
                                <Spacers.Base />
                            </Wrappers.Wrapper>
                        ) :
                            (
                                <Wrappers.Wrapper>
                                    <TextInputs.TextInputLowerBorder
                                        title={Translate('variableIncome')}
                                        placeholder="0"
                                        value={convert_numbers(netIncome)}
                                        keyboardType={'numeric'}
                                        onChangeText={text => {
                                            setNetIncome(remove_commas(text))
                                        }}
                                        Currency={selectedCurrencySymbol(currency)}
                                    />
                                    <Spacers.Base />
                                </Wrappers.Wrapper>
                            )}

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setModalBottomVisible(!isModalBottomVisible)}>
                            <TextInputs.TextInputLowerBorder
                                title={Translate('Frequency')}
                                placeholder={Translate('Select')}
                                placeholderColor={colors.lightSilver}
                                value={frequency}
                                editable={false}
                                right={
                                    <Icon
                                        name={frequency ? 'triangle-down' : 'controller-play'}
                                        type="entypo"
                                        size={12}
                                    />
                                }
                            />
                            <Spacers.Base />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setModalDateVisible(!isModalDateVisible)}>
                            <TextInputs.TextInputLowerBorder
                                title={Translate('nextPayDate')}
                                placeholder={Translate('Select')}
                                placeholderColor={colors.lightSilver}
                                value={nextPayDate}
                                editable={false}
                                right={
                                    <Icon
                                        name={nextPayDate ? 'triangle-down' : 'controller-play'}
                                        type="entypo"
                                        size={12}
                                    />
                                }
                            />
                        </TouchableOpacity>


                        <Spacers.Base />
                        <MultipleView
                            Title={Translate('featureTitle')}
                            Value1="Enable"
                            Value2="Disable"
                            onPressIcon={() => {
                                setModalFeatureVisible(!isModalFeatureVisible);
                            }}
                            onPress={v => setFeature(v)}
                            textColor={
                                feature == 'Enable' ? colors.white : colors.placeholderColor
                            }
                            viewColor={feature == 'Enable' ? colors.textColor : colors.lightRed}
                            textColor1={
                                feature == 'Disable' ? colors.white : colors.placeholderColor
                            }
                            viewColor1={feature == 'Disable' ? colors.textColor : colors.lightRed}
                        />

                        <Spacers.Base />
                        {feature == 'Enable' ? (
                            <Wrappers.Wrapper>
                                <TextInputs.TextInputLowerBorder
                                    title={Translate('minimumAmountTitle')}
                                    placeholder="0"
                                    value={convert_numbers(accountMinimum)}
                                    keyboardType={'numeric'}
                                    onChangeText={text => {
                                        setAccountMinimum(remove_commas(text))
                                    }}
                                    Currency={selectedCurrencySymbol(currency)}
                                    right={
                                        <Icon
                                            name={'info'}
                                            type="feather"
                                            size={24}
                                            onPress={() => setModalMinimunVisible(!isModalMinimumVisible)}
                                            disabledStyle={{ backgroundColor: colors.white }}
                                        />
                                    }
                                />
                                <Spacers.Base />
                            </Wrappers.Wrapper>
                        ) : null}



                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setTimePickerVisibility(!isTimePickerVisible)}>
                            <TextInputs.TextInputLowerBorder
                                title={Translate('ProfileScreen.reminderTitle')}
                                placeholder="05:00 AM"
                                placeholderColor={colors.graySilver}
                                value={reminderTime}
                                editable={false}
                                right={
                                    <TouchableOpacity onPress={() => setTimePickerVisibility(!isTimePickerVisible)}>
                                        <Icon
                                            name='clock'
                                            type='feather'
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                            <Spacers.Base />
                        </TouchableOpacity>

                    </Wrappers.Component>

                    <Modals.CenterModal
                        isVisible={isModalFeatureVisible}
                        toggleModal={() => setModalFeatureVisible(!isModalFeatureVisible)}
                        Text={Translate('informationModal')}
                    />

                    <Modals.CenterModal
                        isVisible={isModalMinimumVisible}
                        toggleModal={() => setModalMinimunVisible(!isModalMinimumVisible)}
                        Text={Translate('informationModal1')}
                    />

                    {/* plus icon header */}
                    <Modals.SwipeItemsModal
                        isVisible={additionalIncomeModal}
                        toggleModal={() => setAdditionalIncomeModal(!additionalIncomeModal)}
                        onChangeVisibility={() => setAdditionalIncomeModal(!additionalIncomeModal)}
                        Title={Translate('MyBudgetScreen.selectPrimaryIncome')}
                        margin={true}
                        data={[...budgetIncome, Translate('MyBudgetScreen.addAdditionalIncome')]}
                        objKey={'incomeSource'}
                        swipeable={true}
                        onDragEnd={onDragEnd}
                        onPressItem={(item, index) => onPressAddIcon(item, index)}
                    />

                    <Modals.BottomModal1
                        isVisible={isModalBottomVisible}
                        toggleModal={() => setModalBottomVisible(!isModalBottomVisible)}
                        OnSelectValue={() => setModalBottomVisible(!isModalBottomVisible)}
                        Title={Translate('selectFrequency')}
                        Data={['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly']}
                        setFrequency={setFrequency}
                        frequency={frequency}
                    />


                    <Modals.EditBudgetDebtsModal
                        isVisible={isModalDebtsVisible}
                        toggleModal={() => setModalDebtsVisible(!isModalDebtsVisible)}
                        debtIncome={budgetIncome}
                        onPressRemoveIcon={(index) => { onPressRemoveIcon(index) }}
                    />

                    <Modals.BottomModal
                        isVisible={isCurrencyModalBottomVisible}
                        toggleModal={() => setCurrencyModalBottomVisible(!isCurrencyModalBottomVisible)}
                        OnSelectValue={() => setCurrencyModalBottomVisible(!isCurrencyModalBottomVisible)}
                        Title={Translate('Currency')}
                        Data={Currencies}
                        setCurrency={setCurrency}
                        currency={currency}
                        modalHeight={{ top: height(20) }}
                    />

                    <Modals.CalendarModal
                        isVisible={isModalDateVisible}
                        toggleModal={() => setModalDateVisible(!isModalDateVisible)}
                        onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
                        Title={Translate('nextPayDate')}
                        budgetType={frequency}
                        selectValue={_date => onSetDate(_date)}
                        markedDates={markedDates}
                        calculateDisabledDates={date => {
                            const year = date.year;
                            const month = date.month;
                            if (frequency == 'Semi-Monthly') {
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

                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmReminderTime}
                        onCancel={() => setTimePickerVisibility(!isTimePickerVisible)}
                        minuteInterval={30}
                    />

                </GestureHandlerRootView>
            </ScrollViews.KeyboardAvoiding>
        </Wrappers.Wrapper>
    );
};

export default EditBudget;
