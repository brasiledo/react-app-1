import React, { useState, useEffect } from 'react'
import { Buttons, Headers, Spacers, TextInputs, Texts, Wrappers } from '../../components'
import { BottomTabToolTips, DebtsHeader, DebtsHeaderHome, ExpenseHeader, ExpenseHeaderHome } from '../../components/staticComponents'
import { colors, routes, sizes } from '../../services'
import { Icon } from 'react-native-elements'
import { MultipleView } from '../../screenComponents/createBudget'
import { styles } from './styles'
import { TouchableOpacity } from 'react-native'
import { width, height, totalSize } from 'react-native-dimension'
import { FlatList } from 'react-native'
import { dummyDebts, dummyExpenses, dummyNotifications } from '../../services/dummyData'
import RoundCheckbox from '../../components/roundCheckBox'
import { CarryOverView, IncomeView, SaveAmountView, TotalAmountView } from '../../screenComponents/homeScreenComponents'
import PayDateArrows from '../../screenComponents/payDateArrows'
import moment from 'moment'
import { ProgressChart } from 'react-native-chart-kit'
import { BudgetDetailBox, ChartDate, DebtsChart, NoDebtsChart } from '../../screenComponents/insightBox'
import Slider from '@react-native-community/slider'
import Notification from '../../assets/svgs/notification'
import { CommonActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { saveData } from '../../services/utils/utility'

const TutorialFlow = ({ navigation }) => {

    // Redux Data
    const reduxData = useSelector(state => state?.Auth?.user)

    // All useStates
    const [tooltipValue, setTooltipValue] = useState(0);
    const [user, setUser] = useState(reduxData ?? {});

    //All useEffects
    useEffect(() => {
        setUser(reduxData ?? {})
    }, [reduxData])

    // All Functions
    const onPressScreen = () => {
        if (tooltipValue == 31) {
            saveData('Users', user?.userId, { firstTimeLogin: false })
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: routes.app }],
                }),
            );
        } else {
            setTooltipValue(tooltipValue + 1)
        }
    }

    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            {/* <StatusBar backgroundColor={'rgba(127, 127, 127, 1)'} barStyle={'dark-content'} /> */}
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={onPressScreen}>

                {tooltipValue < 12 ?
                    <Headers.Main title={tooltipValue < 10 ? "Create Budget" : 'Recurring Expenses'}
                        headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }} />
                    :
                    (tooltipValue > 11 && tooltipValue < 16) ?
                        <Headers.Main
                            title="Expenses"
                            leftTitle={(tooltipValue == 12 || tooltipValue == 13) ? "Edit" : "Done"}
                            rightTitle={(tooltipValue == 12 || tooltipValue == 13) ? '         ' : 'Delete'}
                            headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }}
                            tooltipValue={tooltipValue == 12 ? styles.popupPointHeaderExpense : {}}
                            tooltipValueText={tooltipValue == 12 ? styles.tooltipValueText : {}}
                        />
                        :
                        (tooltipValue > 15 && tooltipValue < 26) ?
                            <Headers.MyBudgetHeader
                                title={'Dan Budget'}
                                headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }}
                                tooltipValue={tooltipValue == 16 ? { ...styles.popupPointHomeDots } : {}}
                                marginRight={width(10)}
                                tooltipValue1={tooltipValue == 17 ? { ...styles.popupPointHomeName } : {}}
                                tooltipValue2={tooltipValue == 18 ? { ...styles.popupPointHomePlus } : {}}
                                tooltipValue3={tooltipValue == 19 ? { ...styles.popupPointHomeUser } : {}}
                                tooltipValueText={tooltipValue == 16 ? { alignSelf: 'center', justifyContent: 'center', marginRight: 0 } : {}}
                            />
                            :
                            (tooltipValue > 25 && tooltipValue < 31) ?
                                <Headers.EmptyViewHeader
                                    title="Insights"
                                    headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }}
                                    onPressProfileIcon={{}}
                                    tooltipValue={tooltipValue == 26 ? { ...styles.popupPointHomeDots } : {}}
                                />
                                :
                                <Headers.Main
                                    headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }}
                                    title="Notifications"
                                    leftTitle={"Edit"}
                                />
                }

                {tooltipValue < 5 ?
                    <Wrappers.Component>
                        <Spacers.Base />
                        <TextInputs.TextInputLowerBordered placeholder="Budget Name" />
                        <Spacers.Base />
                        <Wrappers.Wrapper>
                            {tooltipValue == 0 ?
                                <Wrappers.Wrapper>
                                    <Wrappers.Wrapper style={styles.popup}>
                                        <Texts.SmallText style={styles.popupText}>{'Tap here to select a different Currency'}</Texts.SmallText>
                                    </Wrappers.Wrapper>
                                    <Wrappers.Wrapper>
                                        <TouchableOpacity activeOpacity={1} style={styles.popupPoint}>
                                        </TouchableOpacity>
                                        <TextInputs.TextInputLowerBorder
                                            title={'Currency'}
                                            right={<Icon name={'controller-play'} type="entypo" size={12} />}
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                <TextInputs.TextInputLowerBorder
                                    title={'Currency'}
                                    right={<Icon name={'controller-play'} type="entypo" size={12} />}
                                />
                            }

                        </Wrappers.Wrapper>
                        <Spacers.Base />

                        <Wrappers.Wrapper>
                            {tooltipValue == 1 ?
                                <Wrappers.Wrapper>
                                    <Wrappers.Wrapper style={styles.popupAutoFill}>
                                        <Texts.SmallText style={styles.popupText}>
                                            The auto fill feature will automatically populate savings or debt with remaining leftover income after all expenses are paid for each budget cycle.
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                    <Wrappers.Wrapper>
                                        <TouchableOpacity activeOpacity={1} style={styles.popupPointAutoFill}>
                                        </TouchableOpacity>
                                        <MultipleView
                                            Title={'Enable/Disable auto fill feature?'}
                                            Value1="Enable"
                                            Value2="Disable"
                                            textColor={colors.white}
                                            viewColor={colors.textColor}
                                            textColor1={colors.placeholderColor}
                                            viewColor1={'rgba(127, 127, 127, 0.2)'}
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                <MultipleView
                                    Title={'Enable/Disable auto fill feature?'}
                                    Value1="Enable"
                                    Value2="Disable"
                                    textColor={'rgba(127, 127, 127, 0.8)'}
                                    viewColor={colors.textColor}
                                    textColor1={colors.placeholderColor}
                                    viewColor1={'rgba(127, 127, 127, 0.2)'}
                                />
                            }
                        </Wrappers.Wrapper>

                        <Spacers.Base />

                        <Wrappers.Wrapper>
                            {tooltipValue == 2 ?
                                <Wrappers.Wrapper>
                                    <Wrappers.Wrapper style={styles.popupMinimum}>
                                        <Texts.SmallText style={styles.popupText}>
                                            {`This is the minimum amount to keep in your account after expenses.\nAuto fill will input remaining income over this amount to savings or debt. This amount should be minimal as all expenses and personal spending will be accounted for.`}
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                    <Wrappers.Wrapper>
                                        <TouchableOpacity activeOpacity={1} style={styles.popupPointMinimum}>
                                        </TouchableOpacity>
                                        <TextInputs.TextInputLowerBorder
                                            title={'Minimum Amount To Reserve in Account'}
                                            placeholder="0"
                                            keyboardType={'numeric'}
                                            right={
                                                <Icon
                                                    name={'info'}
                                                    type="feather"
                                                    size={24}
                                                />
                                            }
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                <TextInputs.TextInputLowerBorder
                                    title={'Minimum Amount To Reserve in Account'}
                                    placeholder="0"
                                    keyboardType={'numeric'}
                                    right={
                                        <Icon
                                            name={'info'}
                                            type="feather"
                                            size={24}
                                        />
                                    }
                                />
                            }
                        </Wrappers.Wrapper>

                        <Wrappers.Wrapper>
                            {tooltipValue == 3 ?
                                <Wrappers.Wrapper>
                                    <Wrappers.Wrapper style={styles.popup}>
                                        <Texts.SmallText style={styles.popupText}>
                                            Input your total current savings
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                    <Wrappers.Wrapper>
                                        <TouchableOpacity activeOpacity={1} style={styles.popupPoint}>
                                        </TouchableOpacity>
                                        <TextInputs.TextInputLowerBorder
                                            title={'Total Savings'}
                                            placeholder="0"
                                            keyboardType={'numeric'}
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                <TextInputs.TextInputLowerBorder
                                    title={'Total Savings'}
                                    placeholder="0"
                                    keyboardType={'numeric'}
                                />
                            }
                        </Wrappers.Wrapper>
                        <Spacers.Base />

                        <Wrappers.Wrapper>
                            {tooltipValue == 4 ?
                                <Wrappers.Wrapper>
                                    <Wrappers.Wrapper style={styles.popupSource}>
                                        <Texts.SmallText style={styles.popupText}>
                                            Select whether your budget will have single or multiple income sources.
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                    <Wrappers.Wrapper>
                                        <TouchableOpacity activeOpacity={1} style={styles.popupPointSource}>
                                        </TouchableOpacity>
                                        <MultipleView
                                            Title={'How many Income sources?'}
                                            Value1="Single"
                                            Value2="Multiple"
                                            textColor={colors.white}
                                            viewColor={colors.textColor}
                                            textColor1={colors.placeholderColor}
                                            viewColor1={'rgba(127, 127, 127, 0.2)'}
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                <MultipleView
                                    Title={'How many Income sources?'}
                                    Value1="Single"
                                    Value2="Multiple"
                                    textColor={'rgba(127, 127, 127, 0.8)'}
                                    viewColor={colors.textColor}
                                    textColor1={colors.placeholderColor}
                                    viewColor1={'rgba(127, 127, 127, 0.2)'}
                                />
                            }
                        </Wrappers.Wrapper>

                        <Spacers.DoubleBase />
                        <Wrappers.Component>
                            <Buttons.ButtonColored
                                text="Continue"
                                buttonColor={colors.textColor}
                                tintColor={'rgba(127, 127, 127, 0.8)'}
                                onPress={() => setTooltipValue(tooltipValue + 1)}
                            />
                        </Wrappers.Component>
                    </Wrappers.Component>
                    :
                    (tooltipValue > 4 && tooltipValue < 10) ?
                        <Wrappers.Component>
                            <Spacers.Base />

                            <Texts.MediumTitle style={styles.headingTitle}>Primary Income  </Texts.MediumTitle>
                            <Spacers.Base />

                            <TextInputs.TextInputLowerBordered placeholder="Income Source" />
                            <Spacers.Base />

                            <Wrappers.Wrapper>
                                {tooltipValue == 5 ?
                                    <Wrappers.Wrapper>
                                        <Wrappers.Wrapper style={styles.popupType}>
                                            <Texts.SmallText style={styles.popupText}>
                                                A fixed income is a paycheck that does not change. A variable income is a paycheck that may change from check to check. For example, a salaried job would be a fixed income and a sales job would be variable income.
                                            </Texts.SmallText>
                                        </Wrappers.Wrapper>
                                        <Wrappers.Wrapper>
                                            <TouchableOpacity activeOpacity={1} style={styles.popupPointAutoFill}>
                                            </TouchableOpacity>
                                            <MultipleView
                                                Title={'Income Type'}
                                                Value1="Fixed Income"
                                                Value2="Variable Income"
                                                textColor={colors.white}
                                                viewColor={colors.textColor}
                                                textColor1={colors.placeholderColor}
                                                viewColor1={'rgba(127, 127, 127, 0.2)'}
                                            />
                                        </Wrappers.Wrapper>
                                    </Wrappers.Wrapper>
                                    :
                                    <MultipleView
                                        Title={'Income Type'}
                                        Value1="Fixed Income"
                                        Value2="Variable Income"
                                        textColor={tooltipValue == 5 ? colors.white : 'rgba(127, 127, 127, 0.9)'}
                                        viewColor={colors.textColor}
                                        textColor1={colors.placeholderColor}
                                        viewColor1={'rgba(127, 127, 127, 0.2)'}
                                    />
                                }
                            </Wrappers.Wrapper>

                            <Spacers.Base />
                            <Wrappers.Wrapper>
                                {tooltipValue == 6 ?
                                    <Wrappers.Wrapper>
                                        <Wrappers.Wrapper style={styles.popup}>
                                            <Texts.SmallText style={styles.popupText}>
                                                Select the pay frequency for the income source
                                            </Texts.SmallText>
                                        </Wrappers.Wrapper>
                                        <Wrappers.Wrapper>
                                            <TouchableOpacity activeOpacity={1} style={styles.popupPointFrequency}>
                                            </TouchableOpacity>
                                            <TextInputs.TextInputLowerBorder
                                                title={'Frequency'}
                                                placeholder={'Select'}
                                                editable={false}
                                                right={
                                                    <Icon
                                                        name={'controller-play'}
                                                        type="entypo"
                                                        size={12}
                                                    />
                                                }
                                            />
                                        </Wrappers.Wrapper>
                                    </Wrappers.Wrapper>
                                    :
                                    <TextInputs.TextInputLowerBorder
                                        title={'Frequency'}
                                        placeholder={'Select'}
                                        editable={false}
                                        right={
                                            <Icon
                                                name={'controller-play'}
                                                type="entypo"
                                                size={12}
                                            />
                                        }
                                    />
                                }
                                <Spacers.Base />
                            </Wrappers.Wrapper>

                            <Wrappers.Wrapper>
                                {tooltipValue == 7 ?
                                    <Wrappers.Wrapper>
                                        <Wrappers.Wrapper style={styles.popupNextDate}>
                                            <Texts.SmallText style={styles.popupText}>
                                                Select the next date you will be receive a paycheck. The budget cycle will begin on this date and will move forward based on the chosen pay frequency.
                                            </Texts.SmallText>
                                        </Wrappers.Wrapper>
                                        <Wrappers.Wrapper>
                                            <TouchableOpacity activeOpacity={1} style={styles.popupPointFrequency}>
                                            </TouchableOpacity>
                                            <TextInputs.TextInputLowerBorder
                                                title={'Next Pay Date'}
                                                placeholder={'Select'}
                                                editable={false}
                                                right={
                                                    <Icon
                                                        name={'controller-play'}
                                                        type="entypo"
                                                        size={12}
                                                    />
                                                }
                                            />
                                        </Wrappers.Wrapper>
                                    </Wrappers.Wrapper>
                                    :
                                    <TextInputs.TextInputLowerBorder
                                        title={'Next Pay Date'}
                                        placeholder={'Select'}
                                        editable={false}
                                        right={
                                            <Icon
                                                name={'controller-play'}
                                                type="entypo"
                                                size={12}
                                            />
                                        }
                                    />
                                }
                            </Wrappers.Wrapper>

                            <Spacers.DoubleBase />
                            <Wrappers.Component>
                                <Buttons.ButtonColored
                                    text="Add"
                                    buttonColor={colors.textColor}
                                    tintColor={'rgba(127, 127, 127, 0.9)'}
                                    onPress={() => setTooltipValue(tooltipValue + 1)}
                                />
                            </Wrappers.Component>
                        </Wrappers.Component>
                        :
                        (tooltipValue > 9 && tooltipValue < 12) ?
                            <Wrappers.Component>
                                <Spacers.Base />

                                {tooltipValue == 10 ?
                                    <Wrappers.Wrapper>
                                        <Wrappers.Wrapper style={styles.popupExpense}>
                                            <Texts.SmallText style={styles.popupText}>{'Tap here to select Category of Expense'}</Texts.SmallText>
                                        </Wrappers.Wrapper>
                                        <Wrappers.Wrapper>
                                            <TouchableOpacity activeOpacity={1} style={styles.popupPointExpense}>
                                            </TouchableOpacity>
                                            <TextInputs.TextInputLowerBordered
                                                placeholder="Expense Name"
                                                insideIconName={'list-circle-outline'}
                                            />
                                        </Wrappers.Wrapper>
                                    </Wrappers.Wrapper>
                                    :
                                    <TextInputs.TextInputLowerBordered
                                        placeholder="Expense Name"
                                        insideIconName={'list-circle-outline'}
                                    />
                                }
                                <Spacers.Base />

                                <MultipleView
                                    Title={'Expense Type'}
                                    Value1="Fixed"
                                    Value2="Variable"
                                    onPress={v => setTooltipValue(tooltipValue + 1)}
                                    textColor={colors.white}
                                    viewColor={colors.textColor}
                                    textColor1={colors.placeholderColor}
                                    viewColor1={colors.lightRed}
                                />
                                <Spacers.Base />
                                <Wrappers.Wrapper>
                                    <TextInputs.TextInputLowerBorder
                                        title={'Amount'}
                                        placeholder="0"
                                        keyboardType={'numeric'}
                                    />
                                    <Spacers.Base />
                                </Wrappers.Wrapper>

                                <TextInputs.TextInputLowerBorder
                                    title={'Frequency'}
                                    placeholder={'Select'}
                                    editable={false}
                                    right={
                                        <Icon
                                            name={'controller-play'}
                                            type="entypo"
                                            size={12}
                                        />
                                    }
                                />
                                <Spacers.Base />

                                <TextInputs.TextInputLowerBorder
                                    title={'First Bill Due'}
                                    placeholder={'Select'}
                                    editable={false}
                                    right={
                                        <Icon
                                            name={'controller-play'}
                                            type="entypo"
                                            size={12}
                                        />
                                    }
                                />
                                <Spacers.Base />

                                <Wrappers.Wrapper>
                                    {tooltipValue == 11 ?
                                        <Wrappers.Wrapper>
                                            <Wrappers.Wrapper style={styles.popupBill}>
                                                <Texts.SmallText style={styles.popupText}>{'Tap here to select the next payment due'}</Texts.SmallText>
                                            </Wrappers.Wrapper>
                                            <Wrappers.Wrapper>
                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointBill}>
                                                </TouchableOpacity>
                                                <TextInputs.TextInputLowerBorder
                                                    title={'Next Bill Due'}
                                                    placeholder={'Select'}
                                                    editable={false}
                                                    right={
                                                        <Icon
                                                            name={'controller-play'}
                                                            type="entypo"
                                                            size={12}
                                                        />
                                                    }
                                                />
                                            </Wrappers.Wrapper>
                                        </Wrappers.Wrapper>
                                        :
                                        <TextInputs.TextInputLowerBorder
                                            title={'Next Bill Due'}
                                            placeholder={'Select'}
                                            editable={false}
                                            right={
                                                <Icon
                                                    name={'controller-play'}
                                                    type="entypo"
                                                    size={12}
                                                />
                                            }
                                        />
                                    }

                                </Wrappers.Wrapper>

                                <Spacers.DoubleBase />
                                <Wrappers.Component>
                                    <Buttons.ButtonColored
                                        text="Add"
                                        buttonColor={colors.textColor}
                                        tintColor={colors.white}
                                        onPress={() => setTooltipValue(tooltipValue + 1)}
                                    />
                                </Wrappers.Component>
                            </Wrappers.Component>
                            :
                            (tooltipValue > 11 && tooltipValue < 16) ?
                                <Wrappers.Wrapper>
                                    <Spacers.Small />
                                    <ExpenseHeader bottomWidth={'rgba(127, 127, 127, 0.5)'} />
                                    {tooltipValue == 12 &&
                                        <Wrappers.Wrapper style={styles.popupHeaderExpense}>
                                            <Texts.SmallText style={styles.popupText}>{'Tap here to edit the list of expenses and debt'}</Texts.SmallText>
                                        </Wrappers.Wrapper>
                                    }

                                    {tooltipValue == 13 &&
                                        <Wrappers.Wrapper style={styles.popupDetail}>
                                            <Texts.SmallText style={styles.popupText}>{'Swipe left to edit the expense or debt amount'}</Texts.SmallText>
                                        </Wrappers.Wrapper>
                                    }

                                    {tooltipValue == 14 &&
                                        <Wrappers.Wrapper style={styles.popupEditAble}>
                                            <Texts.SmallText style={styles.popupText}>{'Select the radio buttons to delete one or more expenses or debt'}</Texts.SmallText>
                                        </Wrappers.Wrapper>
                                    }

                                    <FlatList
                                        data={dummyExpenses}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Wrappers.Wrapper>
                                                    {tooltipValue == 13 && index == 1 &&
                                                        <TouchableOpacity activeOpacity={1} style={styles.popupPointDetail}>
                                                        </TouchableOpacity>
                                                    }
                                                    {tooltipValue == 14 && index == 1 &&
                                                        <TouchableOpacity activeOpacity={1} style={styles.popupPointEditAble}>
                                                        </TouchableOpacity>
                                                    }
                                                    <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(127, 127, 127, 0.5)' }}>
                                                        <Wrappers.Wrapper style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                                                            <Wrappers.RowBasic>
                                                                {(tooltipValue == 14 || tooltipValue == 15) &&
                                                                    <RoundCheckbox
                                                                        size={18}
                                                                        borderColor={colors.textColor}
                                                                        backgroundColor={colors.textColor}
                                                                        styles={styles.iconStyle}
                                                                    />
                                                                }

                                                                <Texts.SmallText style={{ ...styles.expenseDetail, width: (tooltipValue == 14 || tooltipValue == 15) ? width(20) : width(27), marginLeft: (tooltipValue == 14 || tooltipValue == 15) ? width(2) : 0 }}>{item?.ExpenseName}</Texts.SmallText>
                                                            </Wrappers.RowBasic>
                                                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(25), textAlign: 'center' }}>{item?.ExpenseFrequency}</Texts.SmallText>
                                                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(20), textAlign: 'center' }}>{item?.ExpenseDate}</Texts.SmallText>
                                                            <Texts.SmallText style={{ ...styles.expenseDetail, width: width(22), textAlign: 'right' }}>{item?.ExpenseAmount}</Texts.SmallText>
                                                        </Wrappers.Wrapper>
                                                    </Wrappers.Wrapper>
                                                </Wrappers.Wrapper>
                                            )
                                        }}
                                    />

                                    <Spacers.DoubleBase />
                                    <DebtsHeader bottomWidth={'rgba(127, 127, 127, 0.5)'} />

                                    <Wrappers.Wrapper>
                                        {tooltipValue == 15 &&
                                            <Wrappers.Wrapper style={styles.popupEditAble1}>
                                                <Texts.SmallText style={styles.popupText}>
                                                    Click and drag up or down to change the priority of each debt. The debt in the top position will be the highest priority. Our auto fill feature will focus on paying this debt off first and auto populate any remaining income toward this debt each budget cycle.
                                                </Texts.SmallText>
                                            </Wrappers.Wrapper>
                                        }

                                        <FlatList
                                            data={dummyDebts}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <Wrappers.Wrapper>
                                                        {tooltipValue == 15 && index == 1 &&
                                                            <TouchableOpacity activeOpacity={1} style={styles.popupPointEditAble1}>
                                                            </TouchableOpacity>
                                                        }
                                                        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(127, 127, 127, 0.5)' }}>
                                                            <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3) }}>
                                                                <Wrappers.RowBasic>
                                                                    {(tooltipValue == 14 || tooltipValue == 15) &&
                                                                        <RoundCheckbox
                                                                            size={18}
                                                                            borderColor={colors.textColor}
                                                                            backgroundColor={colors.textColor}
                                                                            styles={styles.iconStyle}
                                                                        />
                                                                    }
                                                                    <Texts.SmallText style={{ ...styles.expenseDetail, marginLeft: (tooltipValue == 14 || tooltipValue == 15) ? width(2) : 0 }}>{item?.DebtName}</Texts.SmallText>
                                                                </Wrappers.RowBasic>
                                                                <Wrappers.RowBasic>
                                                                    <Texts.SmallText style={styles.expenseDetail}>{item?.DebtAmount}</Texts.SmallText>
                                                                    {(tooltipValue == 14 || tooltipValue == 15) &&
                                                                        <Icon
                                                                            name={'menu'}
                                                                            type="entypo"
                                                                            size={22}
                                                                            color={colors.disableText}
                                                                            style={{ marginTop: '-10%', marginLeft: width(2) }}
                                                                        />
                                                                    }
                                                                </Wrappers.RowBasic>
                                                            </Wrappers.RowBasic>
                                                        </Wrappers.Wrapper>
                                                    </Wrappers.Wrapper>
                                                );
                                            }}
                                        />
                                    </Wrappers.Wrapper>
                                </Wrappers.Wrapper>
                                :
                                (tooltipValue > 15 && tooltipValue < 26) ?
                                    <Wrappers.Wrapper>
                                        <Spacers.Small />
                                        <Wrappers.Component>

                                            {tooltipValue == 16 &&
                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to change the income for the current budget or to edit the current budget details'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 17 &&
                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to switch the current budget'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 18 &&
                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to add an additional income, a one time expense or create a new budget'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 19 &&
                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to view your profile and settings as well as upgrade your account.'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }

                                            <Spacers.Small />
                                            <SaveAmountView colorStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.3)' }} saveAmount={'$500'} totalSaving={'$1,000'} />
                                            <Spacers.Small />

                                            <Wrappers.Component>
                                                <PayDateArrows
                                                    title={'Pay Date'}
                                                    value={moment().format('LL')}
                                                />
                                            </Wrappers.Component>
                                        </Wrappers.Component>

                                        <Spacers.Base />
                                        <IncomeView colorStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.3)' }} income={'Income'} incomeAmount={'$ 2,000'} />

                                        <Spacers.Small />
                                        <Wrappers.Wrapper>
                                            <ExpenseHeaderHome borderColor={'rgba(127, 127, 127, 0.3)'} />

                                            {tooltipValue == 20 &&
                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'For one time expense, swipe to delete'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 21 &&
                                                <Wrappers.Wrapper style={styles.popupEditExp}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap the pencil to edit this amount'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }

                                            <FlatList
                                                data={dummyExpenses?.slice(0, 4)}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <Wrappers.Wrapper>
                                                            {tooltipValue == 20 && index == 1 &&
                                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointDetail}>
                                                                </TouchableOpacity>
                                                            }
                                                            {tooltipValue == 21 && index == 2 &&
                                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointEditExp}>
                                                                </TouchableOpacity>
                                                            }
                                                            <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(127, 127, 127, 0.3)' }}>
                                                                <Wrappers.Component style={{ marginVertical: totalSize(1.3), flexDirection: 'row' }}>
                                                                    <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32), }}>{item?.ExpenseName}</Texts.SmallText>
                                                                    <Texts.SmallText style={{ ...styles.expenseDetail, width: width(28), textAlign: 'center' }}>{item?.ExpenseDate}</Texts.SmallText>
                                                                    <Texts.SmallText style={{ ...styles.expenseDetail, width: width(28), textAlign: 'right' }}>{item?.ExpenseAmount}</Texts.SmallText>

                                                                    <TouchableOpacity activeOpacity={0.5} >
                                                                        <Icon
                                                                            name='edit-3'
                                                                            type='feather'
                                                                            size={13}
                                                                            style={{ width: width(6) }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </Wrappers.Component>
                                                            </Wrappers.Wrapper>
                                                        </Wrappers.Wrapper>
                                                    )
                                                }}
                                            />
                                        </Wrappers.Wrapper>

                                        <Spacers.Base />
                                        <Wrappers.Wrapper>

                                            {tooltipValue == 24 &&
                                                <Wrappers.Wrapper style={styles.popupDebts}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap to enter amount to pay toward debt.'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 25 &&
                                                <Wrappers.Wrapper style={styles.popupDebts1}>
                                                    <Texts.SmallText style={styles.popupText}>{'Displays the total amount for each individual debt. Each payment towards debt will subtract and recalculate the new debt total on every budget cycle. This will ONLY subtract from the principal amount and will not account for any added interest.'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 24 &&
                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointDebts}>
                                                </TouchableOpacity>
                                            }
                                            {tooltipValue == 25 &&
                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointDebts1}>
                                                </TouchableOpacity>
                                            }

                                            <DebtsHeaderHome borderColor={'rgba(127, 127, 127, 0.3)'} />
                                            <FlatList
                                                data={dummyDebts?.slice(0, 2)}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(127, 127, 127, 0.3)' }}>
                                                            <Wrappers.RowBasic style={{ marginHorizontal: width(3), marginVertical: totalSize(1.3) }}>
                                                                <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32) }}>{item?.DebtName}</Texts.SmallText>
                                                                <Wrappers.RowWrapperCenter style={{ width: width(30) }}>
                                                                    <Texts.SmallText style={styles.expenseDetail}>{'$ 0'}</Texts.SmallText>
                                                                    <TouchableOpacity activeOpacity={0.5} >
                                                                        <Icon
                                                                            name='edit-3'
                                                                            type='feather'
                                                                            size={13}
                                                                            style={{ width: width(6) }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </Wrappers.RowWrapperCenter>
                                                                <Texts.SmallText style={{ ...styles.expenseDetail, width: width(32), textAlign: 'right' }}>{item?.DebtAmount}</Texts.SmallText>
                                                            </Wrappers.RowBasic>
                                                        </Wrappers.Wrapper>
                                                    )
                                                }}
                                            />
                                        </Wrappers.Wrapper>

                                        <Spacers.Base />
                                        <Wrappers.Component>
                                            <TotalAmountView colorStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.3)' }} text={'Total Payments'} totalAmount={'$ 1,100'} />
                                            <Spacers.Small />

                                            <Wrappers.Wrapper>

                                                {tooltipValue == 22 &&
                                                    <TouchableOpacity activeOpacity={1} style={styles.popupPointSave}>
                                                    </TouchableOpacity>
                                                }
                                                {tooltipValue == 23 &&
                                                    <TouchableOpacity activeOpacity={1} style={styles.popupPointCarry}>
                                                    </TouchableOpacity>
                                                }

                                                <Wrappers.Wrapper style={styles.carryOverView}>
                                                    {tooltipValue == 22 &&
                                                        <Wrappers.Wrapper style={styles.popupPointSave1}>
                                                            <Texts.SmallText style={styles.popupText}>{'Tap the pencil to add an amount to save.'}</Texts.SmallText>
                                                        </Wrappers.Wrapper>
                                                    }
                                                    {tooltipValue == 23 &&
                                                        <Wrappers.Wrapper style={styles.popupPointSave2}>
                                                            <Texts.SmallText style={styles.popupText}>{'Tap the pencil to add an amount to be carried over from this budget cycle to the next'}</Texts.SmallText>
                                                        </Wrappers.Wrapper>
                                                    }
                                                    <CarryOverView text={'Carry Over'} saveAmount={'$ 20'} />
                                                    <CarryOverView text={'Save'} saveAmount={'$ 0'} />
                                                </Wrappers.Wrapper>
                                            </Wrappers.Wrapper>

                                            <Spacers.Small />
                                            <TotalAmountView colorStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.3)' }} text={'Total Remaining'} totalAmount={'$ 100'} />
                                        </Wrappers.Component>
                                        <Spacers.Small />

                                    </Wrappers.Wrapper>
                                    :
                                    (tooltipValue > 25 && tooltipValue < 31) ?
                                        <Wrappers.Component>
                                            <Spacers.Base />
                                            {tooltipValue == 26 &&
                                                <Wrappers.Wrapper style={styles.popupInsightDots}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to Edit Total Savings, Edit Savings Goal, and Select date to view projected savings'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }
                                            {tooltipValue == 27 &&
                                                <Wrappers.Wrapper style={styles.popupInsightDate}>
                                                    <Texts.SmallText style={styles.popupText}>{'Tap here to change the month for overview'}</Texts.SmallText>
                                                </Wrappers.Wrapper>
                                            }

                                            <Wrappers.Wrapper>
                                                {tooltipValue == 27 &&
                                                    <TouchableOpacity style={styles.popupPointDate} />
                                                }
                                                <TouchableOpacity activeOpacity={0.8} >
                                                    <Texts.SmallText style={styles.overviewDate}>{moment(new Date()).format('MMM YYYY')}</Texts.SmallText>
                                                </TouchableOpacity>
                                            </Wrappers.Wrapper>

                                            <ProgressChart
                                                data={{ data: [0.4], colors: [colors.redColor] }}
                                                width={width(100)}
                                                height={height(26)}
                                                strokeWidth={10}
                                                hideLegend={true}
                                                withCustomBarColorFromData={true}
                                                radius={90}
                                                chartConfig={{
                                                    backgroundGradientFromOpacity: 0,
                                                    backgroundGradientToOpacity: 0,
                                                    fillShadowGradientFromOpacity: 0,
                                                    decimalPlaces: 2,
                                                    color: () => colors.textColor
                                                }}
                                                style={{ alignSelf: 'center' }}
                                            />


                                            <Wrappers.Wrapper>
                                                <Spacers.Small />
                                                {tooltipValue == 28 &&
                                                    <TouchableOpacity style={styles.popupPointDetailExpense} />
                                                }

                                                <Wrappers.RowWrapperCenter>
                                                    <BudgetDetailBox
                                                        budgetAmount={`$${'6,000'}`}
                                                        budgetDetail={'Income'}
                                                        backgroundColor={colors.textColor}
                                                    />
                                                    <BudgetDetailBox
                                                        budgetAmount={`$${'4,000'}`}
                                                        budgetDetail={'Expenses'}
                                                        backgroundColor={colors.red}
                                                    />
                                                </Wrappers.RowWrapperCenter>

                                                <Spacers.Base />
                                                <TouchableOpacity activeOpacity={0.5} >
                                                    <Wrappers.RowWrapperCenter>
                                                        <Texts.SmallText style={styles.overviewDate}>Show detailed expenses</Texts.SmallText>
                                                        <Icon name='arrow-right' type='feather' color={colors.dodgerBlue} size={20} style={styles.forwardArrow} />
                                                    </Wrappers.RowWrapperCenter>
                                                </TouchableOpacity>
                                            </Wrappers.Wrapper>
                                            <Spacers.Base />

                                            {(tooltipValue == 26 || tooltipValue == 27 || tooltipValue == 28) &&
                                                <Wrappers.Wrapper>
                                                    {tooltipValue == 28 &&
                                                        <Wrappers.Wrapper style={styles.popupDetailExpense}>
                                                            <Texts.SmallText style={styles.popupText}>{'Tap here to view detailed expenses for the month and display a break down for expenses within each category.'}</Texts.SmallText>
                                                        </Wrappers.Wrapper>
                                                    }
                                                    <Wrappers.RowBasic>
                                                        <Texts.SmallText style={styles.titleText}>Current Savings</Texts.SmallText>
                                                        <Texts.SmallText style={styles.titleText}>Savings Goal</Texts.SmallText>
                                                    </Wrappers.RowBasic>

                                                    <Slider
                                                        style={styles.slider}
                                                        minimumValue={0}
                                                        maximumValue={1000}
                                                        disabled={true}
                                                        minimumTrackTintColor={colors.yellow}
                                                        maximumTrackTintColor={`rgba(251, 174, 0, 1)`}
                                                        thumbTintColor={colors.yellow}
                                                        value={450}
                                                    />

                                                    <Wrappers.RowBasic style={styles.progressBarAmountView}>
                                                        <Texts.SmallText style={styles.progressBarAmount}>$0</Texts.SmallText>
                                                        <Texts.SmallText style={styles.progressBarAmount}>{`$${450}`}</Texts.SmallText>
                                                        <Texts.SmallText style={styles.progressBarAmount}>$1000</Texts.SmallText>
                                                    </Wrappers.RowBasic>

                                                    <Spacers.Base />
                                                    <Texts.SmallText style={styles.titleText}>Projected Savings</Texts.SmallText>
                                                    <Spacers.Base />

                                                    <Texts.SmallText style={styles.absoluteProjectedAmount}>$10,000</Texts.SmallText>
                                                    <NoDebtsChart data={[4395, 6320]} backgroundColor />

                                                    <Texts.SmallText style={styles.absoluteCurrentAmount}>$4,000</Texts.SmallText>

                                                    <Spacers.Base />
                                                    <ChartDate />
                                                </Wrappers.Wrapper>
                                            }
                                            {(tooltipValue == 29 || tooltipValue == 30) &&
                                                <Wrappers.Wrapper>
                                                    {tooltipValue == 29 &&
                                                        <TouchableOpacity style={styles.popupPointTotalDebts} />
                                                    }
                                                    <TouchableOpacity activeOpacity={0.5} >
                                                        <Wrappers.RowBasic style={{ ...styles.debtsView, backgroundColor: tooltipValue == 29 ? 'rgba(127, 127, 127, 0.5)' : colors.grayBackground }}>
                                                            <Texts.SmallText style={styles.titleText}>Total Debt: $10,000.00</Texts.SmallText>
                                                            <Icon name='caretdown' type='antdesign' size={10} />
                                                        </Wrappers.RowBasic>
                                                    </TouchableOpacity>
                                                    <Spacers.Base />

                                                    <Wrappers.RowBasic>
                                                        {tooltipValue == 30 &&
                                                            <TouchableOpacity style={styles.popupPointPayoff} />
                                                        }
                                                        {tooltipValue == 29 &&
                                                            <Wrappers.Wrapper style={styles.popupTotalDebts}>
                                                                <Texts.SmallText style={styles.popupText}>{'Tap here to expand to view all debt details.'}</Texts.SmallText>
                                                            </Wrappers.Wrapper>
                                                        }
                                                        <Texts.SmallText style={styles.projectedText}>Projected Debt Payoff</Texts.SmallText>
                                                        <TouchableOpacity activeOpacity={0.5}>
                                                            <Texts.SmallText style={styles.projectedTextType}>{'debtsPayoff'}</Texts.SmallText>
                                                        </TouchableOpacity>
                                                    </Wrappers.RowBasic>
                                                    <Spacers.Small />

                                                    <Texts.SmallText style={styles.absoluteProjectedAmountDebt}>$10,000</Texts.SmallText>
                                                    <Wrappers.Wrapper>
                                                        {tooltipValue == 30 &&
                                                            <Wrappers.Wrapper style={styles.popupPayoff}>
                                                                <Texts.SmallText style={styles.popupText}>{'Tap here to change the selected debt and view the projected pay off date'}</Texts.SmallText>
                                                            </Wrappers.Wrapper>
                                                        }
                                                        <DebtsChart data={[6320, 4395]} backgroundColor />
                                                    </Wrappers.Wrapper>

                                                    <Texts.SmallText style={styles.absoluteCurrentAmountDebt}>$0</Texts.SmallText>

                                                    <Spacers.Base />
                                                    <ChartDate />
                                                </Wrappers.Wrapper>
                                            }
                                        </Wrappers.Component>
                                        :
                                        tooltipValue == 31 &&
                                        <Wrappers.Wrapper>
                                            <FlatList
                                                data={dummyNotifications}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <Wrappers.Wrapper style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(127, 127, 127, 0.5)' }}>
                                                            {tooltipValue == 31 && index == 1 &&
                                                                <TouchableOpacity activeOpacity={1} style={styles.popupPointNoti}>
                                                                </TouchableOpacity>
                                                            }

                                                            {tooltipValue == 31 && index == 2 &&
                                                                <Wrappers.Wrapper style={styles.popupHomeDots}>
                                                                    <Texts.SmallText style={styles.popupText}>{'Swipe Left to delete this notification'}</Texts.SmallText>
                                                                </Wrappers.Wrapper>
                                                            }
                                                            <Spacers.Small />
                                                            <Wrappers.Row>
                                                                <Wrappers.Wrapper style={styles.iconView}>
                                                                    <Notification color={colors.white} />
                                                                </Wrappers.Wrapper>

                                                                <Wrappers.Wrapper style={styles.textWrapper}>
                                                                    <Texts.MediumTitle style={styles.notification}>{item?.notificationText}</Texts.MediumTitle>
                                                                    <Texts.MediumTitle style={styles.time}>{item?.notificationTime}</Texts.MediumTitle>
                                                                </Wrappers.Wrapper>
                                                            </Wrappers.Row>
                                                            <Spacers.Small />
                                                        </Wrappers.Wrapper>

                                                    )
                                                }}
                                            />
                                        </Wrappers.Wrapper>
                }

                {
                    (tooltipValue > 25 && tooltipValue < 31) &&
                    <Wrappers.Wrapper style={styles.progressChartView}>
                        <Texts.SmallText style={styles.progressChartText}>{`Monthly\nOverview`}</Texts.SmallText>
                    </Wrappers.Wrapper>
                }

                {
                    tooltipValue > 15 &&
                    <Wrappers.Wrapper style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <BottomTabToolTips tabValue={(tooltipValue > 15 && tooltipValue < 26) ? 'My Budget' : (tooltipValue > 25 && tooltipValue < 31) ? 'Insights' : 'Notifications'} />
                    </Wrappers.Wrapper>
                }

                {
                    (tooltipValue == 8 || tooltipValue == 9) &&
                    <Wrappers.Wrapper style={{
                        backgroundColor: 'rgba(127, 127, 127, 0.2)',
                        borderTopRightRadius: sizes.cardRadius,
                        borderTopLeftRadius: sizes.cardRadius,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}>
                        <Spacers.Base />
                        <Wrappers.Row>
                            <Wrappers.Wrapper style={{ backgroundColor: tooltipValue == 8 ? colors.white : 'transparent', borderRadius: 100, padding: 10 }}>
                                {tooltipValue == 8 &&
                                    <Wrappers.Wrapper style={styles.popupDebtsModal}>
                                        <Texts.SmallText style={styles.popupText}>
                                            Click and drag any additional income up to replace as your primary income source. The primary income source will be used to create the budget cycles based on the pay frequency selected.
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                }
                                <Icon
                                    name={'menu'}
                                    type="entypo"
                                    size={22}
                                    color={colors.disableText}
                                />
                            </Wrappers.Wrapper>

                            <Wrappers.Wrapper>
                                <Texts.SmallText style={styles.incomeType}>{'Additional Income'}</Texts.SmallText>
                                <Spacers.Tiny />
                                <Texts.SmallText style={styles.incomeTitle}>{'Income Source'}</Texts.SmallText>
                            </Wrappers.Wrapper>

                            <Wrappers.Wrapper style={{ backgroundColor: tooltipValue == 9 ? colors.white : 'transparent', borderRadius: 100, padding: 10 }}>
                                {tooltipValue == 9 &&
                                    <Wrappers.Wrapper style={styles.popupDebtsModal1}>
                                        <Texts.SmallText style={styles.popupText}>
                                            Tap here to remove this Additional Income
                                        </Texts.SmallText>
                                    </Wrappers.Wrapper>
                                }
                                <Icon
                                    name={'close'}
                                    type="materialicons"
                                    size={22}
                                    color={colors.disableText}
                                />
                            </Wrappers.Wrapper>
                        </Wrappers.Row>
                        <Spacers.Base />
                        <Buttons.Bordered
                            text="+ Add Income"
                            buttonStyle={{ marginHorizontal: width(10), backgroundColor: 'rgba(127, 127, 127, 0.01)' }}
                            onPress={() => setTooltipValue(tooltipValue + 1)}
                        />
                        <Spacers.Base />
                        <Buttons.ButtonColored
                            text="Continue"
                            buttonColor={colors.textColor}
                            tintColor={'rgba(127, 127, 127, 0.9)'}
                            buttonStyle={{ marginHorizontal: width(10) }}
                            onPress={() => setTooltipValue(tooltipValue + 1)}
                        />
                        <Spacers.Base />
                    </Wrappers.Wrapper>
                }
            </TouchableOpacity >

        </Wrappers.Wrapper >
    )
}

export default TutorialFlow;