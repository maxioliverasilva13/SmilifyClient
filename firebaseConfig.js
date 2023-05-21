// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeG2oEughmi1q0bhekftZMFj6fW4Dz2JU",
  authDomain: "learndo-39568.firebaseapp.com",
  projectId: "learndo-39568",
  storageBucket: "learndo-39568.appspot.com",
  messagingSenderId: "1091951711383",
  appId: "1:1091951711383:web:e1565e038fc9ce4d3845d2",
  measurementId: "G-9DRGBMK182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;