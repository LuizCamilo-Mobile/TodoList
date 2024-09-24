import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDmBKA1u1LqY1_G1AUBzUJZcPRJ2o0TWc8",
  authDomain: "todolist-d16e7.firebaseapp.com",
  databaseURL: "https://todolist-d16e7-default-rtdb.firebaseio.com",
  projectId: "todolist-d16e7",
  storageBucket: "todolist-d16e7.appspot.com",
  messagingSenderId: "744382777933",
  appId: "1:744382777933:web:5528ad180424f1d4e5ea04"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };