// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { data } from "autoprefixer";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPeEF-gljr55DSAfeQs3RqBF60kjjO-jY",
  authDomain: "incident-report3421.firebaseapp.com",
  projectId: "incident-report3421",
  storageBucket: "incident-report3421.appspot.com",
  messagingSenderId: "163782257873",
  appId: "1:163782257873:web:4ddc4573d1f245022ea9f0",
  measurementId: "G-GR10NSH7QL",
  databaseURL: "https://incident-report3421-default-rtdb.asia-southeast1.firebasedatabase.app/" // Add this line
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { app, database }; // Export app and database for use in other modules
