/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Buttons, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '../../../components';
import { appIcons, appImages, colors, routes, Validations } from '../../../services';
import { signIn } from '../../../services/utils/auth';
import { getData } from '../../../services/utils/utility';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';

const SignIn = props => {
  const dispatch = useDispatch()
  //useStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // All Functions
  // onPress signin
  const HandleSignIn = () => {
    setLoading(true);
    signIn(email, password)
      .then(res => {
        if (res != false) {
          getData('Users', res)
            .then(user => {
              AsyncStorage.setItem('Token', res);
              if (user?.firstTimeLogin == true) {
                props.navigation.replace(routes.onBoarding)
              } else {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: routes.app }],
                  }),
                );
              }
              setLoading(false);
            })
            .catch(err => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <ScrollViews.KeyboardAvoiding>

        
        <Wrappers.Component>
        <Image
          source={appImages.logoBg}
          resizeMode="stretch"
          style={styles.logoBg}
        />

        <Spacers.Base />
          <Texts.SmallTitle style={styles.title}>
            {Translate("SignInScreen.Title")}
          </Texts.SmallTitle>

          <Spacers.Base />

          <TextInputs.TextInputLowerBorder
            title={Translate("Email")}
            placeholder={Translate("emailPlaceholder")}
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <Spacers.Base />
          <TextInputs.TextInputLowerBorder
            title={Translate("Password")}
            placeholder={Translate("Password")}
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

          <Spacers.Tiny />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate(routes.forgotPassword)}>
            <Texts.Regular style={styles.forgotpas}>
              {Translate("SignInScreen.forgotPassword")}
            </Texts.Regular>
          </TouchableOpacity>
          <Spacers.DoubleBase />

          <Buttons.ButtonColored
            text={Translate("logIn")}
            buttonColor={email && password.length >= 8 && Validations.validateEmail(email) ?
              colors.textColor : colors.disableText}
            disabled={email && password.length >= 8 && Validations.validateEmail(email) ? false : true}
            tintColor={colors.white}
            onPress={() => { HandleSignIn() }}
            isLoading={loading}
          />

          <Spacers.Small />
          <Buttons.Colored
            text={Translate("SignInScreen.faceIdButtonText")}
            buttonColor={colors.white}
            tintColor={colors.placeholderColor}
            onPress={() => {
              // navigation.navigate(routes.app);
            }}
            right={
              <Image
                source={appIcons.faceId}
                resizeMode="contain"
                style={styles.btnIcon}
              />
            }
          />

          <Spacers.Small />
          <Buttons.Colored
            text={Translate("googleButtonText")}
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
            {Translate("SignInScreen.signUpText")}{' '}
          </Texts.SmallText>

          <TouchableOpacity
            onPress={() => props.navigation.navigate(routes.signUp)}>
            <Texts.SmallText style={styles.signupText}>{Translate("signUp")}</Texts.SmallText>
          </TouchableOpacity>
        </Wrappers.RowWrapperCenter>

        <Spacers.Base />

        <Wrappers.Wrapper style={styles.logoAbsolute1}>
        <Image
          source={appImages.logo}
          resizeMode="stretch"
          style={styles.logoAbsolute}
        />
      </Wrappers.Wrapper>
      </ScrollViews.KeyboardAvoiding>

      

    </Wrappers.Wrapper>
  );
};

export default SignIn;
