import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyBVMATK68o-lLNI2ESxY2FTvrtwiPBeTRY",
  authDomain: "zuzoo-6afa5.firebaseapp.com",
  projectId: "zuzoo-6afa5",
  storageBucket: "zuzoo-6afa5.firebasestorage.app",
  messagingSenderId: "560745524336",
  appId: "1:560745524336:web:3db8ae577ccb65456598b5",
  measurementId: "G-RR5MN45J4S"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
