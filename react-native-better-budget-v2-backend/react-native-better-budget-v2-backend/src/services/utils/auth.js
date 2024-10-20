import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { getData, saveData } from './utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

export async function signUp(USER) {
  let success = true;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(USER?.email?.trim(), USER?.password)
    .then(async user => {
      user.user.sendEmailVerification();
      delete USER.password;
      USER.userId = user.user.uid;
      await saveData('Users', user.user.uid, USER);
      Alert.alert('Account created',`A verification link has been sent to your email ${USER?.email?.trim()}.\nPlease check your email and click on the link to verify and complete the registration`)
    })
    .catch(function (error) {
      Toast.show(error.message);
      success = false;
      console.log('error', error.message);
    });
  return { success: success, user: USER };
}

export async function signIn(email, password, rememberme) {
  let success = false;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      console.log('user', user?.user?.emailVerified)
      if(user?.user?.emailVerified){
        if (rememberme) {
          AsyncStorage.setItem('Token', user.user.uid);
        }
        success = user.user.uid;
      }
      else{
        logOut()
        Toast.show('Your email has not been verified yet, please verify from a link on your email and sign in again')
        success = false
      }
      
    })
    .catch(function (error) {
      console.log(error);
      success = false;
      Toast.show(error.message);
    });
  return success;
}

export async function connectAccount(email, password, callback) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (user.user.emailVerified) {
        callback({ ...user, success: true });
      } else {
        success = false;
        await user.user.sendEmailVerification();
        // alert(`A verification link has been sent to ${email.trim()}, please verify and try connecting again`)
        alert(
          `A verification link has been sent to ${email.trim()}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into Click and go again.`,
        );
      }
    })
    .catch(function (error) {
      alert(error.code + ': ' + error.message);
      callback({ ...error, success: false });
    });
}

export async function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  }
}
export async function logOut() {
  let success = false;
  await firebase
    .auth()
    .signOut((success = true))
    .catch(error => console.log(error.code, ' ', error.message));
  return success;
}

export async function ResetPassword(email) {
  let success = true;
  // console.log('Please check your email...please', email)
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function (user) {
      success = true;
      console.log('Please check your email...', user);
    })
    .catch(function (e) {
      console.log(e);
      success = 'The email address entered is not recognized, please check and try again';
    });
  return success;
}

export async function sendEmail(email) {
  let success = true;
  console.log('Please check your email...please', email);
  await firebase
    .auth()
    .sendSignInLinkToEmail(email, {
      url: 'https://google.com',
      handleCodeInApp: true,
    })
    .then(function (user) {
      success = true;
      console.log('Please check your email...', user);
    })
    .catch(function (e) {
      console.log('error is here', e);
      success = e.message;
    });
  return success;
}

export async function googleAuthentication(setLoading) {
  setLoading(true);
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();
    console.log('User Info --> ', userInfo);
    const credential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken,
    );

    const user = await auth().signInWithCredential(credential);
    return user;
  } catch (error) {
    setLoading(false);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Toast.Error('Google authentication is in progress already');
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Toast.Error('Play services not available or outdated');
      // play services not available or outdated
    } else {
      Toast.Error(error.message);
      console.log(error);
      // some other error happened
    }
    //
  }
}
