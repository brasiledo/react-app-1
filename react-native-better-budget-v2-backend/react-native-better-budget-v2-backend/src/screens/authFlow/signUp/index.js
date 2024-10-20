/** @format */

import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Buttons, Headers, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '../../../components';
import { appIcons, colors, routes, Validations } from '../../../services';
import { styles } from './styles';
import RoundCheckbox from '../../../components/roundCheckBox';
import { width, totalSize } from 'react-native-dimension'
import { signUp } from '../../../services/utils/auth';
import { useDispatch } from 'react-redux';
import { Users } from '../../../Redux/actions/Auth';
import { handleCheckPassword } from '../../../services/utils/helperFunctions';
import Translate from '../../../services/languageStrings/translate';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()

  //useStates
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptPolicy, setAccepyPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  // Valiadtions useStates
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // All Functions
  // validation function
  const Validation = () => {
    let securityCheck = handleCheckPassword(password)
    let securityCheck1 = handleCheckPassword(confirmPassword)

    if (password == confirmPassword) {
      if (securityCheck == true && securityCheck1 == true) {
        return true
      } else {
        if (securityCheck != true && securityCheck1 != true) {
          setPasswordError(securityCheck)
          setConfirmPasswordError(securityCheck1)
        } else if (securityCheck != true) {
          setPasswordError(securityCheck)
        } else {
          setConfirmPasswordError(securityCheck1)
        }
        return false
      }
    } else {
      setConfirmPasswordError(Translate('SignUpScreen.passwordError'))
    }
  }

  // onPress signup
  const HandleSignUp = () => {
    if (Validation()) {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        firstTimeLogin: true,
        email: email,
        password: password,
      }
      setLoading(true);
      signUp(userData)
        .then(res => {
          if (res?.success) {
            dispatch(Users(res?.user));
            setLoading(false);
            navigation.replace(routes.signIn);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false)
        });
    }
  }

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <ScrollViews.KeyboardAvoiding>
        <Spacers.Base />

        <Headers.Back
          onBackPress={() => navigation.replace(routes.signIn)}
        />
        <Spacers.Base />

        <Wrappers.Component>
          <Texts.SmallTitle style={styles.title}>
            {Translate('SignUpScreen.Title')}
          </Texts.SmallTitle>

          <Spacers.Base />
          <Wrappers.RowBasic>
            <TextInputs.TextInputLowerBorder
              title={Translate('SignUpScreen.firstName')}
              placeholder={Translate('SignUpScreen.firstName')}
              value={firstName}
              onChangeText={fn => setFirstName(fn)}
              inputContainerStyle={styles.username}
              widthError={styles.rowInput}
            />

            <TextInputs.TextInputLowerBorder
              title={Translate('SignUpScreen.lastName')}
              placeholder={Translate('SignUpScreen.lastName')}
              value={lastName}
              onChangeText={ln => setLastName(ln)}
              inputContainerStyle={styles.username}
              widthError={styles.rowInput}
            />
          </Wrappers.RowBasic>

          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={Translate('Email')}
            placeholder={Translate('emailPlaceholder')}
            value={email}
            onChangeText={e => setEmail(e)}
          />

          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={Translate('Password')}
            placeholder={Translate('Password')}
            secureTextEntry={showPassword ? false : true}
            value={password}
            onChangeText={userpas => {
              setPassword(userpas)
              setPasswordError('')
            }}
            error={passwordError}
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
            title={Translate('SignUpScreen.confirmPassword')}
            placeholder={Translate('SignUpScreen.confirmPassword')}
            secureTextEntry={showConfirmPassword ? false : true}
            value={confirmPassword}
            onChangeText={userpas => {
              setConfirmPassword(userpas)
              setConfirmPasswordError('')
            }}
            error={confirmPasswordError}
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
          <Wrappers.RowWrapperBasic>
            <RoundCheckbox
              size={totalSize(1.5)}
              checked={acceptPolicy}
              onValueChange={() => setAccepyPolicy(!acceptPolicy)}
              borderColor={colors.textColor}
              backgroundColor={colors.textColor}
              styles={{ justifyContent: 'center', alignItems: 'center' }}
            />

            <Texts.SmallText style={styles.acceptPolicy}>
              {'   '}{Translate('SignUpScreen.Agreement')}{' '}
              <Texts.SmallText style={styles.acceptPolicy1}>
                {Translate('SignUpScreen.Agreement1')}
                <Texts.SmallText style={styles.acceptPolicy}> {Translate('SignUpScreen.Agreement2')} <Texts.SmallText style={styles.acceptPolicy1}>
                  {Translate('SignUpScreen.Agreement3')}
                </Texts.SmallText>
                </Texts.SmallText>
              </Texts.SmallText>
            </Texts.SmallText>

          </Wrappers.RowWrapperBasic>

          <Spacers.Base />
          <Spacers.Base />

          <Buttons.ButtonColored
            text={Translate('signUp')}
            buttonColor={firstName && lastName && email && password.length >= 6 && confirmPassword.length >= 8 &&
              Validations.validateEmail(email) && acceptPolicy ?
              colors.textColor : colors.disableText}
            disabled={firstName && lastName && email && password.length >= 6 && confirmPassword.length >= 8 &&
              Validations.validateEmail(email) && acceptPolicy ? false : true}
            tintColor={colors.white}
            onPress={() => { HandleSignUp() }}
            isLoading={loading}
          />

          <Spacers.Small />
          <Buttons.Colored
            text={Translate('googleButtonText')}
            buttonColor={colors.white}
            tintColor={colors.placeholderColor}
            onPress={() => {
              // navigation.navigate(routes.app);
            }}
            right={
              <Image
                source={appIcons.google}
                resizeMode="contain"
                style={styles.btnIcon}
              />
            }
          />
        </Wrappers.Component>

        <Spacers.DoubleBase />
        <Spacers.Base />

        <Wrappers.RowWrapperCenter>
          <Texts.SmallText style={styles.subTitle}>
            {Translate('SignUpScreen.logInText')}{' '}
          </Texts.SmallText>

          <TouchableOpacity
            onPress={() => navigation.navigate(routes.signIn)}>
            <Texts.SmallText style={styles.signupText}>{Translate('logIn')}</Texts.SmallText>
          </TouchableOpacity>
        </Wrappers.RowWrapperCenter>

        <Spacers.Base />
      </ScrollViews.KeyboardAvoiding>
    </Wrappers.Wrapper>
  );
};

export default SignUp;
