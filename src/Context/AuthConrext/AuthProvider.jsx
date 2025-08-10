import React, {  useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AuthContext } from './AuthCotext';
import { auth } from './../../Firebase/Firebase.init';
import { GoogleAuthProvider } from "firebase/auth";


const AuthProvider = ({children}) => {
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);

      const AuthProvider = new GoogleAuthProvider();

       const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, AuthProvider);
      }

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

   const loginUsers = (email, password) => {
      setLoading(true);
       return  signInWithEmailAndPassword(auth, email,password)
     }

      const SigninOut = () => {
        setLoading(true);
        return auth.signOut();
      }

     useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('Current User:', currentUser);
        })
        return () => {
           unSubcribe();
        }
     },[])
       
      

    const authInfo = {
      loading,
      user,
      createUser,
      loginUsers,
      signInWithGoogle,
      SigninOut,
      
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;