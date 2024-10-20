/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { appImages, colors, routes } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';
import Lottie from 'lottie-react-native';
import { Wrappers } from '../../../components';
import { getCurrentUserId } from '../../../services/utils/auth';
import { getAllOfCollection, getData, getDocByKeyValue } from '../../../services/utils/utility';
import { CommonActions } from '@react-navigation/native';
import { Users } from '../../../Redux/actions/Auth';
import { AllBudget, Budget } from '../../../Redux/actions/App';

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();

  // useStates
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  // useEffects
  useEffect(() => {
    // setTimeout(() => {
    //   setLoadingAnimation(true);
    //   getInitialData();
    // }, 2500);
    getInitialData();

  }, []);

  const getInitialData = async () => {
    const token = await getCurrentUserId();
    if (token) {
      getData('Users', token).then(user => {
        dispatch(Users(user));
        getAllOfCollection('Budgets').then(res => {
          dispatch(Budget(res[0]))
          dispatch(AllBudget(res))
        })
        if (user?.firstTimeLogin == false) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: routes.app }],
            }),
          );
        } else {
          navigation.replace(routes.onBoarding)
        }
      });
    } else {
      navigation.replace(routes.signIn)
    }
  };

  return (
    <Wrappers.Wrapper style={styles.main} animation={'zoomIn'}>
      <Image source={appImages.logo} resizeMode="contain" style={styles.img} />

      {/* {loadingAnimation &&
        <Wrappers.Wrapper style={styles.animationView}>
          <Lottie
            // style={styles.animationView}
            source={appImages.loading}
            autoPlay
          />
        </Wrappers.Wrapper>
      } */}
    </Wrappers.Wrapper>
  );
};

export default Splash;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: totalSize(35),
    height: totalSize(35),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  animationView: {
    width: totalSize(20),
    height: totalSize(20),
    marginTop: height(20)
  }
});
