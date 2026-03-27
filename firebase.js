import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCBilrV_1v6TrJwtCqRrOEKLt3inxCLLA",
  authDomain: "test-9ff7a.firebaseapp.com",
  databaseURL: "https://test-9ff7a-default-rtdb.firebaseio.com",
  projectId: "test-9ff7a",
  storageBucket: "test-9ff7a.firebasestorage.app",
  messagingSenderId: "757686884213",
  appId: "1:757686884213:web:3e60f4c6ce00b603fde53c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);