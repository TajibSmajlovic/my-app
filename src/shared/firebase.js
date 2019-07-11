import firebase from "firebase/app";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyC-oAGkXUYnEf4BHLQjejsJm1pvy66yebk",
  authDomain: "myapp-543f6.firebaseapp.com",
  databaseURL: "https://myapp-543f6.firebaseio.com",
  projectId: "myapp-543f6",
  storageBucket: "myapp-543f6.appspot.com",
  messagingSenderId: "623056911856",
  appId: "1:623056911856:web:8ed0cbd902d57310"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
