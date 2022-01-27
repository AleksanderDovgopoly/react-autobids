import {CLEAR_CURRENT_USER, SET_CURRENT_USER, SHOW_POPUP_AUTH} from "../actionTypes";


export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user,
})

export const togglePopupAuth = () => ({
    type: SHOW_POPUP_AUTH
})

export const clearCurrentUser = () => ({
    type: CLEAR_CURRENT_USER,
})