// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-marketplace-26433.firebaseapp.com",
  projectId: "estate-marketplace-26433",
  storageBucket: "estate-marketplace-26433.appspot.com",
  messagingSenderId: "124144468842",
  appId: "1:124144468842:web:d9dd5ec420ce66440e9b13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);