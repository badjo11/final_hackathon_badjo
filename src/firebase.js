// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABX3g2cHqCUNe4jKgLY89QlXmPDtKr1j8",
  authDomain: "badjo-solo.firebaseapp.com",
  projectId: "badjo-solo",
  storageBucket: "badjo-solo.appspot.com",
  messagingSenderId: "1010211076385",
  appId: "1:1010211076385:web:9cda1924f88970499e6660",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
