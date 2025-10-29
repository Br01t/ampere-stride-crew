import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR65OSkg3GTpHfaxc5bkS7y38Hvf2G8m8",
  authDomain: "ampere-running-club.firebaseapp.com",
  projectId: "ampere-running-club",
  storageBucket: "ampere-running-club.firebasestorage.app",
  messagingSenderId: "805049018573",
  appId: "1:805049018573:web:a535b20ba123fa35446184",
  measurementId: "G-R62T4VZPNS"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza servizi
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
