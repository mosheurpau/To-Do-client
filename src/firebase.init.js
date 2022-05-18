// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwsEcMShPRsOJlsYBLCjPMpK00fDyptuk",
  authDomain: "mosheur-to-do.firebaseapp.com",
  projectId: "mosheur-to-do",
  storageBucket: "mosheur-to-do.appspot.com",
  messagingSenderId: "983584242659",
  appId: "1:983584242659:web:fdedc63019ccc3ec257ed6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
