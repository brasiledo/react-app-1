/** @format */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { appImages, colors, routes } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';
import Lottie from 'lottie-react-native';
import { Wrappers } from '../../../components';
import { getCurrentUserId } from '../../../services/utils/auth';
import { getAllOfCollection, getData, getDocByKeyValue, saveData } from '../../../services/utils/utility';
import { CommonActions } from '@react-navigation/native';
import { Users } from '../../../Redux/actions/Auth';
import { AllBudget, Budget } from '../../../Redux/actions/App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Purchases from 'react-native-purchases';

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

    // if (Platform.OS === 'ios') {
    //   Purchases.configure({ apiKey: "appl_HBwKurwUEVIEtRglqhqCyBvahQP" });
    // } else if (Platform.OS === 'android') {
    //   Purchases.configure({ apiKey: "appl_HBwKurwUEVIEtRglqhqCyBvahQP" });
    // }

  }, []);

  const getInitialData = async () => {
    const token = await getCurrentUserId();
    if (token) {
      getData('Users', token).then(user => {
        if (user?.firstTimeLogin == true) {
          user.firstTimeLogin = false
          dispatch(Users(user))
          saveData('Users', user?.userId, { firstTimeLogin: false })
        }
        else {
          dispatch(Users(user));
        }

        getDocByKeyValue('Budgets', 'userId', token).then(res => {
          res = res.sort((a, b) => a.createdAt - b.createdAt)
          dispatch(AllBudget(res))
          if (res.length > 0) {
            AsyncStorage.getItem('activeBudget').then((id) => {
              if (id) {
                // id = JSON.parse(id)
                // let index = res.findIndex((result) => result._id == id)
                // if (index >= 0) {
                //   index = JSON.parse(index)
                //   dispatch(Budget(res[index]))
                // }
                // else {
                //   dispatch(Budget(res[0]))
                // }
              }
              else {
                dispatch(Budget(res[0]))
              }


            })

            dispatch(Budget(res[0]))
            dispatch(AllBudget(res))
          }
          else {
            dispatch(Budget({ Income: [], budgetDates: [] }))
            dispatch(AllBudget(res))
          }

          navigation.replace(routes.app)
        })

      });
    } else {
      navigation.replace(routes.signIn)
    }
  };


  //GET FCM TOKEN AND PERMISSION

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      const token = await getCurrentUserId();
      if (token) {
        saveData('Users', token, { fcm_token: fcmToken });
      }
    } else {
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

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
