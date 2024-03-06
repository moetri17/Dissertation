import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4gLBEnICDbYHRk9PWrcOM5vLDCgH5kyU",
  authDomain: "northumbria-isoc.firebaseapp.com",
  projectId: "northumbria-isoc",
  storageBucket: "northumbria-isoc.appspot.com",
  messagingSenderId: "997892582501",
  appId: "1:997892582501:web:c322502f7d446efd88aa8c",
  measurementId: "G-Q9DLVH1GZB"
};

// Initialize Firebase App
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
