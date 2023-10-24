// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage,} from "firebase/storage";
import {getMessaging} from "firebase/messaging";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQq3qt3BpdZo_wwErdk0k2ogyRZDUBAIc",
  authDomain: "unt-canteen.firebaseapp.com",
  databaseURL: "https://unt-canteen-default-rtdb.firebaseio.com",
  projectId: "unt-canteen",
  storageBucket: "unt-canteen.appspot.com",
  messagingSenderId: "140302535825",
  appId: "1:140302535825:web:727dd419caa128d7218330"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(); 
export const messaging = getMessaging(app);
export const database = getDatabase(app);

// const adminApp = initializeApp(adminConfig);
// export const adminAuth = getAuth(adminApp);
// export const adminDB = getFirestore();


