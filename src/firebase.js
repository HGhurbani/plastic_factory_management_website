import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvhDNHFRn8hFl2xNihHS620j1deIrulNA",
  authDomain: "factory-system-914ef.firebaseapp.com",
  projectId: "factory-system-914ef",
  storageBucket: "factory-system-914ef.firebasestorage.app",
  messagingSenderId: "92456828886",
  appId: "1:92456828886:web:9176502f7d3a556ccfae77",
  measurementId: "G-ETQTWKB5KZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, analytics, googleProvider };