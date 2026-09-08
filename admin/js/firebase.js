```javascript
// =====================================================
// ZUZOO FIREBASE CONFIGURATION
// =====================================================

// Firebase App
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


// Firebase Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


// Firebase Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// Firebase Storage
import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";



// =====================================================
// FIREBASE PROJECT CONFIG
// =====================================================

const firebaseConfig = {

  apiKey:
    "AIzaSyBVMATK68o-lLNI2ESxY2FTvrtwiPBeTRY",

  authDomain:
    "zuzoo-6afa5.firebaseapp.com",

  projectId:
    "zuzoo-6afa5",

  storageBucket:
    "zuzoo-6afa5.firebasestorage.app",

  messagingSenderId:
    "560745524336",

  appId:
    "1:560745524336:web:3db8ae577ccb65456598b5",

  measurementId:
    "G-RR5MN45J4S"

};



// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app =
  initializeApp(firebaseConfig);



// =====================================================
// INITIALIZE AUTHENTICATION
// =====================================================

const auth =
  getAuth(app);



// =====================================================
// INITIALIZE FIRESTORE DATABASE
// =====================================================

const db =
  getFirestore(app);



// =====================================================
// INITIALIZE FIREBASE STORAGE
// =====================================================

const storage =
  getStorage(app);



// =====================================================
// EXPORT
// =====================================================

export {
  app,
  auth,
  db,
  storage
};
```
