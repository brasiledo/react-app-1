import React from 'react';
import { appStyles, colors } from '../../services/utilities';
import { BackIcon } from '../../components';

export const baseURL = '';
export const endPoints = {
  login: 'login',
  courses: 'rooms',
  classes: 'classes',
};
export const routes = {
  auth: 'auth',
  app: 'app',
  toturials: 'toturials',
  //Auth
  splash: 'splash',
  signIn: 'signIn',
  signUp: 'signUp',
  forgotPassword: 'forgotPassword',
  otp: 'otp',
  newPassword: 'newPassword',
  onBoarding: 'onBoarding',

  //App
  myBudget: 'myBudget',
  insights: 'insights',
  expenses: 'expenses',
  notifications: 'notifications',
  expenseBreakdown: 'expenseBreakdown',
  editBudget: 'editBudget',

  //Create budget
  createBudget: 'createBudget',
  addNetIncome: 'addNetIncome',
  addRecurringExpenses: 'addRecurringExpenses',
  addDebts: 'addDebts',
  showBudgetDetail: 'showBudgetDetail',

  // Setting Screens
  setting: 'setting',
  profile: 'profile',
  upgrade: 'upgrade',
  feedback: 'feedback',
};
export const headers = {
  screenOptions: {
    // headerShown: false,
    title: 'Title',
    headerTitleAlign: 'left',
    headerStyle: [appStyles.headerStyle],
    headerTitleStyle: appStyles.headerTitleStyle,
    headerTintColor: colors.appTextColor4,
    headerBackImage: () => <BackIcon />,
    headerBackTitle: ' ',
  },
};
export const tabs = {
  tabBarOptions: {
    showLabel: false,
    tabBarActiveTintColor: colors.appColor1,
    tabBarInactiveTintColor: colors.appBgColor3,
    allowFontScaling: true,
    tabBarStyle: appStyles.tabBarStyle,
    activeBackgroundColor: '#FFFFFF40',
    tabStyle: { borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2 },
  },
};
