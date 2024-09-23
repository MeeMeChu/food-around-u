// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoA2KGpfunxwhaUDSwDgqfEDfRNs7XZp0",
    authDomain: "food-around-u-3e457.firebaseapp.com",
    projectId: "food-around-u-3e457",
    storageBucket: "food-around-u-3e457.appspot.com",
    messagingSenderId: "573268023285",
    appId: "1:573268023285:web:b0c021da945e91855bf2bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db , auth };