/** @format */

import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {
  Buttons,
  Headers,
  ScrollViews,
  Spacers,
  TextInputs,
  Texts,
  Wrappers,
} from '../../../components';
import {colors, routes} from '../../../services';
import {styles} from './styles';

const NewPassword = props => {
  //useStates
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <ScrollViews.KeyboardAvoiding>
        <Spacers.Base />

        <Headers.Back onBackPress={() => props.navigation.goBack()} />
        <Spacers.Base />

        <Wrappers.Component>
          <Texts.SmallTitle style={styles.title}>
            Set New Password
          </Texts.SmallTitle>

          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={'New Password'}
            placeholder="************"
            secureTextEntry={showPassword ? false : true}
            value={password}
            onChangeText={userpas => setPassword(userpas)}
            right={
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                type="feather"
                size={20}
                onPress={() => setShowPassword(!showPassword)}
                iconStyle={styles.icon_sty}
              />
            }
          />

          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={'Confirm New Password'}
            placeholder="************"
            secureTextEntry={showConfirmPassword ? false : true}
            value={confirmPassword}
            onChangeText={userpas => setConfirmPassword(userpas)}
            right={
              <Icon
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                type="feather"
                size={20}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                iconStyle={styles.icon_sty}
              />
            }
          />

          <Spacers.Base />
          <Spacers.Base />
        </Wrappers.Component>
      </ScrollViews.KeyboardAvoiding>

      <Wrappers.AbsoluteWrapper>
        <Wrappers.Component>
          <Buttons.ButtonColored
            text="Update Password"
            buttonColor={colors.textColor}
            tintColor={colors.white}
            onPress={() => {
              props.navigation.navigate(routes.signIn);
            }}
          />
        </Wrappers.Component>
      </Wrappers.AbsoluteWrapper>
    </Wrappers.Wrapper>
  );
};

export default NewPassword;
