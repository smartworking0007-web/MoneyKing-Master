import { initializeApp } from "firebase/app";
import { initializeAuth, getintlPolyfills, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';

const firebaseConfig = {
  apiKey: "AIzaSyCGzzvbsKotX2p9A9dPDQi31fVrsMNnaRw",
  authDomain: "my-money-11fcd.firebaseapp.com",
  projectId: "my-money-11fcd",
  storageBucket: "my-money-11fcd.firebasestorage.app",
  messagingSenderId: "1090651938408",
  appId: "1:1090651938408:web:fb854f1af6e9b16e79a5dd"
};

const app = initializeApp(firebaseConfig);

// Persistence setup taaki user login rahe
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };