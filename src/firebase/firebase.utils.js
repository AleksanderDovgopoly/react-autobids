import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import {child, get, getDatabase, ref} from "firebase/database";

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
                rep_score: [],
                avatar: '',
                watch_list: {
                    auctions: [],
                    searches: []
                },
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
        .orderBy('createAt', 'asc')
        .where('auction_id', '==', auctionId)
        .get()
        .then(snapshot => {
            const commentsMap = convertCommentsSnapshotToMap(snapshot);
            return Object.values(commentsMap);
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

export const fetchAllCategoriesList = async () => {
    const categoriesRef = await firestore.collection('categories');
    const categoriesSnapshot = await categoriesRef
        .get()
        .then(snapshot => {
            const commentsMap = convertCategoriesSnapshotToMap(snapshot);
            return commentsMap;
        })
        .catch(error => {
            console.log('Some error with fetching categories!', error)
        })
    return categoriesSnapshot;
}

export const fetchBrandsAndModels = async () => {
    const brandsRef = await firestore.collection('brand_models');
    const brandsSnapshot = await brandsRef
        .get()
        .then(snapshot => {
            const brandsMap = convertBrandsSnapshotToMap(snapshot);
            return brandsMap;
        })
        .catch(error => {
            console.log('Some error with fetching brands!', error)
        })
    return brandsSnapshot;
}

export const fetchUserNotifications = async (userId) => {
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `/notifications/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
    }).catch((error) => {
        console.error(error);
    });

    return data;
}

export const convertCategoriesSnapshotToMap = (collection) => {
    const transformedCollection = collection.docs.map(doc => {
        const categoriesList = doc.data();

        return {
            id: doc.id,
            list: categoriesList
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection.list;
        return accumulator;
    }, {});
}

export const convertBrandsSnapshotToMap = (collection) => {
    const transformedCollection = collection.docs.map(doc => {
        const brandData = doc.data();
        return {
            id: doc.id,
            name: brandData.name,
            models: brandData.models
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = {
            title: collection.name,
            models: collection.models
        };
        return accumulator;
    }, {});
}

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
        const {auction_id, author_id, createAt, message, rep, type, bid_price, replyTo} = doc.data();

        return {
            id: doc.id,
            auction_id,
            author_id,
            createAt,
            message,
            rep,
            type,
            bid_price,
            replyTo
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

export const setNewAuctionBidOrComment = async (bidData) => {
    if (!bidData) return;

    try {
        await firestore.collection("comments_bids").add(bidData);

        return 'success';
    } catch (error) {
        throw error;
    }
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

export const setNewWatchedSearch = async (userId, searchParams) => {
    if (!searchParams || !userId) return;

    const userRef = await firestore.doc(`users/${userId}`);
    const snapShot = (await userRef.get()).data();

    try {
        let updated_watch_list = snapShot.watch_list;
        updated_watch_list.searches = [...updated_watch_list.searches, searchParams]

        await userRef.update({
            watch_list: updated_watch_list
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    return userRef;
}

export const removeWatchedSearch = async (userId, searchParams) => {
    if (!searchParams || !userId) return;

    const userRef = await firestore.doc(`users/${userId}`);
    const snapShot = (await userRef.get()).data();

    try {
        let updated_watch_list = snapShot.watch_list;
        updated_watch_list.searches = updated_watch_list.searches.filter(function (item) {
            return (item.brand !== searchParams.brand) || (item.model !== searchParams.model)
        })

        await userRef.update({
            watch_list: updated_watch_list
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    return userRef;
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

export const updateCommentVotesById = async (commentId, userId) => {
    if (!commentId || !userId) return;

    const commentRef = await firestore.doc(`comments_bids/${commentId}`);
    const snapShot = (await commentRef.get()).data();

    try {
        await commentRef.update({
            rep: [...snapShot.rep, userId]
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    // ToDo: set vote for user

    return commentRef;
}

export const updateUserVotesById = async (authorId, userId) => {
    if (!authorId || !userId) return;

    const userRef = await firestore.doc(`users/${authorId}`);
    const snapShot = (await userRef.get()).data();

    try {
        await userRef.update({
            rep_score: [...snapShot.rep_score, userId]
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    // ToDo: set vote for user

    return userRef;
}

export const updateUserEditorData = async (userId, newData) => {
    if (!userId || !newData) return;

    const {avatar, bio} = newData;
    const userRef = await firestore.doc(`users/${userId}`);

    try {
        await userRef.update({
            bio: bio,
            avatar: avatar
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    const snapShotNewData = (await userRef.get()).data();

    return snapShotNewData;

}

export const updateUserWatchedAuctions = async (userId, auctionId) => {
    if (!auctionId || !userId) return;

    const userRef = await firestore.doc(`users/${userId}`);
    const snapShot = (await userRef.get()).data();
    const isAuctionWatched = snapShot.watch_list.auctions.includes(auctionId);

    try {
        let updated_watch_list = snapShot.watch_list;
        isAuctionWatched
            ? updated_watch_list.auctions = updated_watch_list.auctions.filter(id => id !== auctionId)
            : updated_watch_list.auctions = [...updated_watch_list.auctions, auctionId]

        await userRef.update({
            watch_list: updated_watch_list
        })
    } catch (error) {
        console.log('Error update auction comments!')
    }

    return userRef;
}

export const getUserDataById = async (userId) => {
    if (!userId) return;

    const userRef = await firestore.doc(`users/${userId}`);
    const documentSnapshot = await userRef
        .get()
        .then(snapshot => {
            let userData = snapshot.data();
            userData.uid = userId;
            return userData;
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

export const getCommentsAndBidsByUserId = async (userId) => {
    if (!userId) return;

    const commentsRef = await firestore.collection('comments_bids');
    const commentsByUser = await commentsRef.where('author_id', '==', userId).get();
    return convertCommentsSnapshotToMap(commentsByUser);
}

export const getBidsByAuctionId = async (auctionId) => {
    if (!auctionId) return;

    const commentsRef = await firestore.collection('comments_bids');
    const bidsByAuction = await commentsRef
        .where('type', '==', 'bid')
        .where('auction_id', '==', auctionId)
        .orderBy('createAt', 'desc')
        .get();
    return convertCommentsSnapshotToMap(bidsByAuction);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;