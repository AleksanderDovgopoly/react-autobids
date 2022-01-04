import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "../actionTypes";


const INITIAL_STATE = {
    isLogin: false,
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
        case CLEAR_CURRENT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;