import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ecommerce-3dea1.firebaseapp.com",
  projectId: "ecommerce-3dea1",
  storageBucket: "ecommerce-3dea1.appspot.com",
  messagingSenderId: "53624128889",
  appId: "1:53624128889:web:4494f01cea203b691d9ba8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();