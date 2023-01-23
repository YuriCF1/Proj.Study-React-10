// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC00HXkiNxhKaVRFS9C6cYRAVKSgxnYe0k",
  authDomain: "miniblog-35fd4.firebaseapp.com",
  projectId: "miniblog-35fd4",
  storageBucket: "miniblog-35fd4.appspot.com",
  messagingSenderId: "368398093975",
  appId: "1:368398093975:web:20014d4d7d49104c15a3d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBank = getFirestore(app);

export { dataBank };
