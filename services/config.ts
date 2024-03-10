import * as firebase from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// App's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "random-journal-429c5.firebaseapp.com",
    projectId: "random-journal-429c5",
    storageBucket: "random-journal-429c5.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

  // Initialize Firebase
let app;
if (firebase.getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

// const auth = getAuth(app)

export { app, auth, getAuth }
