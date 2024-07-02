// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0qemwrqajR7xKCSleHKY1IiwS7FflrBY",
  authDomain: "lookingfor-6b26d.firebaseapp.com",
  projectId: "lookingfor-6b26d",
  storageBucket: "lookingfor-6b26d.appspot.com",
  messagingSenderId: "585759455116",
  appId: "1:585759455116:web:179d941ae8cc587282c8a9",
  measurementId: "G-G8VSM2EQXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
