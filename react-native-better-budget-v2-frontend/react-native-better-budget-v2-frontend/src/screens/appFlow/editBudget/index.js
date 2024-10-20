import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, Modals, Spacers, TextInputs, Wrappers } from '../../../components';
import { MultipleView } from '../../../screenComponents/createBudget';
import { colors, routes, selectedCurrencySymbol } from '../../../services';
import { width } from "react-native-dimension";
import { getDisabledDates } from '../../../services/utils/helperFunctions';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';

const EditBudget = ({ navigation }) => {
    // useStates
    const [editBudget, setEditBudget] = useState(false);
    const [budgetName, setBudgetName] = useState('');
    const [currency, setCurrency] = useState('US Dollar');
    const [feature, setFeature] = useState('Enable');
    const [incomeType, setIncomeType] = useState('Fixed');
    const [incomeSource, setIncomeSource] = useState('');
    const [accountMinimum, setAccountMinimum] = useState('');
    const [netIncome, setNetIncome] = useState('');
    const [frequency, setFrequency] = useState('');
    const [nextPayDate, setNextPayDate] = useState('');
    const [markedDates, setMarkedDates] = useState({})
    const [debtIncome, setDebtIncome] = useState([{ incomeCategory: 'Primary Income', incomeSource: 'Income Source' }, { incomeCategory: 'Additional Income', incomeSource: 'Income Source' }])
    //Modals
    const [isModalFeatureVisible, setModalFeatureVisible] = useState(false);
    const [isModalMinimumVisible, setModalMinimunVisible] = useState(false);
    const [isModalBottomVisible, setModalBottomVisible] = useState(false);
    const [isModalDateVisible, setModalDateVisible] = useState(false);
    const [isModalDebtsVisible, setModalDebtsVisible] = useState(false);

    //All Functions
    // select date function
    const onSetDate = _date => {
        setNextPayDate(_date);
        setModalDateVisible(!isModalDateVisible);
    };

    // debt remove function
    const onPressRemoveIcon = (index) => {
        let debts = [...debtIncome];
        let target = debts[index];
        debts.splice(index, 1);
        setDebtIncome(debts)
    }

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            <Headers.Main
                title={Translate('Budget')}
                rightTitle={editBudget == false ? Translate('Edit') : Translate('Done')}
                rightTitleStyles={{ width: width(10) }}
                onPressRightText={() => setEditBudget(!editBudget)}
                onBackPress={() => navigation.goBack()}
            />

            <Wrappers.Component>
                <Spacers.Base />
                <TextInputs.TextInputLowerBordered
                    placeholder={Translate('budgetName')}
                    value={budgetName}
                    onChangeText={bn => setBudgetName(bn)}
                />
                <Spacers.Base />

                <TouchableOpacity onPress={() => setModalDebtsVisible(!isModalDebtsVisible)} activeOpacity={0.5}>
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
                                onPress={() => setModalMinimunVisible(!isModalMinimumVisible)}
                            />
                        }
                    />
                </TouchableOpacity>
                <Spacers.Base />

                <MultipleView
                    Title={Translate('incomeType')}
                    Value1="Fixed"
                    Value2="Variable"
                    onPress={v => setIncomeType(v)}
                    textColor={
                        incomeType == 'Fixed'
                            ? colors.white
                            : colors.placeholderColor
                    }
                    viewColor={
                        incomeType == 'Fixed' ? colors.textColor : colors.lightRed
                    }
                    textColor1={
                        incomeType == 'Variable'
                            ? colors.white
                            : colors.placeholderColor
                    }
                    viewColor1={
                        incomeType == 'Variable' ? colors.textColor : colors.lightRed
                    }
                />
                <Spacers.Base />

                {incomeType == 'Fixed' ? (
                    <Wrappers.Wrapper>
                        <TextInputs.TextInputLowerBorder
                            title={Translate('netIncome')}
                            placeholder="0"
                            value={netIncome}
                            keyboardType={'numeric'}
                            onChangeText={ni => setNetIncome(ni)}
                            Currency={selectedCurrencySymbol(currency)}
                        />
                        <Spacers.Base />
                    </Wrappers.Wrapper>
                ) : null}

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
                            value={accountMinimum}
                            keyboardType={'numeric'}
                            onChangeText={am => setAccountMinimum(am)}
                            Currency={selectedCurrencySymbol(currency)}
                            right={
                                <Icon
                                    name={'info'}
                                    type="feather"
                                    size={24}
                                    onPress={() => setModalMinimunVisible(!isModalMinimumVisible)}
                                />
                            }
                        />
                        <Spacers.Base />
                    </Wrappers.Wrapper>
                ) : null}

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

            <Modals.BottomModal1
                isVisible={isModalBottomVisible}
                toggleModal={() => setModalBottomVisible(!isModalBottomVisible)}
                OnSelectValue={() => setModalBottomVisible(!isModalBottomVisible)}
                Title={Translate('selectFrequency')}
                Data={['Monthly', 'Semi-Monthly', 'Bi-Weekly', 'Weekly']}
                setFrequency={setFrequency}
                frequency={frequency}
            />


            <Modals.EditBudgetDebtsModal
                isVisible={isModalDebtsVisible}
                toggleModal={() => setModalDebtsVisible(!isModalDebtsVisible)}
                debtIncome={debtIncome}
                onPressRemoveIcon={(index) => { onPressRemoveIcon(index) }}
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

        </Wrappers.Wrapper>
    );
};

export default EditBudget;
