import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, fontFamily, routes } from '../../services';
import * as App from '../../screens/appFlow';
import { totalSize, width, height } from 'react-native-dimension';
import { Spacers, Wrappers } from '../../components';
import { Home, Notification, Insights, Budget } from '../../assets/svgs';
import Translate from '../../services/languageStrings/translate';

const AppStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'tabs'}>

      <AppStack.Screen name={'tabs'} component={TabsScreen} />
      <AppStack.Screen name={routes.createBudget} component={App.CreateBudget} />
      <AppStack.Screen name={routes.addNetIncome} component={App.AddNetIncome} />
      <AppStack.Screen name={routes.addRecurringExpenses} component={App.AddRecurringExpenses} />
      <AppStack.Screen name={routes.addDebts} component={App.AddDebts} />
      <AppStack.Screen name={routes.showBudgetDetail} component={App.ShowBudgetDetail} />
      <AppStack.Screen name={routes.setting} component={App.Setting} />
      <AppStack.Screen name={routes.profile} component={App.Profile} />
      <AppStack.Screen name={routes.upgrade} component={App.Upgrade} />
      <AppStack.Screen name={routes.feedback} component={App.Feedback} />
      <AppStack.Screen name={routes.expenseBreakdown} component={App.ExpenseBreakdown} />
      <AppStack.Screen name={routes.editBudget} component={App.EditBudget} />

    </AppStack.Navigator>
  );
};

const TabsScreen = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarOptions: {
          activeTintColor: colors.black,
          inactiveTintColor: colors.black,
        },
      }}
      initialRouteName={routes.myBudget}>
      <Tabs.Screen
        name={routes.myBudget}
        component={App.MyBudget}
        options={() => ({
          headerShown: false,
          title: Translate('myBudget'),
          tabBarLabelStyle: {
            fontSize: totalSize(0.9),
            fontFamily: fontFamily.appTextBold,
          },
          tabBarActiveTintColor: colors.placeholderColor,
          tabBarInactiveTintColor: colors.lightSilver,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Wrappers.Wrapper
                    style={{
                      borderWidth: 1,
                      width: width(15),
                      height: height(0.5),
                      alignSelf: 'center',
                      backgroundColor: colors.textColor,
                      borderColor: colors.textColor,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : null}
                <Spacers.Tiny />
                <Home
                  color={focused ? colors.placeholderColor : colors.lightSilver}
                />
                <Spacers.Tiny />
              </>
            );
          },
        })}
      />

      <Tabs.Screen
        name={routes.insights}
        component={App.Insights}
        options={() => ({
          headerShown: false,
          title: Translate('Insights'),
          tabBarLabelStyle: {
            fontSize: totalSize(0.9),
            fontFamily: fontFamily.appTextBold,
          },
          tabBarActiveTintColor: colors.placeholderColor,
          tabBarInactiveTintColor: colors.lightSilver,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Wrappers.Wrapper
                    style={{
                      borderWidth: 1,
                      width: width(15),
                      height: height(0.5),
                      alignSelf: 'center',
                      backgroundColor: colors.textColor,
                      borderColor: colors.textColor,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : null}
                <Spacers.Tiny />
                <Insights
                  color={focused ? colors.placeholderColor : colors.lightSilver}
                  width={24}
                  height={24}
                />
                <Spacers.Tiny />
              </>
            );
          },
        })}
      />

      <Tabs.Screen
        name={routes.expenses}
        component={App.Expenses}
        options={() => ({
          headerShown: false,
          title: Translate('Expenses'),
          tabBarLabelStyle: {
            fontSize: totalSize(0.9),
            fontFamily: fontFamily.appTextBold,
          },
          tabBarActiveTintColor: colors.placeholderColor,
          tabBarInactiveTintColor: colors.lightSilver,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Wrappers.Wrapper
                    style={{
                      borderWidth: 1,
                      width: width(15),
                      height: height(0.5),
                      alignSelf: 'center',
                      backgroundColor: colors.textColor,
                      borderColor: colors.textColor,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : null}
                <Spacers.Tiny />
                <Budget
                  color={focused ? colors.placeholderColor : colors.lightSilver}
                  width={24}
                  height={24}
                />
                <Spacers.Tiny />
              </>
            );
          },
        })}
      />

      <Tabs.Screen
        name={routes.notifications}
        component={App.Notifications}
        options={() => ({
          headerShown: false,
          title: Translate('Notifications'),
          tabBarLabelStyle: {
            fontSize: totalSize(0.9),
            fontFamily: fontFamily.appTextBold,
          },
          tabBarActiveTintColor: colors.placeholderColor,
          tabBarInactiveTintColor: colors.lightSilver,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Wrappers.Wrapper
                    style={{
                      borderWidth: 1,
                      width: width(15),
                      height: height(0.5),
                      alignSelf: 'center',
                      backgroundColor: colors.textColor,
                      borderColor: colors.textColor,
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  />
                ) : null}
                <Spacers.Tiny />
                <Notification
                  color={focused ? colors.placeholderColor : colors.lightSilver}
                />
                <Spacers.Tiny />
              </>
            );
          },
        })}
      />
    </Tabs.Navigator>
  );
};

export default AppNavigation;
