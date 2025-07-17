// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPIg8acYSfGAFobVHJxADVvXjhTGNSr_k",
  authDomain: "gymmanagement-dc932.firebaseapp.com",
  projectId: "gymmanagement-dc932",
  storageBucket: "gymmanagement-dc932.firebasestorage.app",
  messagingSenderId: "168825272021",
  appId: "1:168825272021:web:f5403433cc7325fc41145c",
  measurementId: "G-M2SSFV8LLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
