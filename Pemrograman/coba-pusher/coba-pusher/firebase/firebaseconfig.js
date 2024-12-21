// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAVqM1bdYncmFfM-h7iVaXSKZa4GdIouw",
  authDomain: "coba-pusher.firebaseapp.com",
  projectId: "coba-pusher",
  storageBucket: "coba-pusher.firebasestorage.app",
  messagingSenderId: "960956046138",
  appId: "1:960956046138:web:958ef3d91521506eb98e03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);