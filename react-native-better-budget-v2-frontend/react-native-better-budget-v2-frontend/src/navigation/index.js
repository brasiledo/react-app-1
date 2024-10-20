import React from 'react';
import {routes} from '../services';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="auth">
        <Stack.Screen name={routes.auth} component={AuthNavigation} />
        <Stack.Screen name={routes.app} component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
