import {
    CLEAR_CURRENT_USER,
    SET_CURRENT_USER,
    SHOW_POPUP_AUTH,
    UPDATE_USER_WATCHED_AUCTIONS,
    UPDATE_USER_WATCHED_SEARCH
} from "../actionTypes";
import {utilUpdateUserWatchedAuctions, utilUpdateUserWatchedSearch} from "./user.utils";


const INITIAL_STATE = {
    isLogin: false,
    showPopupAuth: false,
    currentUser: []
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLogin: true,
                currentUser: action.payload
            }
        case SHOW_POPUP_AUTH:
            return {
                ...state,
                showPopupAuth: !state.showPopupAuth,
            }
        case UPDATE_USER_WATCHED_AUCTIONS:
            return {
                ...state,
                currentUser: utilUpdateUserWatchedAuctions(state.currentUser, action.payload),
            }
        case UPDATE_USER_WATCHED_SEARCH:
            return {
                ...state,
                currentUser: utilUpdateUserWatchedSearch(state.currentUser, action.payload),
            }
        case CLEAR_CURRENT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;