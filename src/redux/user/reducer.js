import {createReducer, current} from "@reduxjs/toolkit";
import {
    setCurrentUser,
    clearCurrentUser,
    actionUpdateUserWatchedSearch,
    actionUpdateUserWatchedAuctions,
    togglePopupAuth
} from './actions';

const INITIAL_STATE = {
    isLogin: false,
    showPopupAuth: false,
    currentUser: []
};

export default createReducer(INITIAL_STATE, {
    [setCurrentUser.type]: (userData, action) => {
        userData.currentUser = action.payload;
        userData.isLogin = true;
    },

    [clearCurrentUser.type]: (userData, action) => {
        return INITIAL_STATE;
    },

    [actionUpdateUserWatchedSearch.type]: (userData, action) => {
        const {brand, model} = action.payload;
        const stateData = current(userData);
        const isSearchWatched = stateData.currentUser.watch_list.searches.find(item => item.brand === brand && item.model === model);

        isSearchWatched
            ? userData.currentUser.watch_list.searches = stateData.currentUser.watch_list.searches.filter(function (search) {
                return (search.brand !== brand) || (search.model !== model);
            })
            : userData.currentUser.watch_list.searches.push(action.payload);
    },

    [actionUpdateUserWatchedAuctions.type]: (userData, action) => {
        const isAuctionWatched = userData.currentUser.watch_list.auctions.includes(action.payload);
        isAuctionWatched
            ? userData.currentUser.watch_list.auctions = userData.currentUser.watch_list.auctions.filter(function (item) {
                return item !== action.payload;
            })
            : userData.currentUser.watch_list.auctions.push(action.payload)

    },

    [togglePopupAuth.type]: (userData, action) => {
        userData.showPopupAuth = !userData.showPopupAuth
    }
})