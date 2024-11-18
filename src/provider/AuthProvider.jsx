import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    /* *** Register User with Phone Number ****/
    const createUserWithNumber = (phoneNumber, password) => {
        const formattedPhone = `${phoneNumber}@example.com`;
        setLoader(true);
        return createUserWithEmailAndPassword(auth, formattedPhone , password)
    }

    /* *** User Login with phone number *****/
    const signInWithNumber = (phoneNumber, password) => {
        const formattedPhone = `${phoneNumber}@example.com`;
        setLoader(true);
        return signInWithEmailAndPassword(auth, formattedPhone , password);
    }

    /* *** Register User ****/
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    /* *** User Login *****/
    const signIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    /* *******  Google Sign In ********  */
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider)
    }


    /* *** User Profile Update **** */

    const updateUser = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        })
    }

    /* **** User Sign Out **** */
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }


    /* *** Observing the user **** */

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser)
                setLoader(false);
        })

        return () => {
            unSubscribe()
        }

    }, [])


    const authInfo = {
        user,
        loader,
        createUser,
        signIn,
        createUserWithNumber,
        signInWithNumber,
        googleSignIn,
        updateUser,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,

}

export default AuthProvider;