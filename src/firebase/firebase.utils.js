import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA0CGxASlJ2b3WI5Jl68TUC5T69BcQ2SkQ",
    authDomain: "auto-bids.firebaseapp.com",
    databaseURL: "https://auto-bids-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "auto-bids",
    storageBucket: "auto-bids.appspot.com",
    messagingSenderId: "801374156114",
    appId: "1:801374156114:web:c3ae116c47ef8bb62e768b"
};

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = await firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user: ', error.message);
        }
    }

    return userRef;
};