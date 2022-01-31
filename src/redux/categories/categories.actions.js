import {FETCH_CATEGORIES_COLLECTION} from "../actionTypes";

export const fetchCategoriesCollection = collection => ({
    type: FETCH_CATEGORIES_COLLECTION,
    payload: collection
});