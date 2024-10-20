import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Buttons, Headers, Modals, Spacers, TextInputs, Texts, Wrappers } from '../../../../components';
import { colors, routes, selectedCurrencySymbol } from '../../../../services';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';
import { useDispatch, useSelector } from 'react-redux';
import { Budget } from '../../../../Redux/actions/App';
import { saveData, uniqueID } from '../../../../services/utils/utility';

const AddDebts = ({ navigation, route }) => {
    const dispatch = useDispatch()
    // Previous Screen data
    let { budgetDetail } = route?.params || {}

    // useStates
    const [debtName, setDebtName] = useState('');
    const [debtAmount, setDebtAmount] = useState('');
    const [debts, setDebts] = useState([])
    const [isModalDebtsVisible, setModalDebtsVisible] = useState(false);

    // All Functions
    // onPress countinue button
    const onPressCountinue = () => {
        let budget = { ...budgetDetail, Debts: debts }
        dispatch(Budget(budget))
        saveData('Budgets', budget?._id, budget)
        setModalDebtsVisible(!isModalDebtsVisible)
        navigation.navigate(routes.showBudgetDetail)
    }

    // onPress countinue button
    const onPressSkip = () => {
        dispatch(Budget(budgetDetail))
        saveData('Budgets', budgetDetail?._id, budgetDetail)
        navigation.navigate(routes.showBudgetDetail)
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
                        value={debtAmount}
                        keyboardType={'numeric'}
                        onChangeText={ea => setDebtAmount(ea)}
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
            />

            <Wrappers.Wrapper style={styles.absoluteText}>
                <TouchableOpacity activeOpacity={1} onPress={() => onPressSkip()}>
                    <Texts.SmallText style={styles.skipText}>{Translate('Skip')}</Texts.SmallText>
                </TouchableOpacity>
            </Wrappers.Wrapper>
        </Wrappers.Wrapper>
    );
};

export default AddDebts;
