import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBj0XNwaPZhT7-b3M1sgexQB5tmv_UXOmU",
  authDomain: "instagramclonecosmos.firebaseapp.com",
  databaseURL: "https://instagramclonecosmos.firebaseio.com",
  projectId: "instagramclonecosmos",
  storageBucket: "instagramclonecosmos.appspot.com",
  messagingSenderId: "27719337171",
  appId: "1:27719337171:web:22d22caec9665dbb8c0026"
};


const firebaseApp = firebase.initializeApp(firebaseConfig   );
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};