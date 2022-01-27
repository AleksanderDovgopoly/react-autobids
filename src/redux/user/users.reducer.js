import {CLEAR_CURRENT_USER, SET_CURRENT_USER, SHOW_POPUP_AUTH} from "../actionTypes";


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
        case CLEAR_CURRENT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;