import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../configs/firebase-config";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    console.log("Login แล้วหรือยัง : ", userLoggedIn);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);

            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUpWithEmail = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // const user = result.user;

            // const userData = {
            //     uid: user.uid,
            //     displayName: displayName,
            //     email: user.email,
            // }

            // await setDoc(doc(db, 'users', user.uid), userData);

        } catch (error) {
            console.error("Error during email registration:", error);
        }
    }

    const signInWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during email sign-in:", error);
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        signInWithEmail,
        signUpWithEmail,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
