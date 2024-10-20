import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, colors, fontFamily, sizes } from '../../services';
import Modal from 'react-native-modal';
import { styles } from './styles';
import { Buttons, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '..';
import { Calendar } from 'react-native-calendars';
import { Image } from 'react-native';
import { convert_numbers } from '../../services/utils/helperFunctions';
import { expenseList } from '../../services/dummyData';
import Delete from '../../assets/svgs/delete'
import Notification from '../../assets/svgs/notification';
import { ToolTips } from '../staticComponents';
import { NumericKeyboard } from '../../screenComponents/keyPad';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import Translate from '../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../services/dummyData';

// modal for center text
export const CenterModal = ({ isVisible, toggleModal, swipeDisabled, Text, Text1 }) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: height(35),
          justifyContent: 'center',
        }}>
        <Wrappers.Component style={[styles.centerView]}>
          <Texts.SmallText style={styles.viewText}>{Text}</Texts.SmallText>
        </Wrappers.Component>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for set currency
export const BottomModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  Title,
  Data,
  setCurrency,
  currency,
  OnSelectValue,
  modalHeight
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={[{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }, modalHeight]}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Texts.SmallText style={styles.headingTitle}>{Title}</Texts.SmallText>

          <ScrollViews.KeyboardAvoiding>
            {Data?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCurrency(item);
                    OnSelectValue();
                  }}>
                  <Wrappers.RowWrapperBasic
                    style={{
                      ...styles.viewArray,
                      borderBottomWidth: Data?.length - 1 == index ? 1 : 0,
                    }}>
                    <Icon
                      name={
                        currency == item
                          ? 'radio-btn-active'
                          : 'radio-btn-passive'
                      }
                      type="fontisto"
                      size={22}
                      style={styles.iconStyle}
                    />

                    <Texts.SmallText style={styles.textArray}>
                      {item}
                    </Texts.SmallText>
                  </Wrappers.RowWrapperBasic>
                </TouchableOpacity>
              );
            })}
            <Spacers.DoubleBase />
          </ScrollViews.KeyboardAvoiding>
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for multiple radio buttons
export const BottomModal1 = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  Title,
  Data,
  setFrequency,
  frequency,
  OnSelectValue,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Texts.SmallText style={styles.headingTitle}>{Title}</Texts.SmallText>

          {Data?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setFrequency(item);
                  OnSelectValue();
                }}>
                <Wrappers.RowWrapperBasic
                  style={{
                    ...styles.viewArray,
                    borderBottomWidth: Data?.length - 1 == index ? 1 : 0,
                  }}>
                  <Icon
                    name={
                      item == frequency
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                    type="fontisto"
                    size={22}
                    style={styles.iconStyle}
                  />

                  <Texts.SmallText style={styles.textArray}>
                    {item}
                  </Texts.SmallText>
                </Wrappers.RowWrapperBasic>
              </TouchableOpacity>
            );
          })}
          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for select date
export const CalendarModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  markedDates,
  selectValue,
  calculateDisabledDates,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Texts.SmallText style={styles.headingTitle}>{Title}</Texts.SmallText>
          {/* <TouchableOpacity
            activeOpacity={0}
            // disabled={true}
            onPress={onChangeVisibility}> */}
          <Calendar
            headerStyle={{
              backgroundColor: '#00000029',
              borderRadius: 15,
              marginBottom: 50,
            }}
            initialDate={new Date()}
            markedDates={markedDates}
            minDate={new Date()}
            disabled={!isVisible}
            onDayPress={day => {
              let _day = day.day;
              let _month = day.month;
              let _year = day.year;
              selectValue(`${_month}/${_day}/${_year}`);
            }}
            renderArrow={direction => {
              return (
                <Wrappers.Wrapper style={{ padding: 5 }}>
                  <Icon
                    name={
                      direction == 'left'
                        ? 'chevron-thin-left'
                        : 'chevron-thin-right'
                    }
                    type="entypo"
                    size={22}
                    color={colors.textColor}
                  />
                </Wrappers.Wrapper>
              );
            }}
            onMonthChange={calculateDisabledDates}
            theme={{
              backgroundColor: colors.white,
              calendarBackground: colors.white,
              textSectionTitleColor: colors.black,
              textSectionTitleDisabledColor: colors.black,
              selectedDayBackgroundColor: colors.textColor,
              selectedDayTextColor: colors.white,
              todayTextColor: colors.black,
              dayTextColor: colors.black,
              textDisabledColor: colors.disableText,
              monthTextColor: colors.textColor,
              textMonthFontFamily: fontFamily.appTextBold,
              textDayHeaderFontFamily: fontFamily.appTextBold,
              textDayFontWeight: fontFamily.appTextBold,
              textMonthFontWeight: fontFamily.appTextBold,
              textDayHeaderFontWeight: fontFamily.appTextBold,
              textDayFontSize: totalSize(1.5),
              textMonthFontSize: totalSize(2),
              textDayHeaderFontSize: totalSize(1.5),
              'stylesheet.calendar.header': {
                week: {
                  height: 0,
                },
              },
            }}
            disableAllTouchEventsForDisabledDays={true}
          />
          {/* </TouchableOpacity> */}
          <Wrappers.Row
            style={{
              marginHorizontal: width(7),
              position: 'absolute',
              left: 0,
              right: 0,
              // bottom: 0,
              top: '30%',
              height: height(6),
            }}>
            <Texts.SmallText style={styles.weekTitle}>{'S'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'M'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'T'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'W'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'T'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'F'}</Texts.SmallText>
            <Texts.SmallText style={styles.weekTitle}>{'S'}</Texts.SmallText>
          </Wrappers.Row>
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for show debts
export const DebtsModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  onPressAddIncome,
  debtIncome,
  onPressRemoveIcon,
  onPressCountinue,
  tooltipVisible,
  setModalTooltip,
  incomeCategory
}) => {
  const CopilotView = walkthroughable(View);
  const { start, currentStep, stop, goToNth } = useCopilot()

  if (tooltipVisible == true && currentStep == undefined) {
    void start()
    void goToNth(9)
  } else if (tooltipVisible == true && (currentStep?.order == 7 || currentStep?.order == 8)) {
    void goToNth(9)
  }

  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      // onRequestClose={onChangeVisibility}
      // swipeDirection={swipeDisabled ? null : 'down'}
      // onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      // onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />
          {debtIncome?.map((item, index) => {
            return (
              <Wrappers.Wrapper>
                {item?.incomeCategory == 'Primary Income' &&
                  <Wrappers.Wrapper>
                    <Wrappers.Wrapper style={styles.incomeView}>
                      <Texts.SmallText style={styles.incomeType}>{item?.incomeCategory}</Texts.SmallText>
                      <Spacers.Tiny />
                      <Texts.SmallText style={styles.incomeTitle}>{item?.incomeSource}</Texts.SmallText>
                    </Wrappers.Wrapper>
                    <Spacers.Base />
                  </Wrappers.Wrapper>
                }
              </Wrappers.Wrapper>
            )
          })}

          {debtIncome?.map((item, index) => {
            return (
              <ScrollView>
                {item?.incomeCategory == 'Additional Income' &&
                  <Wrappers.Wrapper>
                    <Wrappers.Row>
                      <Wrappers.Wrapper>
                        <CopilotStep text={ToolTiopsText.text9} order={8} name="menuIcon">
                          <CopilotView>
                            <Icon
                              name={'menu'}
                              type="entypo"
                              size={22}
                              color={colors.disableText}
                            />
                          </CopilotView>
                        </CopilotStep>
                      </Wrappers.Wrapper>

                      <Wrappers.Wrapper>
                        <Texts.SmallText style={styles.incomeType}>{item?.incomeCategory}</Texts.SmallText>
                        <Spacers.Tiny />
                        <Texts.SmallText style={styles.incomeTitle}>{item?.incomeSource}</Texts.SmallText>
                      </Wrappers.Wrapper>

                      <Wrappers.Wrapper>
                        <CopilotStep text={ToolTiopsText.text10} order={9} name="crossIcon">
                          <CopilotView>
                            <Icon
                              name={'close'}
                              type="materialicons"
                              size={22}
                              color={colors.disableText}
                              onPress={() => onPressRemoveIcon(index)}
                            />
                          </CopilotView>
                        </CopilotStep>
                      </Wrappers.Wrapper>
                    </Wrappers.Row>
                    <Spacers.Base />
                  </Wrappers.Wrapper>
                }
              </ScrollView>
            )
          })}

          <Buttons.Bordered
            text={`+ ${Translate('CreateBudgetScreen.addIncome')}`}
            buttonStyle={styles.buttonWidth}
            onPress={onPressAddIncome}
          />
          <Spacers.Base />

          <Buttons.ButtonColored
            text={Translate('Continue')}
            buttonColor={colors.textColor}
            tintColor={colors.white}
            buttonStyle={styles.buttonWidth}
            onPress={onPressCountinue}
          />

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for show expenses
export const ExpensesModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  onPressAddExpenses,
  expenses,
  onPressRemoveIcon,
  onPressCountinue
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      // onRequestClose={onChangeVisibility}
      // swipeDirection={swipeDisabled ? null : 'down'}
      // onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      // onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          {expenses?.map((item, index) => {
            return (
              <ScrollView>
                <Wrappers.Wrapper>
                  <Wrappers.Row>
                    <Wrappers.Wrapper>
                      <Image
                        source={appIcons.expenses}
                        resizeMode='contain'
                        style={{ width: totalSize(2), height: totalSize(2) }}
                      />
                    </Wrappers.Wrapper>

                    <Wrappers.Row>
                      <Texts.SmallText style={styles.expenseAmount}>{item?.expenseName}</Texts.SmallText>

                      <Icon
                        name='dot-single'
                        type='entypo'
                        size={20}
                        color={colors.placeholderColor}
                      />

                      <Texts.SmallText style={styles.expenseAmount}>{index == 0 ? index + 1 + 'st' : index == 1 ? index + 1 + 'nd'
                        : index == 2 ? index + 1 + 'rd' : index + 1 + 'th'}</Texts.SmallText>

                      <Icon
                        name='dot-single'
                        type='entypo'
                        size={20}
                        color={colors.placeholderColor}
                      />

                      <Texts.SmallText style={styles.expenseAmount}>{`$${convert_numbers(item?.expenseAmount)}`}</Texts.SmallText>
                    </Wrappers.Row>

                    <Wrappers.Wrapper>
                      <Icon
                        name={'close'}
                        type="materialicons"
                        size={22}
                        color={colors.disableText}
                        onPress={() => onPressRemoveIcon(index)}
                      />
                    </Wrappers.Wrapper>
                  </Wrappers.Row>
                  <Spacers.Base />
                </Wrappers.Wrapper>
              </ScrollView>
            )
          })}

          <Buttons.Bordered
            text={`+ ${Translate('RecurringExpensesScreen.addExpense')}`}
            buttonStyle={styles.buttonWidth}
            onPress={onPressAddExpenses}
          />
          <Spacers.Base />

          <Buttons.ButtonColored
            text={Translate('Continue')}
            buttonColor={colors.textColor}
            tintColor={colors.white}
            buttonStyle={styles.buttonWidth}
            onPress={onPressCountinue}
          />

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for show debts in add debts screen
export const ShowDebtsModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  onPressAddDebts,
  debts,
  onPressRemoveIcon,
  onPressCountinue
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      // onRequestClose={onChangeVisibility}
      // swipeDirection={swipeDisabled ? null : 'down'}
      // onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      // onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          {debts?.map((item, index) => {
            return (
              <ScrollView>
                <Wrappers.Wrapper>
                  <Wrappers.Row>
                    <Wrappers.Wrapper>
                      <Image
                        source={appIcons.expenses}
                        resizeMode='contain'
                        style={{ width: totalSize(2), height: totalSize(2) }}
                      />
                    </Wrappers.Wrapper>

                    <Wrappers.Row>
                      <Texts.SmallText style={styles.expenseAmount}>{item?.debtName}</Texts.SmallText>

                      <Icon
                        name='dot-single'
                        type='entypo'
                        size={20}
                        color={colors.placeholderColor}
                      />

                      <Texts.SmallText style={styles.expenseAmount}>{`$${convert_numbers(item?.debtAmount)}`}</Texts.SmallText>
                    </Wrappers.Row>

                    <Wrappers.Wrapper>
                      <Icon
                        name={'close'}
                        type="materialicons"
                        size={22}
                        color={colors.disableText}
                        onPress={() => onPressRemoveIcon(index)}
                      />
                    </Wrappers.Wrapper>
                  </Wrappers.Row>
                  <Spacers.Base />
                </Wrappers.Wrapper>
              </ScrollView>
            )
          })}

          <Buttons.Bordered
            text={`+ ${Translate('AddDebtScreen.addDebt')}`}
            buttonStyle={styles.buttonWidth}
            onPress={onPressAddDebts}
          />
          <Spacers.Base />

          <Buttons.ButtonColored
            text={Translate('Continue')}
            buttonColor={colors.textColor}
            tintColor={colors.white}
            buttonStyle={styles.buttonWidth}
            onPress={onPressCountinue}
          />

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for select expenses 
export const ExpensesCategoriesModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  ref,
  Title,
  setExpenseName
}) => {

  // flatlist render
  const renderOnBoardings = ({ item }) => {
    return (
      <FlatList
        data={item}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => setExpenseName(item?.title)}>
              <Wrappers.Wrapper style={styles.flatlist}>
                <Spacers.Small />
                <Image source={item?.image} resizeMode="contain" style={styles.image} />
                <Spacers.Small />
                <Texts.Medium style={styles.title}>{item?.title}</Texts.Medium>
              </Wrappers.Wrapper>
            </TouchableOpacity>
          )
        }}
      />
    )
  };

  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Texts.SmallText style={styles.headingTitle}>{Title}</Texts.SmallText>
          <FlatList
            ref={ref}
            data={expenseList}
            horizontal={true}
            contentContainerStyle={{ zIndex: 100 }}
            showsHorizontalScrollIndicator={false}
            renderItem={renderOnBoardings}
            scrollEnabled={true}
          // onMomentumScrollBegin={updateCurrentSlideIndex}
          // numColumns={4}
          />

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for delete items 
export const DeleteModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  onPresssDelete,
  onPressCancel
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Wrappers.Wrapper style={styles.deleteView}>
            <Delete color={colors.red} />
          </Wrappers.Wrapper>
          <Spacers.Base />

          <Texts.SmallText style={styles.deleteTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
          <Buttons.ButtonColored
            text={Translate('Delete')}
            buttonColor={colors.red}
            tintColor={colors.white}
            buttonStyle={styles.buttonWidth}
            onPress={onPresssDelete}
          />
          <Spacers.Base />

          <Buttons.Colored
            text={Translate('Cancel')}
            buttonColor={colors.lightRed}
            tintColor={colors.placeholderColor}
            buttonStyle={styles.buttonWidth}
            onPress={onPressCancel}
          />
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for Edit Expenses 
export const EditModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  onBlur,
  value,
  onChangeText,
  Currency,
  onPressExpenseData,
  onPressDone,
  onPressSkip,
  expenseAmount,
  skip,
  editExpenseAmount,
  setEditExpenseAmount
}) => {

  const buttons = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '.', value: '.' },
    { label: '0', value: '0' },
    { label: <Icon name='delete' type='feather' color={colors.black} />, value: 'cross' },
  ];

  const onPressKeypadValue = (value) => {
    let newValue = ''
    if (value == 'cross') {
      newValue = editExpenseAmount.slice(0, -1)
    } else {
      newValue = `${editExpenseAmount}${value}`
    }
    setEditExpenseAmount(newValue)
  }

  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Texts.SmallText style={styles.deleteTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
          <Wrappers.Component>
            <TextInputs.TextInputLowerBorder
              title={Translate('Amount')}
              value={`$ ${convert_numbers(editExpenseAmount)}`}
              keyboardType={'numeric'}
              Currency={Currency}
              editable={false}
            />
          </Wrappers.Component>
          <Spacers.Base />

          <View style={styles.keyboardView}>
            <View style={styles.keyboard}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={button.value}
                  style={{
                    ...styles.button,
                    borderLeftWidth: 0,
                    borderBottomWidth: index == 9 || index == 10 || index == 11 ? 1 : 0,
                    borderRightWidth: index == 2 || index == 5 || index == 8 || index == 11 ? 0 : 1
                  }}
                  activeOpacity={0.5}
                  onPress={() => onPressKeypadValue(button.value)}
                >
                  <Text style={styles.buttonLabel}>{button.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.tickView}>
              <TouchableOpacity
                style={{ ...styles.tick, height: skip ? height(18) : height(24) }}
                onPress={() => onPressDone(onPressExpenseData)}
                activeOpacity={0.5}
              >
                <Icon name='check' type='feather' color={colors.black} />
              </TouchableOpacity>

              {skip &&
                <TouchableOpacity style={styles.skipView}
                  onPress={onPressSkip}
                  activeOpacity={0.5}
                >
                  <Text style={styles.skipLabel}>{Translate('Skip')}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          <Spacers.Base />

        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for delete items 
export const ShowNotificationModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Wrappers.Wrapper style={styles.iconView}>
            <Notification color={colors.white} />
          </Wrappers.Wrapper>
          <Spacers.Base />

          <Texts.SmallText style={styles.notificationTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for delete items 
export const SimpleModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  data,
  onPressItem,
  textColor,
  margin,
  onPressDeleteIcon
}) => {
  // flatlist render items
  const renderFlatlist = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        {onPressDeleteIcon ?
          <Wrappers.Component>
            <Wrappers.Row>
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item?.budgetName}</Texts.SmallText>

              <TouchableOpacity activeOpacity={1}>
                <Icon
                  name={'close'}
                  type="materialicons"
                  size={22}
                  color={colors.textColor}
                  onPress={onPressDeleteIcon}
                />
              </TouchableOpacity>
            </Wrappers.Row>
          </Wrappers.Component>
          :
          <Wrappers.Wrapper>
            <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item}</Texts.SmallText>
          </Wrappers.Wrapper>
        }
      </TouchableOpacity>
    )
  }
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>

          {Title &&
            <>
              {margin ?
                <Wrappers.Component style={styles.titleView}>
                  <Texts.SmallText style={styles.addTitle}>{Title}</Texts.SmallText>
                </Wrappers.Component>
                :
                <Wrappers.Wrapper style={styles.titleView}>
                  <Texts.SmallText style={styles.addTitle}>{Title}</Texts.SmallText>
                </Wrappers.Wrapper>
              }
            </>
          }
          <Spacers.Base />
          <FlatList
            data={data}
            renderItem={renderFlatlist}
            keyExtractor={item => item?.id}
          />
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for Edit Expenses 
export const EditExpenseModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  value,
  onChangeText,
  Currency,
  onPressExpenseData,
  billDue,
  setEditExpenseFrequency,
  editExpenseFrequency,
  onPressDate,
  onPressDone,
  expenseAmount
}) => {
  const [editExpenseAmount, setEditExpenseAmount] = useState(expenseAmount);

  useEffect(() => {
    setEditExpenseAmount(expenseAmount)
  }, [expenseAmount])

  const buttons = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '.', value: '.' },
    { label: '0', value: '0' },
    { label: <Icon name='delete' type='feather' color={colors.black} />, value: 'cross' },
  ];

  const onPressKeypadValue = (value) => {
    let newValue = ''
    if (value == 'cross') {
      newValue = editExpenseAmount.slice(0, -1)
    } else {
      newValue = `${editExpenseAmount}${value}`
      // newValue = editExpenseAmount.concat(value)
    }
    setEditExpenseAmount(newValue)
  }


  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      style={{ margin: 0, borderWidth: 0 }}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Texts.SmallText style={styles.deleteTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
          <Wrappers.Component>
            <TextInputs.TextInputLowerBorder
              title={Translate('Amount')}
              value={`$ ${convert_numbers(editExpenseAmount)}`}
              keyboardType={'numeric'}
              Currency={Currency}
              editable={false}
            />

            <Spacers.Base />
            <Texts.SmallText>{Translate('Frequency')}</Texts.SmallText>
            <Spacers.Small />
            <FlatList
              data={['Monthly', 'Semi-Monthly', 'Weekly', 'Bi-Weekly']}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setEditExpenseFrequency(item)}>
                    <Wrappers.Wrapper
                      style={{
                        ...styles.textView,
                        backgroundColor: editExpenseFrequency == item ? colors.textColor : colors.lightRed,
                      }}>
                      <Texts.SmallTitle
                        style={{
                          ...styles.text,
                          color: editExpenseFrequency == item ? colors.white : colors.placeholderColor,
                        }}>
                        {item}
                      </Texts.SmallTitle>
                    </Wrappers.Wrapper>
                  </TouchableOpacity>
                )
              }}
              numColumns={3}
            />

            <Spacers.Small />

            <TouchableOpacity onPress={onPressDate}>
              <TextInputs.TextInputLowerBorder
                title={Translate('billDue')}
                placeholder={Translate('Select')}
                placeholderColor={colors.lightSilver}
                value={billDue}
                editable={false}
                right={
                  <Icon
                    name={billDue ? 'triangle-down' : 'controller-play'}
                    type="entypo"
                    size={12}
                  />
                }
              />
            </TouchableOpacity>

          </Wrappers.Component>
          <Spacers.Base />

          <View style={styles.keyboardView}>
            <View style={styles.keyboard}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={button.value}
                  style={{
                    ...styles.button,
                    borderLeftWidth: 0,
                    borderBottomWidth: index == 9 || index == 10 || index == 11 ? 1 : 0,
                    borderRightWidth: index == 2 || index == 5 || index == 8 || index == 11 ? 0 : 1
                  }}
                  activeOpacity={0.5}
                  onPress={() => onPressKeypadValue(button.value)}
                >
                  <Text style={styles.buttonLabel}>{button.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.tickView}>
              <TouchableOpacity
                style={{ ...styles.tick, height: height(24) }}
                onPress={onPressDone}
                activeOpacity={0.5}
              >
                <Icon name='check' type='feather' color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <Spacers.Base />
        </Wrappers.Wrapper>


      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for Edit Home data 
export const EditHomeModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  onBlur,
  value,
  onChangeText,
  Currency,
  expenseName,
  onChangeExpense,
  onPressMenuIcon,
  expenseImage,
  insideIconName,
  additionalIncomeName,
  setAdditionalIncomeName,
  onPressSource,
  onPressDone,
  additionalIncome
}) => {

  const [editExpenseAmount, setEditExpenseAmount] = useState(additionalIncome);

  useEffect(() => {
    setEditExpenseAmount(additionalIncome)
  }, [additionalIncome])

  const buttons = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '.', value: '.' },
    { label: '0', value: '0' },
    { label: <Icon name='delete' type='feather' color={colors.black} />, value: 'cross' },
  ];

  const onPressKeypadValue = (value) => {
    let newValue = ''
    if (value == 'cross') {
      newValue = editExpenseAmount.slice(0, -1)
    } else {
      newValue = `${editExpenseAmount}${value}`
    }
    setEditExpenseAmount(newValue)
  }

  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Texts.SmallText style={styles.deleteTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
          <Wrappers.Component>
            {onPressMenuIcon &&
              <TouchableOpacity activeOpacity={0.8} onPress={onPressMenuIcon} >
                <TextInputs.TextInputLowerBordered
                  placeholder={Translate('MyBudgetScreen.expenseName')}
                  value={expenseName}
                  onChangeText={onChangeExpense}
                  insideIconName={insideIconName}
                  inputStyle={styles.iconTextInput}
                  editable={false}
                  onPressMenuIcon={onPressMenuIcon}
                  expenseImage={expenseImage}
                  onBlur={onBlur}
                />
              </TouchableOpacity>
            }
            {onPressSource &&
              <TouchableOpacity activeOpacity={0.5} onPress={onPressSource} >
                <TextInputs.TextInputLowerBordered
                  placeholder={Translate('Source')}
                  value={additionalIncomeName}
                  editable={false}
                  onPressMenuIcon={onPressMenuIcon}
                  right={
                    <Icon name='caretdown' type='antdesign' size={12} />
                  }
                />
              </TouchableOpacity>
            }
            <TextInputs.TextInputLowerBorder
              title={Translate('Amount')}
              keyboardType={'numeric'}
              Currency={Currency}
              editable={false}
              value={`$ ${convert_numbers(editExpenseAmount)}`}
            />
          </Wrappers.Component>
          <Spacers.Base />

          <View style={styles.keyboardView}>
            <View style={styles.keyboard}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={button.value}
                  style={{
                    ...styles.button,
                    borderLeftWidth: 0,
                    borderBottomWidth: index == 9 || index == 10 || index == 11 ? 1 : 0,
                    borderRightWidth: index == 2 || index == 5 || index == 8 || index == 11 ? 0 : 1
                  }}
                  activeOpacity={0.5}
                  onPress={() => onPressKeypadValue(button.value)}
                >
                  <Text style={styles.buttonLabel}>{button.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.tickView}>
              <TouchableOpacity
                style={{ ...styles.tick, height: height(24) }}
                onPress={onPressDone}
                activeOpacity={0.5}
              >
                <Icon name='check' type='feather' color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for total debts on insight screen 
export const ShowTotalDebtsModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  data
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Wrappers.Row>
            <Texts.SmallText style={styles.totalDebtsTextHeader}>{Translate('Debt')}</Texts.SmallText>
            <Texts.SmallText style={styles.totalDebtsTextHeader}>{Translate('Amount')}</Texts.SmallText>
          </Wrappers.Row>

          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <Wrappers.Row>
                  <Texts.SmallText style={styles.totalDebtsText}>{item?.debtText}</Texts.SmallText>
                  <Texts.SmallText style={styles.totalDebtsText}>{item?.debtAmount}</Texts.SmallText>
                </Wrappers.Row>
              )
            }}
          />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for show debts on Edit budget screen
export const EditBudgetDebtsModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  debtIncome,
  onPressRemoveIcon,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />
          {debtIncome?.map((item, index) => {
            return (
              <Wrappers.Wrapper>
                {item?.incomeCategory == 'Primary Income' &&
                  <Wrappers.Wrapper>
                    <Wrappers.Wrapper style={styles.incomeView}>
                      <Texts.SmallText style={styles.incomeType}>{item?.incomeCategory}</Texts.SmallText>
                      <Spacers.Tiny />
                      <Texts.SmallText style={styles.incomeTitle}>{item?.incomeSource}</Texts.SmallText>
                    </Wrappers.Wrapper>
                    <Spacers.Base />
                  </Wrappers.Wrapper>
                }
              </Wrappers.Wrapper>
            )
          })}

          {debtIncome?.map((item, index) => {
            return (
              <ScrollView>
                {item?.incomeCategory == 'Additional Income' &&
                  <Wrappers.Wrapper>
                    <Wrappers.Row>
                      <Wrappers.Wrapper>
                        <Icon
                          name={'menu'}
                          type="entypo"
                          size={22}
                          color={colors.disableText}
                        />
                      </Wrappers.Wrapper>

                      <Wrappers.Wrapper>
                        <Texts.SmallText style={styles.incomeType}>{item?.incomeCategory}</Texts.SmallText>
                        <Spacers.Tiny />
                        <Texts.SmallText style={styles.incomeTitle}>{item?.incomeSource}</Texts.SmallText>
                      </Wrappers.Wrapper>

                      <Wrappers.Wrapper>
                        <Icon
                          name={'close'}
                          type="materialicons"
                          size={22}
                          color={colors.disableText}
                          onPress={() => onPressRemoveIcon(index)}
                        />
                      </Wrappers.Wrapper>
                    </Wrappers.Row>
                    <Spacers.Base />
                  </Wrappers.Wrapper>
                }
              </ScrollView>
            )
          })}

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for delete items 
export const OnBoardingModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  onPressSkip,
  onPresssNext,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />

          <Texts.SmallText style={styles.deleteTitle}>{Title}</Texts.SmallText>
          <Spacers.Base />
          <Wrappers.RowWrapperCenter>
            <Buttons.ButtonColored
              text={Translate('OnBoardingScreen.modalBtn1')}
              buttonColor={colors.textColor}
              tintColor={colors.white}
              buttonStyle={{ width: width(40) }}
              onPress={onPresssNext}
            />
            <Spacers.Base />

            <Buttons.Colored
              text={Translate('OnBoardingScreen.modalBtn2')}
              buttonColor={colors.textColor}
              tintColor={colors.white}
              buttonStyle={{ width: width(40) }}
              onPress={onPressSkip}
            />
          </Wrappers.RowWrapperCenter>
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for select date on insights 
export const MonthYearPicker = ({
  isVisible,
  toggleModal,
  onChangeVisibility,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Spacers.Base />
          <Picker
            style={{ backgroundColor: colors.white }}
            selectedValue='December   2023'
            pickerData={['September   2023', 'October   2023', 'November   2023', 'December   2023', 'January   2024', 'February   2024', 'March   2024']}
            onValueChange={value => { console.log(value) }}
          />
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};