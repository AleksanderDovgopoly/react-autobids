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
        descriptions,
        start_price,
        bids_step,
        start_date,
        end_date,
        geo,
        photos,
        seller,
        views,
        spec,
        year_release,
        status
    } = auctionData;

    const auctionRef = await firestore.doc(`auctions/${auctionData.id}`);

    try {
        await auctionRef.set({
            id,
            title,
            short_description,
            descriptions,
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
            spec,
            year_release,
            status
        })
    } catch (error) {
        console.log('Error creating Auction Document!', error)
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

export const fetchUsers = async () => {
    const usersRef = await firestore.collection('users');
    const usersMap = await usersRef
        .get()
        .then(snapshot => {
            const collectionsMap = convertUsersSnapshotToMap(snapshot);
            return collectionsMap;
        })
        .catch(error => {
            console.log('Some error with users fetching!', error)
        })
    return usersMap;
};

export const fetchCommentsByAuctionId = async (auctionId) => {
    const commentsRef = await firestore.collection('comments_bids');
    const commentsMap = await commentsRef
        .get()
        .then(snapshot => {
            const commentsMap = convertCommentsSnapshotToMap(snapshot);
            const filteredMap = Object.values(commentsMap).filter(item => item.auction_id === auctionId);

            return filteredMap;
        })
        .catch(error => {
            console.log('Some error with comments fetching!', error)
        })
    return commentsMap;
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
        const {
            title,
            short_description,
            current_price,
            start_price,
            start_date,
            geo,
            photos,
            seller,
            bids_history,
            status,
            end_date,
            year_release,
            spec
        } = doc.data();

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
            spec,
            year_release,
            status
        }

    });

    return transformedCollection.reduce((accumulator, collection, index) => {
        accumulator[index] = collection;
        return accumulator;
    }, {});
}

export const convertCommentsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {auction_id, author_id, createAt, message, rep, type, bid_price, reply_id} = doc.data();

        return {
            id: doc.id,
            auction_id,
            author_id,
            createAt,
            message,
            rep,
            type,
            bid_price,
            reply_id
        }

    });

    return transformedCollection.reduce((accumulator, collection, index) => {
        accumulator[index] = collection;
        return accumulator;
    }, {});
}

export const convertUsersSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {avatar, createdAt, displayName, email, rep_score} = doc.data();

        return {
            id: doc.id,
            avatar,
            createdAt,
            displayName,
            email,
            rep_score
        }

    });

    return transformedCollection.reduce((accumulator, collection, index) => {
        accumulator[index] = collection;
        return accumulator;
    }, {});
}

export const setNewAuctionBid = async (bidData) => {
    if (!bidData) return;

    firestore.collection("comments_bids").add(bidData)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        })
}

export const setNewAuctionPrice = async (auctionId, newPrice) => {
    if (!auctionId || !newPrice) return;

    const auctionRef = await firestore.doc(`auctions/${auctionId}`);

    try {
        await auctionRef.update({
            current_price: newPrice
        })
    } catch (error) {
        console.log('Error update auction comments!')
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

export const getCategoriesListBySlug = async (catSlug) => {
    if (!catSlug) return;

    const categoriesRef = await firestore.doc(`categories/${catSlug}`);
    const documentSnapshot = await categoriesRef
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