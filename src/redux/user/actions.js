import {createAction} from "@reduxjs/toolkit";

export const setCurrentUser = createAction("SET_CURRENT_USER");
export const togglePopupAuth = createAction("SHOW_POPUP_AUTH");
export const clearCurrentUser = createAction("CLEAR_CURRENT_USER");
export const actionUpdateUserWatchedAuctions = createAction("UPDATE_USER_WATCHED_AUCTIONS");
export const actionUpdateUserWatchedSearch = createAction("UPDATE_USER_WATCHED_SEARCH");