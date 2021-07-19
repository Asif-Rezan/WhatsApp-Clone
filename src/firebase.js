import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBa2_lUGshdR6czM9IFbwltVbuzj7btXdI",
  authDomain: "whatsapp-ac788.firebaseapp.com",
  projectId: "whatsapp-ac788",
  storageBucket: "whatsapp-ac788.appspot.com",
  messagingSenderId: "467788781998",
  appId: "1:467788781998:web:6c8e7480dabf8d5d0b503f",
  measurementId: "G-KW40VM2275"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;