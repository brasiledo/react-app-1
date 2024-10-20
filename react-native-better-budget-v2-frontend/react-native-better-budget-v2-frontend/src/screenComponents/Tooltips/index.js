import React, { useState, useEffect } from 'react'
import { Buttons, Headers, Spacers, TextInputs, Texts, Wrappers } from '../../components'
import { BottomTabToolTips, CustomPopupPoint, CustomTextView, CustomToolTip, DebtsHeader, DebtsHeaderHome, ExpenseHeader, ExpenseHeaderHome } from '../../components/staticComponents'
import { colors, routes, sizes } from '../../services'
import { Icon } from 'react-native-elements'
import { MultipleView } from '../../screenComponents/createBudget'
import { styles } from './styles'
import { TouchableOpacity } from 'react-native'
import { width, height, totalSize } from 'react-native-dimension'
import { FlatList, Animated } from 'react-native'
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

export const CreateBudgetFlow = ({ onPressScreen, tooltipValue, setTooltipValue, value, check, setCheck }) => {

    // Redux Data
    // const reduxData = useSelector(state => state?.Auth?.user)

    // All useStates
    // const [tooltipValue, setTooltipValue] = useState(0);
    // const [user, setUser] = useState(reduxData ?? {});

    //All useEffects
    // useEffect(() => {
    //     setUser(reduxData ?? {})
    // }, [reduxData])

    // All Functions
    // const onPressScreen = () => {
    //     if (tooltipValue == 31) {
    //         saveData('Users', user?.userId, { firstTimeLogin: false })
    //         navigation.dispatch(
    //             CommonActions.reset({
    //                 index: 0,
    //                 routes: [{ name: routes.app }],
    //             }),
    //         );
    //     } else {
    //         setTooltipValue(tooltipValue + 1)
    //     }
    // }
    // let currentValueX = 0
    console.log('check value::::::::::::', check);

    const moveBall = (values) => {
        value = new Animated.ValueXY({ x: values?.currentValueX, y: values?.currentValueY })
        setCheck(value)
        Animated.timing(value, {
            toValue: { x: values?.nextValueX, y: values?.nextValueY },
            duration: 400,
            useNativeDriver: false
        }).start()
        setTimeout(() => {
            setTooltipValue(tooltipValue + 1)
        }, 500)
    }



    return (
        <Wrappers.Wrapper style={styles.wrapper}>
            {/* <StatusBar backgroundColor={'rgba(127, 127, 127, 1)'} barStyle={'dark-content'} /> */}
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => {

                moveBall(tooltipValue == 0 ?
                    { currentValueX: width(5), currentValueY: height(5), nextValueX: width(10), nextValueY: height(10) }
                    : tooltipValue == 1 ?
                        { currentValueX: width(10), currentValueY: height(10), nextValueX: width(15), nextValueY: height(15) }
                        : tooltipValue == 2 ?
                            { currentValueX: width(15), currentValueY: height(15), nextValueX: width(20), nextValueY: height(20) }
                            :
                            { currentValueX: width(20), currentValueY: height(20), nextValueX: width(25), nextValueY: height(25) }
                )
            }}>
                <Headers.Main title={"Create Budget"}
                    headerStyle={{ backgroundColor: 'rgba(127, 127, 127, 0.5)', borderBottomWidth: 0 }} />

                <Wrappers.Component>
                    <Spacers.Base />
                    <TextInputs.TextInputLowerBordered placeholder="Budget Name" />
                    <Spacers.Base />
                    <Wrappers.Wrapper>
                        {/* {tooltipValue == 0 ? */}
                        <Wrappers.Wrapper>
                            {/* <Wrappers.Wrapper style={styles.popup}>
                                    <Texts.SmallText style={styles.popupText}>{'Tap here to select a different Currency'}</Texts.SmallText>
                                </Wrappers.Wrapper> */}
                            {/* <CustomToolTip currentValueX={width(60)} currentValueY={0} nextValueX={0} nextValueY={0}
                                tooltipValue={tooltipValue}
                                topView
                                popupText={'Tap here to select a different Currency'}
                            /> */}
                            <CustomTextView topView popupText={'Tap here to select a different Currency'} topPopup={-height(8)} />
                            <Wrappers.Wrapper>
                                {/* <TouchableOpacity activeOpacity={1} style={styles.popupPoint}>
                                    </TouchableOpacity> */}
                                {/* {tooltipValue == 0 && */}
                                <Animated.View style={check.getLayout()}>
                                    {/* <CustomPopupPoint currentValueX={width(60)} currentValueY={0} nextValueX={0} nextValueY={0} /> */}
                                    <CustomPopupPoint />
                                </Animated.View>
                                {/* } */}

                                <TextInputs.TextInputLowerBorder
                                    title={'Currency'}
                                    placeholder={'$ 0'}
                                    editable={false}
                                    right={<Icon name={'controller-play'} type="entypo" size={12} />}
                                />
                            </Wrappers.Wrapper>
                        </Wrappers.Wrapper>
                        {/* :
                            <TextInputs.TextInputLowerBorder
                                title={'Currency'}
                                placeholder={'$ 0'}
                                editable={false}
                                right={<Icon name={'controller-play'} type="entypo" size={12} />}
                            /> */}
                        {/* } */}

                    </Wrappers.Wrapper>
                    <Spacers.Base />
                    <Wrappers.Wrapper>
                        {/* {tooltipValue == 1 ? */}
                        <Wrappers.Wrapper>
                            {/* <Wrappers.Wrapper style={styles.popupAutoFill}>
                                    <Texts.SmallText style={styles.popupText}>
                                        The auto fill feature will automatically populate savings or debt with remaining leftover income after all expenses are paid for each budget cycle.
                                    </Texts.SmallText>
                                </Wrappers.Wrapper> */}
                            {/* <CustomToolTip currentValueX={0} currentValueY={0} nextValueX={100} nextValueY={100}
                                    tooltipValue={tooltipValue} widthPoint={width(40)} heightPoint={width(40)}
                                    popupText={'The auto fill feature will automatically populate savings or debt with remaining leftover income after all expenses are paid for each budget cycle.'}
                                /> */}

                            {tooltipValue == 12 &&
                                <Animated.View style={check.getLayout()}>
                                    {/* <CustomPopupPoint currentValueX={width(60)} currentValueY={0} nextValueX={0} nextValueY={0} /> */}
                                    <CustomPopupPoint />
                                </Animated.View>
                            }

                            <Wrappers.Wrapper>
                                {/* <TouchableOpacity activeOpacity={1} style={styles.popupPointAutoFill}>
                                    </TouchableOpacity> */}
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
                        {/* :
                            <MultipleView
                                Title={'Enable/Disable auto fill feature?'}
                                Value1="Enable"
                                Value2="Disable"
                                textColor={'rgba(127, 127, 127, 0.8)'}
                                viewColor={colors.textColor}
                                textColor1={colors.placeholderColor}
                                viewColor1={'rgba(127, 127, 127, 0.2)'}
                            />
                        } */}
                    </Wrappers.Wrapper>

                    <Spacers.Base />

                    <Wrappers.Wrapper>
                        {/* {tooltipValue == 2 ? */}
                        <Wrappers.Wrapper>
                            {/* <Wrappers.Wrapper style={styles.popupMinimum}>
                                    <Texts.SmallText style={styles.popupText}>
                                        {`This is the minimum amount to keep in your account after expenses.\nAuto fill will input remaining income over this amount to savings or debt. This amount should be minimal as all expenses and personal spending will be accounted for.`}
                                    </Texts.SmallText>
                                </Wrappers.Wrapper> */}

                            {tooltipValue == 2 &&
                                <Animated.View style={check.getLayout()}>
                                    {/* <CustomPopupPoint currentValueX={width(60)} currentValueY={0} nextValueX={0} nextValueY={0} /> */}
                                    <CustomPopupPoint />
                                </Animated.View>
                            }

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
                        {/* :
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
                        } */}
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


            </TouchableOpacity >

        </Wrappers.Wrapper >
    )
}