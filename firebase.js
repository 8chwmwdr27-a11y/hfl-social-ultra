// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDCBilrV_1v6TrJwtCqRrOEKLt3inxCLLA",
  authDomain: "your-username.github.io", // <-- עדכן כאן את שם המשתמש שלך ב-GitHub
  databaseURL: "https://test-9ff7a-default-rtdb.firebaseio.com",
  projectId: "test-9ff7a",
  storageBucket: "test-9ff7a.firebasestorage.app",
  messagingSenderId: "757686884213",
  appId: "1:757686884213:web:3e60f4c6ce00b603fde53c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
