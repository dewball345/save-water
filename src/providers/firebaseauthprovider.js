import {auth} from './firebase.js';
import {useState, useEffect, createContext} from 'react';


export const FBAuthContext = createContext();

//UNDOUNDO
export default function FirebaseAuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    const [isloading, setLoading] = useState(true);

    async function login(email, password){
        let res = await auth.signInWithEmailAndPassword(email, password);
        return res;
    }

    async function logout(){
        let res = await auth.signOut()
        return res;
    }

    async function register(email, password){
        let res = await auth.createUserWithEmailAndPassword(email, password)
        
        return res;
    }

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log("executed here")
            // console.log("CURRENT USER IN AUTH")
            // console.log(user)
            setCurrentUser(user);
            setLoading(false)
        })
        return () => {
            setCurrentUser({});
            setLoading({})
        };
    }, []);

    const value = {
        currentUser,
        isloading,
        login,
        logout,
        register
    }

    return (
        <FBAuthContext.Provider value={value}>
            {children}
        </FBAuthContext.Provider>
    )
}