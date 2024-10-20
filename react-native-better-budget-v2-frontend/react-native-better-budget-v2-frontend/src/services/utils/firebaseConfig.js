// import firebase from "firebase";

import firebase from '@react-native-firebase/app';
import Rnauth from '@react-native-firebase/auth';
import Rnfirestore from '@react-native-firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBzicsq9WhBLSqFh49Xz-SKAU3H4e9hF1g",
//   authDomain: "gastrouser-9380f.firebaseapp.com",
//   databaseURL: "https://gastrouser-9380f.firebaseio.com",
//   projectId: "gastrouser-9380f",
//   storageBucket: "gastrouser-9380f.appspot.com",
//   messagingSenderId: "213351920814",
//   appId: "1:213351920814:web:735abd9500369836f3a93f",
//   measurementId: "G-M30T3NKCGE",
//   timestampsInSnapshots: true
// };
// global.btoa = encode;
// global.atob = decode;
// global.crypto = {};

// global.crypto.getRandomValues = (byteArray) => {
//   for (let i = 0; i < byteArray.length; i += 1) {
//     byteArray[i] = Math.floor(256 * Math.random());
//   }
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.firestore().settings({ experimentalForceLongPolling: true });

// }
export const db = Rnfirestore();

export const auth = Rnauth();
