/** @format */

import React, {useState} from 'react';
import {
  Buttons,
  Headers,
  ScrollViews,
  Spacers,
  Texts,
  Wrappers,
} from '../../../components';
import {colors, routes} from '../../../services';
import {styles} from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTP = props => {
  //useStates
  const [code, setCode] = useState('');

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <ScrollViews.KeyboardAvoiding>
        <Spacers.Base />

        <Headers.Back onBackPress={() => props.navigation.goBack()} />
        <Spacers.Base />

        <Wrappers.Component>
          <Texts.SmallTitle style={styles.title}>
            Enter 4 Digit Code
          </Texts.SmallTitle>
          <Spacers.Tiny />
          <Texts.SmallTitle style={styles.subTitle}>
            Enter the 4 digit code sent to your email
          </Texts.SmallTitle>
          <Spacers.Base />

          <OTPInputView
            style={styles.input_otp}
            pinCount={4}
            autoFocusOnLoad={false}
            editable={true}
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.opt_input}
          />
        </Wrappers.Component>
      </ScrollViews.KeyboardAvoiding>

      <Wrappers.AbsoluteWrapper>
        <Wrappers.Component>
          <Buttons.ButtonColored
            text="Verify"
            buttonColor={colors.textColor}
            tintColor={colors.white}
            onPress={() => {
              props.navigation.navigate(routes.newPassword);
            }}
          />
        </Wrappers.Component>
      </Wrappers.AbsoluteWrapper>
    </Wrappers.Wrapper>
  );
};

export default OTP;
