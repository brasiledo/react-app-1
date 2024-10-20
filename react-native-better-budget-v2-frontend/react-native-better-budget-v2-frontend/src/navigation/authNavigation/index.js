import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../services';
import * as auth from '../../screens/authFlow';
import TutorialFlow from '../../screens/tutorialFlow';
const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.splash}>
      <AuthStack.Screen name={routes.splash} component={auth.Splash} />
      <AuthStack.Screen name={routes.signIn} component={auth.SignIn} />
      <AuthStack.Screen name={routes.signUp} component={auth.SignUp} />
      <AuthStack.Screen name={routes.forgotPassword} component={auth.ForgotPassword} />
      <AuthStack.Screen name={routes.otp} component={auth.OTP} />
      <AuthStack.Screen name={routes.newPassword} component={auth.NewPassword} />
      <AuthStack.Screen name={routes.onBoarding} component={auth.OnBoarding} />
      <AuthStack.Screen name={routes.toturials} component={TutorialFlow} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
