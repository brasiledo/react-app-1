import React, { useCallback, useState, useEffect } from 'react';
import { ProgressChart } from 'react-native-chart-kit';
import { height, width } from 'react-native-dimension';
import { Headers, Modals, ScrollViews, Spacers, Texts, Wrappers } from '../../../components';
import { colors, routes } from '../../../services';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { BudgetDetailBox, ChartDate, DebtsChart, NoDebtsChart } from '../../../screenComponents/insightBox';
import { Icon } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { dummyExpenses } from '../../../services/dummyData';
import Translate from '../../../services/languageStrings/translate';

const Insights = ({ navigation }) => {

  // All useStates
  const [currentSaving, setCurrentSaving] = useState('');
  const [currentAmount, setCurrentAmount] = useState(450);
  const [savingGoal, setSavingGoal] = useState('');
  const [overviewDate, setOverviewDate] = useState('2024-02-29T19:00:00.000Z');
  const [editExpenseData, setEditExpenseData] = useState(dummyExpenses ?? []);
  const [allExpenses, setAllExpenses] = useState([]);
  const [noDebts, setNoDebts] = useState(true);
  const [debtsPayoff, setDebtsPayoff] = useState('Student Loan');
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);
  //Modal
  const [headerModal, setHeaderModal] = useState(false);
  const [currentSavingEditModal, setCurrentSavingEditModal] = useState(false);
  const [savingGoalEditModal, setSavingGoalEditModal] = useState(false);
  const [isModalDateVisible, setModalDateVisible] = useState(false);
  const [debtPayoffModal, setDebtPayoffModal] = useState(false);
  const [showTotalDebtsModal, setShowTotalDebtsModal] = useState(false);
  const [selectDateModal, setSelectDateModal] = useState(false);

  //All Functions
  // When user click on three dots header data
  const onPressHeaderModalData = (item) => {
    if (item == Translate('InsightsScreen.updateCurrentSavings')) {
      setHeaderModal(!headerModal)
      setCurrentSavingEditModal(!currentSavingEditModal)
    } else if (item == Translate('InsightsScreen.updateSavingsGoal')) {
      setHeaderModal(!headerModal)
      setSavingGoalEditModal(!savingGoalEditModal)
    } else {
      setHeaderModal(!headerModal)
      setModalDateVisible(!isModalDateVisible)
    }
  }

  // select date for monthly overview
  // const onValueChange = useCallback(
  //   (event, newDate) => {
  //     const selectedDate = newDate || overviewDate;
  //     showPicker(false);
  //     setOverviewDate(selectedDate);
  //   },
  //   [overviewDate, showPicker],
  // );

  // select date function

  const onSetFirstDate = _date => {
    setModalDateVisible(!isModalDateVisible);
  };

  const onPressDebtPayoffModal = (item) => {
    setDebtsPayoff(item)
    setDebtPayoffModal(!debtPayoffModal)
  }

  return (
    <Wrappers.Wrapper style={styles.main}>
      {allExpenses.length == 0 ?
        <Headers.Primary
          title={Translate('Insights')}
          onPressTitle={() => setNoDebts(!noDebts)}
          onPressLeftIcon={() => setHeaderModal(!headerModal)}
          onPressProfileIcon={() => navigation.navigate(routes.setting)}
        />
        :
        <Headers.EmptyViewHeader
          title={Translate('Insights')}
          onPressProfileIcon={() => navigation.navigate(routes.setting)}
        />
      }

      {/* <StaticComponents.EmptyView
        expenseSource
        onPressButton={() => navigation.navigate(routes.createBudget)}
        Text={Translate('InsightsScreen.emptyViewText)}
      /> */}
      <ScrollViews.KeyboardAvoiding>
        <Wrappers.Component>
          <Spacers.Base />

          {/* <CustomToolTip currentValueX={0} currentValueY={0} nextValueX={100} nextValueY={100} /> */}

          <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectDateModal(!selectDateModal)}>
            <Texts.SmallText style={styles.overviewDate}>{moment(overviewDate).format('MMM YYYY')}</Texts.SmallText>
          </TouchableOpacity>

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


          <Spacers.Small />
          <Wrappers.RowWrapperCenter>
            <BudgetDetailBox
              budgetAmount={`$${'6,000'}`}
              budgetDetail={Translate('OnBoardingScreen.onBoardingTitle2')}
              backgroundColor={colors.textColor}
            />
            <BudgetDetailBox
              budgetAmount={`$${'4,000'}`}
              budgetDetail={Translate('Expenses')}
              backgroundColor={colors.red}
            />
          </Wrappers.RowWrapperCenter>

          <Spacers.Base />
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(routes.expenseBreakdown)} >
            <Wrappers.RowWrapperCenter>
              <Texts.SmallText style={styles.overviewDate}>{Translate('InsightsScreen.showDetail')}</Texts.SmallText>
              <Icon name='arrow-right' type='feather' color={colors.dodgerBlue} size={20} style={styles.forwardArrow} />
            </Wrappers.RowWrapperCenter>
          </TouchableOpacity>

          <Spacers.Base />

          {noDebts ?
            <Wrappers.Wrapper>
              <Wrappers.RowBasic>
                <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.currentSavings')}</Texts.SmallText>
                <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.savingsGoal')}</Texts.SmallText>
              </Wrappers.RowBasic>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                disabled={true}
                minimumTrackTintColor={colors.yellow}
                maximumTrackTintColor={`rgba(251, 174, 0, 1)`}
                thumbTintColor={colors.yellow}
                value={currentAmount}
              />

              <Wrappers.RowBasic style={styles.progressBarAmountView}>
                <Texts.SmallText style={styles.progressBarAmount}>$0</Texts.SmallText>
                <Texts.SmallText style={styles.progressBarAmount}>{`$${currentAmount}`}</Texts.SmallText>
                <Texts.SmallText style={styles.progressBarAmount}>$1000</Texts.SmallText>
              </Wrappers.RowBasic>

              <Spacers.Base />
              <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.projectedSavings')}</Texts.SmallText>
              <Spacers.Base />

              <Texts.SmallText style={styles.absoluteProjectedAmount}>$10,000</Texts.SmallText>
              <NoDebtsChart data={[4395, 6320]} />

              <Texts.SmallText style={styles.absoluteCurrentAmount}>$4,000</Texts.SmallText>

              <Spacers.Base />
              <ChartDate />
            </Wrappers.Wrapper>
            :
            <Wrappers.Wrapper>
              <TouchableOpacity onPress={() => setShowTotalDebtsModal(!showTotalDebtsModal)} activeOpacity={0.5} >
                <Wrappers.RowBasic style={styles.debtsView}>
                  <Texts.SmallText style={styles.titleText}>{Translate('InsightsScreen.totalDebt')}: $10,000.00</Texts.SmallText>
                  <Icon name='caretdown' type='antdesign' size={10} />
                </Wrappers.RowBasic>
              </TouchableOpacity>
              <Spacers.Base />

              <Wrappers.RowBasic>
                <Texts.SmallText style={styles.projectedText}>{Translate('InsightsScreen.projectedDebtPayoff')}</Texts.SmallText>
                <TouchableOpacity onPress={() => setDebtPayoffModal(!debtPayoffModal)} activeOpacity={0.5}>
                  <Texts.SmallText style={styles.projectedTextType}>{debtsPayoff}</Texts.SmallText>
                </TouchableOpacity>
              </Wrappers.RowBasic>
              <Spacers.Small />

              <Texts.SmallText style={styles.absoluteProjectedAmountDebt}>$10,000</Texts.SmallText>
              <DebtsChart data={[6320, 4395]} />

              <Texts.SmallText style={styles.absoluteCurrentAmountDebt}>$0</Texts.SmallText>

              <Spacers.Base />
              <ChartDate />
            </Wrappers.Wrapper>
          }
        </Wrappers.Component>
      </ScrollViews.KeyboardAvoiding>

      {/* {show &&
        <MonthPicker
          onChange={onValueChange}
          // value={date}
          value={new Date()}
        // minimumDate={new Date()}
        // maximumDate={new Date(2025, 5)}
        />
      } */}

      <Modals.SimpleModal
        isVisible={headerModal}
        toggleModal={() => setHeaderModal(!headerModal)}
        onChangeVisibility={() => setHeaderModal(!headerModal)}
        data={[Translate('InsightsScreen.updateCurrentSavings'), Translate('InsightsScreen.updateSavingsGoal'), Translate('InsightsScreen.viewProjectedSavings')]}
        onPressItem={(item) => onPressHeaderModalData(item)}
      />

      <Modals.CalendarModal
        isVisible={isModalDateVisible}
        toggleModal={() => setModalDateVisible(!isModalDateVisible)}
        onChangeVisibility={() => setModalDateVisible(!isModalDateVisible)}
        Title={Translate('InsightsScreen.viewProjectedSavings')}
        selectValue={_date => onSetFirstDate(_date)}
      />

      <Modals.EditModal
        isVisible={currentSavingEditModal}
        toggleModal={() => setCurrentSavingEditModal(!currentSavingEditModal)}
        onChangeVisibility={() => setCurrentSavingEditModal(!currentSavingEditModal)}
        Title={Translate('InsightsScreen.editTotalSavings')}
        value={currentSaving}
        onPressExpenseData={editExpenseData}
        onChangeText={(cs) => setCurrentSaving(cs)}
        onBlur={(id) => {
          // editExpense(id)
          setCurrentSavingEditModal(!currentSavingEditModal)
        }}
      />

      <Modals.EditModal
        isVisible={savingGoalEditModal}
        toggleModal={() => setSavingGoalEditModal(!savingGoalEditModal)}
        onChangeVisibility={() => setSavingGoalEditModal(!savingGoalEditModal)}
        Title={Translate('InsightsScreen.editSavingsGoal')}
        value={savingGoal}
        onPressExpenseData={editExpenseData}
        onChangeText={(sg) => setSavingGoal(sg)}
        onBlur={(id) => {
          // editExpense(id)
          setSavingGoalEditModal(!savingGoalEditModal)
        }}
      />

      <Modals.SimpleModal
        isVisible={debtPayoffModal}
        toggleModal={() => setDebtPayoffModal(!debtPayoffModal)}
        onChangeVisibility={() => setDebtPayoffModal(!debtPayoffModal)}
        data={['Student Loan', 'Credit Card', 'Car Loan']}
        onPressItem={(item) => onPressDebtPayoffModal(item)}
        textColor={debtsPayoff}
      />

      <Modals.ShowTotalDebtsModal
        isVisible={showTotalDebtsModal}
        toggleModal={() => setShowTotalDebtsModal(!showTotalDebtsModal)}
        onChangeVisibility={() => setShowTotalDebtsModal(!showTotalDebtsModal)}
        data={[{ debtText: 'Loan', debtAmount: '$1,245' }, { debtText: 'Student Loan', debtAmount: '$143,245' }]}
      />

      <Modals.MonthYearPicker
        isVisible={selectDateModal}
        toggleModal={() => setSelectDateModal(!selectDateModal)}
        onChangeVisibility={() => setSelectDateModal(!selectDateModal)}
      />

      <Wrappers.Wrapper style={styles.progressChartView}>
        <Texts.SmallText style={styles.progressChartText}>{Translate('Monthly')}</Texts.SmallText>
        <Texts.SmallText style={styles.progressChartText}>{Translate('Overview')}</Texts.SmallText>
      </Wrappers.Wrapper>

    </Wrappers.Wrapper>
  );
};

export default Insights;
