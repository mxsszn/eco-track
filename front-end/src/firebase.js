import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";          

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfMs_gA3pVwuW0MsrBD9z2invw6nLA8rQ",
  authDomain: "startup2-8022c.firebaseapp.com",
  projectId: "startup2-8022c",
  storageBucket: "startup2-8022c.firebasestorage.app",
  messagingSenderId: "109739192074",
  appId: "1:109739192074:web:fb83bd9ada57c8947cd4f3"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // Connect to Firestore Database
const auth = getAuth(app);    // Connect to Authentication

export { db, auth };