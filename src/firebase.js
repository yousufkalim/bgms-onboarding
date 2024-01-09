// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS2tJ9SUT2SX1j63EcC-NU-UWWLdScX7k",
  authDomain: "bgms-xgrid.firebaseapp.com",
  projectId: "bgms-xgrid",
  storageBucket: "bgms-xgrid.appspot.com",
  messagingSenderId: "1065614741151",
  appId: "1:1065614741151:web:41874e735c621ddc321caa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
