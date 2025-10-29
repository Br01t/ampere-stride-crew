// src/contexts/AuthContext.tsx
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';

import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import { 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';

// --------------------
// Tipi del contesto
// --------------------
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

// --------------------
// Creazione contesto
// --------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato dentro un AuthProvider');
  }
  return context;
};

// --------------------
// Provider
// --------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --------------------
  // Listener autenticazione
  // --------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      // Se l'utente è loggato, assicuriamoci che esista in Firestore
      if (user) {
        const userDoc = doc(db, 'user_roles', user.uid);
        const snapshot = await getDoc(userDoc);

        // Se non esiste, creiamo documento con ruolo "user"
        if (!snapshot.exists()) {
          await setDoc(userDoc, { role: 'user', email: user.email });
        }
      }
    });

    return unsubscribe;
  }, []);

  // --------------------
  // Registrazione via email/password
  // --------------------
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salviamo ruolo di default
    const userDoc = doc(db, 'user_roles', user.uid);
    await setDoc(userDoc, { role: 'user', email: user.email });
  };

  // --------------------
  // Login via email/password
  // --------------------
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // --------------------
  // Logout
  // --------------------
  const logout = async () => {
    await signOut(auth);
  };

  // --------------------
  // Login con Google
  // --------------------
  const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Controlla Firestore per il ruolo
    const userDoc = doc(db, 'user_roles', user.uid);
    const snapshot = await getDoc(userDoc);
    if (!snapshot.exists()) {
      await setDoc(userDoc, { role: 'user', email: user.email });
    }

    return user; // ritorna l’utente
  } catch (error: any) {
    console.error('Errore Google Sign-In:', error);
    throw new Error(error.message || 'Errore durante accesso Google');
  }
};


  // --------------------
  // Valore del contesto
  // --------------------
  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    googleSignIn,
  };

  // --------------------
  // Render
  // --------------------
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};