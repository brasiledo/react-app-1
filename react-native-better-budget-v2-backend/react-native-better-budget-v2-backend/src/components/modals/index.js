import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, colors, fontFamily, selectedCurrencySymbol, sizes } from '../../services';
import Modal from 'react-native-modal';
import { styles } from './styles';
import { Buttons, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '..';
import { Calendar } from 'react-native-calendars';
import { Image } from 'react-native';
import { convert_numbers } from '../../services/utils/helperFunctions';
import { expenseList } from '../../services/dummyData';
import Delete from '../../assets/svgs/delete'
import Notification from '../../assets/svgs/notification';
import { Picker } from 'react-native-wheel-pick';
import Translate from '../../services/languageStrings/translate';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../services/dummyData';
import moment from 'moment';
import DraggableFlatList, { NestableDraggableFlatList, ScaleDecorator } from 'react-native-draggable-flatlist';
import { MultipleView } from '../../screenComponents/createBudget';

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
                key={index}
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
              key={index}
                onPress={() => {
                  setFrequency(item);
                  OnSelectValue(item);
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

  let currDate= new Date()
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0, }}
      onBackdropPress={toggleModal}
      backdropOpacity={0.6}>
      <Wrappers.Wrapper
        flex={1}
        style={{
          backgroundColor: colors.white,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          // paddingBottom:height(3)
        }}>
        <Wrappers.Wrapper style={[styles.swipableModalFooter]}>
          <Texts.SmallText style={styles.headingTitle}>{Title}</Texts.SmallText>

          <Calendar
            headerStyle={{
              backgroundColor: '#00000029',
              borderRadius: 15,
              marginBottom: 50,
            }}
            initialDate={currDate?.toDateString()}
            markedDates={markedDates}
            minDate={currDate?.toDateString()}
            disabled={!isVisible}
            onDayPress={day => {
              let _day = day.day;
              let _month = day.month;
              let _year = day.year;
              // selectValue(`${_day}/${_month}/${_year}`);
              selectValue(day)
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
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
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
  incomeCategory,
  tooltipVisibleModal,
  user
}) => {
  const CopilotView = walkthroughable(View);
  const { start, currentStep, stop, goToNth } = useCopilot()

  if (tooltipVisibleModal == true && user?.firstTimeLogin == true) {
    if (tooltipVisible == true && currentStep?.order == 8) {
      void start()
      void goToNth(9)
    } else if (tooltipVisible == true && currentStep?.order == 9) {
      void goToNth(10)
      setModalTooltip(false)
    } else if (tooltipVisible == true && currentStep?.order !== undefined) {
      void start()
      void goToNth(9)
    }
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
  onPressCountinue,
  isLoading
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
                      <Texts.SmallText style={styles.expenseAmount}>{item?.userExpenseName}</Texts.SmallText>

                      <Icon
                        name='dot-single'
                        type='entypo'
                        size={20}
                        color={colors.placeholderColor}
                      />

                      <Texts.SmallText style={styles.expenseAmount}>{item?.nextBillDue}</Texts.SmallText>

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
            isLoading={isLoading}
          />

          <Spacers.Base />
        </Wrappers.Wrapper>
      </Wrappers.Wrapper>
    </Modal>
  );
};

export const SimulatedExpensesModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  onPressAddExpenses,
  onPressExpense,
  expenses,
  onPressRemoveIcon,
  onPressCountinue,
  isLoading
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
            console.log(item)
            return (
              <ScrollView>
                <Pressable onPress={() => onPressExpense(item, index)}>
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
                        <Texts.SmallText style={styles.expenseAmount}>{item?.userExpenseName}</Texts.SmallText>

                        <Icon
                          name='dot-single'
                          type='entypo'
                          size={20}
                          color={colors.placeholderColor}
                        />

                        <Texts.SmallText style={styles.expenseAmount}>{item?.nextBillDue}</Texts.SmallText>

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
                </Pressable>
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
            isLoading={isLoading}
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
  onPressCountinue,
  Currency,
  isLoading
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

                      <Texts.SmallText style={styles.expenseAmount}>{selectedCurrencySymbol(Currency)} {convert_numbers(item?.debtAmount)}</Texts.SmallText>
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
            isLoading={isLoading}
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
  swipeDisabled = true,
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
  onPressCancel,
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
  setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage,
  placeholder
}) => {

  const [editAmount, setEditAmount] = useState('');


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
      newValue = editAmount?.slice(0, -1)
    } else {
      newValue = `${editAmount}${value}`
    }
    setEditAmount(newValue)
  }

  const onPressDoneLocal = () => {
    console.log(editAmount, amountLimit)
    if (parseInt(editAmount) > parseInt(amountLimit)) {
      setErrorMessage('Entered amount higher than available income')
    }
    else {
      setErrorMessage('')
      onPressDone(editAmount)
    }
    // onPressDone(editExpenseAmount)
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
              value={`${convert_numbers(editAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.placeholderColor}
              keyboardType={'numeric'}
              error={errorMessage}
              Currency={selectedCurrencySymbol(Currency)}
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
                onPress={onPressDoneLocal}
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


// modal for Edit Expenses 
export const EditVariableModal = ({
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
  setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage,
  placeholder
}) => {

  const [editAmount, setEditAmount] = useState('');


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
      newValue = editAmount?.slice(0, -1)
    } else {
      newValue = `${editAmount}${value}`
    }
    setEditAmount(newValue)
  }

  const onPressDoneLocal = () => {
    if (parseInt(editAmount) > parseInt(amountLimit)) {
      setErrorMessage('Entered amount higher than available income')
    }
    else {
      setErrorMessage('')
      onPressDone(editAmount)
    }
    // onPressDone(editExpenseAmount)
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
              value={`${convert_numbers(editAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.placeholderColor}
              keyboardType={'numeric'}
              error={errorMessage}
              Currency={selectedCurrencySymbol(Currency)}
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
                onPress={onPressDoneLocal}
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
// modal for Edit Savings Goal 
export const EditSavingsGoalModal = ({
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
  setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage,
  placeholder
}) => {

  const [editAmount, setEditAmount] = useState('');


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
      newValue = editAmount?.slice(0, -1)
    } else {
      newValue = `${editAmount}${value}`
    }
    setEditAmount(newValue)
  }

  const onPressDoneLocal = () => {
    console.log('HERE', editAmount, amountLimit)
    if (parseInt(editAmount) < parseInt(amountLimit)) {
      setErrorMessage('Entered amount is less than the total savings')
    }
    else if (editAmount.length == 0) {
      setErrorMessage('Enter an amount!')
    }
    else {
      setErrorMessage('')
      onPressDone(editAmount)
    }
    // onPressDone(editExpenseAmount)
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
              value={`${convert_numbers(editAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.placeholderColor}
              keyboardType={'numeric'}
              error={errorMessage}
              Currency={selectedCurrencySymbol(Currency)}
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
                onPress={onPressDoneLocal}
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

// modal for Edit Expenses 
export const EditModalBudgetDebt = ({
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
  setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage,
  placeholder,
  totalDebt
}) => {

  const [editAmount, setEditAmount] = useState('');


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
      newValue = editAmount?.slice(0, -1)
    } else {
      newValue = `${editAmount}${value}`
    }
    setEditAmount(newValue)
  }

  const onPressDoneLocal = () => {
    if (parseInt(editAmount) > parseInt(amountLimit)) {
      setErrorMessage('Entered amount higher than available income')
    }
    else if (parseInt(editAmount) > parseInt(totalDebt)) {
      setErrorMessage('Entered amount higher than debt total')
    }
    else {
      setErrorMessage('')
      onPressDone(editAmount)
    }
    // onPressDone(editExpenseAmount)
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
              value={`${convert_numbers(editAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.placeholderColor}
              keyboardType={'numeric'}
              error={errorMessage}
              Currency={selectedCurrencySymbol(Currency)}
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
                onPress={onPressDoneLocal}
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
  onPressDeleteIcon,
  objKey,
  swipeable = false,
  onDragEnd
}) => {


  // render flatlist for debts
  const renderSwipeableFlatlist = ({ item, drag, isActive, getIndex }) => {
    const index = getIndex()
    return (
      <ScaleDecorator>
        <TouchableOpacity onPress={() => onPressItem(item, index)} onLongPress={drag}>
          <Wrappers.Wrapper>
            <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor ? colors.button : colors.placeholderColor }}>{item[objKey] ?? item}</Texts.SmallText>
          </Wrappers.Wrapper>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  const renderFlatlist = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item, index)}>
        {onPressDeleteIcon ?
          <Wrappers.Component>
            <Wrappers.Row>
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor ? colors.button : colors.placeholderColor }}>{item?.budgetName}</Texts.SmallText>

              <TouchableOpacity activeOpacity={1}>
                <Icon
                  name={'cross'}
                  type={"entypo"}
                  size={24}
                  color={colors.textColor}
                  onPress={() => onPressDeleteIcon(index)}
                />
              </TouchableOpacity>
            </Wrappers.Row>
          </Wrappers.Component>
          :
          <Wrappers.Wrapper>
            {objKey == 'Incomes' ? (
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor ? colors.button : colors.placeholderColor }}>{item?.nextPayDate ? `${item?.incomeSource} • ${selectedCurrencySymbol(item?.currency)}${convert_numbers(item?.netIncome - (item?.usedIncome ?? 0))} • ${item?.nextPayDate}` : item}</Texts.SmallText> //'Dan’s Paycheck • $1,200 • 12/27/22'

            ) : (
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor ? colors.button : colors.placeholderColor }}>{item[objKey] ?? item}</Texts.SmallText>

            )}
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

          {swipeable ? (
            <DraggableFlatList
              data={data}
              renderItem={renderSwipeableFlatlist}
              keyExtractor={(item, index) => index}
              onDragEnd={({ data }) => onDragEnd(data)}
            />
          ) : (
            <FlatList
              data={data}
              renderItem={renderFlatlist}
              keyExtractor={item => item?.id}
            />
          )}

          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

export const SwipeItemsModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  Title,
  data,
  onPressItem,
  textColor,
  margin,
  onPressDeleteIcon,
  objKey,
  swipeable = true,
  onDragEnd
}) => {


  // render flatlist for debts
  const renderSwipeableFlatlist = ({ item, drag, isActive, getIndex }) => {
    const index = getIndex()
    return (
      <ScaleDecorator>
        <TouchableOpacity onPress={() => onPressItem(item, index)} onLongPress={drag}>
          <Wrappers.Wrapper>
            <Texts.SmallText style={{ ...styles.flatlistTitle, color: item === Translate('MyBudgetScreen.addAdditionalIncome') ? colors.button : textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item[objKey] ?? item}</Texts.SmallText>
          </Wrappers.Wrapper>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  const renderFlatlist = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item, index)}>
        {onPressDeleteIcon ?
          <Wrappers.Component>
            <Wrappers.Row>
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item?.budgetName}</Texts.SmallText>

              <TouchableOpacity activeOpacity={1}>
                <Icon
                  name={'cross'}
                  type={"entypo"}
                  size={24}
                  color={colors.textColor}
                  onPress={() => onPressDeleteIcon(index)}
                />
              </TouchableOpacity>
            </Wrappers.Row>
          </Wrappers.Component>
          :
          <Wrappers.Wrapper>
            {objKey == 'Incomes' ? (
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item?.nextPayDate ? `${item?.incomeSource} • ${selectedCurrencySymbol(item?.currency)}${convert_numbers(item?.netIncome)} • ${item?.nextPayDate}` : item}</Texts.SmallText> //'Dan’s Paycheck • $1,200 • 12/27/22'

            ) : (
              <Texts.SmallText style={{ ...styles.flatlistTitle, color: item === Translate('MyBudgetScreen.addAdditionalIncome') ? colors.button : textColor == item ? colors.lightGreen : colors.placeholderColor }}>{item[objKey] ?? item}</Texts.SmallText>

            )}
          </Wrappers.Wrapper>
        }
      </TouchableOpacity>
    )
  }
  return (
    <Modal
      // animationType="slide"
      isVisible={isVisible}
      transparent
      // onRequestClose={onChangeVisibility}
      // swipeDirection={swipeDisabled ? null : 'down'}
      // onSwipeComplete={toggleModal}
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

          {swipeable ? (
            <DraggableFlatList
              data={data}
              renderItem={renderSwipeableFlatlist}
              keyExtractor={(item, index) => index}
              onDragEnd={({ data }) => onDragEnd(data)}
            />
          ) : (
            <FlatList
              data={data}
              renderItem={renderFlatlist}
              keyExtractor={item => item?.id}
            />
          )}

          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for Edit Expenses 
export const EditCurrentIncomeModal = ({
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
  // editExpenseAmount,
  // setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage,
  placeholder
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

  const [editExpenseAmount, setEditExpenseAmount] = useState('')

  const onPressKeypadValue = (value) => {
    let newValue = ''
    if (value == 'cross') {
      newValue = editExpenseAmount?.slice(0, -1)
    } else if (amountLimit) {
      if (parseFloat(`${editExpenseAmount}${value}`) <= parseFloat(amountLimit)) {
        newValue = parseFloat(`${editExpenseAmount}${value}`)
        setErrorMessage('')
      } else {
        newValue = editExpenseAmount
        setErrorMessage('Higher amount entered')
      }
    }
    else {
      newValue = `${editExpenseAmount}${value}`
      setErrorMessage('')
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
              placeholder={`${selectedCurrencySymbol(Currency)} ${placeholder}`}
              placeholderColor={colors.placeholderColor}
              value={editExpenseAmount == '' ? '' : `${selectedCurrencySymbol(Currency)} ${convert_numbers(editExpenseAmount)}`}
              keyboardType={'numeric'}
              error={errorMessage}
              // Currency={Currency}
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
                onPress={() => onPressDone(editExpenseAmount)}
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
  selectedExpenseData,
  billDue,
  onPressDate,
  onPressDone,
  expenseAmount,
  // setEditExpenseAmount,
  // setExpenseAmount,
  placeholder,
  setEditExpenseFrequency,
  setEditExpenseDate,
  // editExpenseAmount,
  editExpenseFrequency,
  editExpenseDate,
  editExpenseType,
  setEditExpenseType,
  editExpenseName,
  setEditExpenseName
}) => {
  const [editExpenseAmount, setEditExpenseAmount] = useState('');


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
      newValue = editExpenseAmount?.slice(0, -1)
    } else {
      newValue = `${editExpenseAmount}${value}`
    }
    setEditExpenseAmount(newValue)
  }

  // const [expenseType, setExpenseType] = useState('Fixed');


  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      onBackdropPress={toggleModal}
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
              title={Translate('Name')}
              value={editExpenseName}
              placeholderColor={colors.black}
              onChangeText={(val) => setEditExpenseName(val)}
            />
            <Spacers.Base />
            <TextInputs.TextInputLowerBorder
              title={Translate('Amount')}
              value={`${convert_numbers(editExpenseAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.black}
              keyboardType={'numeric'}
              Currency={selectedCurrencySymbol(Currency)}
              editable={false}
            />
            <Spacers.Base />
            <MultipleView
              Title={Translate('RecurringExpensesScreen.expenseType')}
              Value1="Fixed"
              Value2="Variable"
              onPress={v => setEditExpenseType(v)}
              textColor={
                editExpenseType == 'Fixed'
                  ? colors.white
                  : colors.placeholderColor
              }
              viewColor={
                editExpenseType == 'Fixed' ? colors.textColor : colors.lightRed
              }
              textColor1={
                editExpenseType == 'Variable'
                  ? colors.white
                  : colors.placeholderColor
              }
              viewColor1={
                editExpenseType == 'Variable' ? colors.textColor : colors.lightRed
              }
            />
            <Spacers.Base />
            <Texts.SmallText>{Translate('Frequency')}</Texts.SmallText>
            <Spacers.Small />
            <FlatList
              data={['Every Pay Cycle', 'Monthly', 'Twice a Month', 'Every 3 Months', 'Every 6 Months', 'Every Year']}
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
                value={editExpenseDate == '-' ? '' : moment(editExpenseDate, 'MM/DD/YYYY').format('MM/DD/YYYY')}
                editable={false}
                right={
                  <Icon
                    name={editExpenseDate ? 'triangle-down' : 'controller-play'}
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
                onPress={() => onPressDone({ ...selectedExpenseData, expenseAmount: editExpenseAmount })}
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

export const EditDebtModal = ({

  isVisible,
  toggleModal,
  Title,
  debtAmount,
  onPressDone,
  selectedDebtData,
  setEditDebtAmount,
  setEditDebtName,
  editDebtAmount,
  editDebtName,
  Currency,
  placeholder

}) => {
  const [editExpenseAmount, setEditExpenseAmount] = useState('');

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
      newValue = editExpenseAmount?.slice(0, -1)
    } else {
      newValue = `${editExpenseAmount}${value}`
      // newValue = editExpenseAmount.concat(value)
    }
    setEditExpenseAmount(newValue)
  }

  // const [expenseType, setExpenseType] = useState('Fixed');


  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      onBackdropPress={toggleModal}
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
              value={`${convert_numbers(editExpenseAmount)}`}
              placeholder={`${convert_numbers(placeholder)}`}
              placeholderColor={colors.black}
              keyboardType={'numeric'}
              Currency={selectedCurrencySymbol(Currency)}
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
                style={{ ...styles.tick, height: height(24) }}
                onPress={() => onPressDone({ ...selectedDebtData, debtAmount: editExpenseAmount })}
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
  setAdditionalIncome,
  onPressSource,
  onPressDone,
  additionalIncome,
  amountLimit
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
    if (setEditExpenseAmount)
      setEditExpenseAmount(newValue)

    if (setAdditionalIncome)
      setAdditionalIncome(newValue)
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
                  // editable={false}
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
              placeholder={'0'}
              keyboardType={'numeric'}
              Currency={selectedCurrencySymbol(Currency)}
              editable={false}
              value={`${convert_numbers(editExpenseAmount)}`}
              onChangeText={(text) => console.log('TEXT', text)}
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
                onPress={() => onPressDone({ userExpenseName: expenseName, expenseAmount: editExpenseAmount })}
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
  data,
  currency
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0, paddingBottom: 20 }}
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
                  <Texts.SmallText style={styles.totalDebtsText}>{item?.debtName}</Texts.SmallText>
                  <Texts.SmallText style={styles.totalDebtsText}>{`${currency} ${convert_numbers(item?.debtAmount)}`}</Texts.SmallText>
                </Wrappers.Row>
              )
            }}
          />
          <Spacers.DoubleBase />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};

// modal for total debts on insight screen 
export const ShowTotalExpensesModal = ({
  isVisible,
  toggleModal,
  swipeDisabled,
  onChangeVisibility,
  data,
  onSelectItem,
  currency
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      transparent
      onRequestClose={onChangeVisibility}
      swipeDirection={swipeDisabled ? null : 'down'}
      onSwipeComplete={toggleModal}
      style={{ margin: 0, borderWidth: 0, paddingBottom: 20 }}
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
            <Texts.SmallText style={styles.totalDebtsTextHeader}>{Translate('Expenses')}</Texts.SmallText>
            <Texts.SmallText style={styles.totalDebtsTextHeader}>{Translate('Amount')}</Texts.SmallText>
          </Wrappers.Row>

          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => onSelectItem(item, index)}>
                  <Wrappers.Row>
                    <Texts.SmallText style={styles.totalDebtsText}>{item?.userExpenseName}</Texts.SmallText>
                    <Texts.SmallText style={styles.totalDebtsText}>{`${currency} ${convert_numbers(item?.expenseAmount)}`}</Texts.SmallText>
                  </Wrappers.Row>
                </TouchableOpacity>
              )
            }}
          />
          <Spacers.DoubleBase />
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

// modal for show or skip tooltips 
export const tooltipModal = ({
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
  data,
  setSelected,
  selected
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
            selectedValue={selected}
            pickerData={data}
            onValueChange={value => setSelected(value)}

          />
          <Spacers.Base />
        </Wrappers.Wrapper>

      </Wrappers.Wrapper>
    </Modal>
  );
};


export const AmountModal = ({
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
  setEditExpenseAmount,
  errorMessage,
  amountLimit,
  setErrorMessage
}) => {


  const [amount, setAmount] = useState(0)
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
      newValue = editExpenseAmount?.slice(0, -1)
    } else if (amountLimit) {
      if (parseFloat(`${editExpenseAmount}${value}`) <= parseFloat(amountLimit)) {
        newValue = parseFloat(`${editExpenseAmount}${value}`)
        setErrorMessage('')
      } else {
        newValue = editExpenseAmount
        setErrorMessage('Higher amount entered')
      }
    }
    else {
      newValue = `${editExpenseAmount}${value}`
      setErrorMessage('')
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
              placeholder={`${selectedCurrencySymbol(Currency)} 0`}
              placeholderColor={colors.placeholderColor}
              value={editExpenseAmount == '' ? '' : `${selectedCurrencySymbol(Currency)} ${convert_numbers(editExpenseAmount)}`}
              keyboardType={'numeric'}
              error={errorMessage}
              // Currency={Currency}
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
                onPress={() => onPressDone(editExpenseAmount)}
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