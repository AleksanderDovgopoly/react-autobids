import {FETCH_CATEGORIES_COLLECTION} from "../actionTypes";

const INITIAL_STATE = {
    isFetching: false,
    taxonomies: []
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_COLLECTION:
            return {
                ...state,
                isFetching: true,
                taxonomies: action.payload
            }
        default:
            return state;
    }
};

export default categoriesReducer;