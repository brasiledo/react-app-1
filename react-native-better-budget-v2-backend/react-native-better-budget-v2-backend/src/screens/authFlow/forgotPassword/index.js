/** @format */

import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { Buttons, Headers, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '../../../components';
import { colors, routes, Validations } from '../../../services';
import { ResetPassword } from '../../../services/utils/auth';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';

const ForgotPassword = props => {
  //useStates
  const [email, setEmail] = useState('');

  // onPress Countinue
  const HandlePasswordReset = () => {
    ResetPassword(email).then(res => {
      if (res == true) {
        Toast.show(Translate('ForgotPasswordScreen.Toast'));
        props.navigation.navigate(routes.signIn);
      } else Toast.show(res);
    });
  };

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <ScrollViews.KeyboardAvoiding>
        <Spacers.Base />

        <Headers.Back onBackPress={() => props.navigation.goBack()} />
        <Spacers.Base />

        <Wrappers.Component>
          <Texts.SmallTitle style={styles.title}>
            {Translate('SignInScreen.forgotPassword')}
          </Texts.SmallTitle>
          <Spacers.Tiny />
          <Texts.SmallTitle style={styles.subTitle}>
            {Translate('ForgotPasswordScreen.Detail')}
          </Texts.SmallTitle>

          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={Translate('Email')}
            placeholder={Translate('emailPlaceholder')}
            value={email}
            onChangeText={userpas => setEmail(userpas)}
          />
        </Wrappers.Component>
      </ScrollViews.KeyboardAvoiding>

      <Wrappers.AbsoluteWrapper>
        <Wrappers.Component>
          <Buttons.ButtonColored
            text={Translate('Continue')}
            buttonColor={email && Validations.validateEmail(email) ?
              colors.textColor : colors.disableText}
            disabled={email && Validations.validateEmail(email) ? false : true}
            tintColor={colors.white}
            onPress={() => { HandlePasswordReset() }}
          />
        </Wrappers.Component>
      </Wrappers.AbsoluteWrapper>
    </Wrappers.Wrapper>
  );
};

export default ForgotPassword;
