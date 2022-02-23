import {createReducer} from "@reduxjs/toolkit";
import {fetchCategoriesCollection} from './actions';

const INITIAL_STATE = {
    isFetching: false,
    taxonomies: [],
    brand_models: []
};

export default createReducer(INITIAL_STATE, {
    [fetchCategoriesCollection.type]: (categories, action) => {
        categories.isFetching = true;
        categories.taxonomies = action.payload.taxonomies;
        categories.brand_models = action.payload.brand_models;
    }
});