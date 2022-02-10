import {FETCH_CATEGORIES_COLLECTION} from "../actionTypes";

const INITIAL_STATE = {
    isFetching: false,
    taxonomies: [],
    brand_models: []
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_COLLECTION:
            return {
                ...state,
                isFetching: true,
                taxonomies: action.payload.taxonomies,
                brand_models: action.payload.brand_models
            }
        default:
            return state;
    }
};

export default categoriesReducer;