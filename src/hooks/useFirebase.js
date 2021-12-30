import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import initializeAuthentication from "../pages/Firebase/firebase.initialize"

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const reload = () => {
        window.location.reload();
    }
    // const url = `https://glacial-sands-61817.herokuapp.com/users/${user.email}`;

    // useEffect(() => {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data.admin))
    // }, [user.email])



    const saveUser = (email, displayName) => {
        const user = { email, displayName };
        fetch('https://glacial-sands-61817.herokuapp.com/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }


    const signInUsingGoogle = () => {

        return signInWithPopup(auth, googleProvider)

    }

    // observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    }




    return {
        user,
        admin,
        isLoading,
        error,
        saveUser,
        setUser,
        setError,
        signInUsingGoogle,
        setIsLoading,
        logOut,
    }
}

export default useFirebase;