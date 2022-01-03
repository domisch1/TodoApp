import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZEXvNfkAubgB6wrZh5iNbLliq6FBQINk",
  authDomain: "todoapp-9806d.firebaseapp.com",
  projectId: "todoapp-9806d",
  storageBucket: "todoapp-9806d.appspot.com",
  messagingSenderId: "757815254923",
  appId: "1:757815254923:web:60f69cc5332cc7e683598e",
  measurementId: "G-5723S24PKZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
