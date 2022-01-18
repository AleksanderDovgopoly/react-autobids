import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

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
                rep_score: 0,
                avatar: '',
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user: ', error.message);
        }
    }

    return userRef;
};

export const createNewAuctionDocument = async (auctionData) => {
    if (!auctionData) return;

    const {
        id,
        title,
        short_description,
        start_price,
        bids_step,
        start_date,
        end_date,
        geo,
        photos,
        seller,
        views,
        status
    } = auctionData;

    const auctionRef = await firestore.doc(`auctions/${auctionData.id}`);

    try {
        await auctionRef.set({
            id,
            title,
            short_description,
            start_price: Number(start_price),
            current_price: Number(start_price),
            geo,
            photos,
            bids_history: [],
            start_date,
            end_date,
            bids_step: Number(bids_step),
            comments: [],
            seller,
            views,
            status
        })
    } catch (error) {
        console.log('Error creating Auction Document!')
    }

    return auctionRef;
}

export const fetchAuctions = async () => {
    const auctionsRef = await firestore.collection('auctions');
    const auctionsMap = await auctionsRef
        .get()
        .then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            return collectionsMap;
        })
        .catch(error => {
            console.log('Some error with fetching!', error)
        })
    return auctionsMap;
};

export const fetchAuctionById = async (auctionId) => {
    const auctionRef = await firestore.doc(`auctions/${auctionId}`);
    const documentSnapshot = await auctionRef
        .get()
        .then(snapshot => {
            return snapshot.data();
        })
        .catch(error => {
            console.log('Some error with fetching!', error)
        })
    return documentSnapshot;
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, short_description, current_price, start_price, start_date, geo, photos, seller, bids_history, status, end_date} = doc.data();

        return {
            id: doc.id,
            title,
            short_description,
            current_price,
            start_price,
            geo,
            photos,
            start_date,
            end_date,
            seller,
            bids_history,
            status
        }

    });

    return transformedCollection.reduce((accumulator, collection, index) => {
        accumulator[index] = collection;
        return accumulator;
    }, {});
}

export const setNewBidByAuctionId = async (auctionId, bidData) => {
    if (!bidData || !auctionId) return;

    const auctionRef = await firestore.doc(`auctions/${auctionId}`);

    const snapShot = (await auctionRef.get()).data();

    try {
        await auctionRef.update({
            current_price: bidData.bid_price,
            bids_history: [...snapShot.bids_history, bidData]
        })
    } catch (error) {
        console.log('Error update auction bids!')
    }

    return auctionRef;
}

export const setNewAuctionComment = async (auctionId, commentData) => {
    if (!auctionId || !commentData) return;

    const auctionRef = await firestore.doc(`auctions/${auctionId}`);
    const snapShot = (await auctionRef.get()).data();

    try {
        await auctionRef.update({
            comments: [...snapShot.comments, commentData]
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    return auctionRef;
}

export const updateAuctionViewsById = async (auctionId) => {
    if (!auctionId) return;

    const auctionRef = await firestore.doc(`auctions/${auctionId}`);
    const snapShot = (await auctionRef.get()).data();

    try {
        await auctionRef.update({
            views: snapShot.views + 1
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    return auctionRef;
}

export const getUserDataById = async (userId) => {
    if (!userId) return;

    const userRef = await firestore.doc(`users/${userId}`);
    const documentSnapshot = await userRef
        .get()
        .then(snapshot => {
            return snapshot.data();
        })
        .catch(error => {
            console.log('Some error with fetching!', error)
        })
    return documentSnapshot;
}


export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export default firebase;