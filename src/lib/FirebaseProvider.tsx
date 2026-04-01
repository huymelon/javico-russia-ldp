import * as React from 'react';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface FirebaseContextType {
  user: FirebaseUser | null;
  userProfile: any | null;
  loading: boolean;
  isAuthReady: boolean;
}

export const FirebaseContext = React.createContext<FirebaseContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAuthReady: false,
});

export const useFirebase = () => React.useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // Create user profile if it doesn't exist
            const newProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: 'user',
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, userProfile, loading, isAuthReady }}>
      {children}
    </FirebaseContext.Provider>
  );
};
