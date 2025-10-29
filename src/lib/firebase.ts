import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Sostituisci con le tue credenziali Firebase dalla console
// https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza servizi
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
