import {combineReducers} from "redux";
import userReducer from "./user/reducer";
import categoriesReducer from "./categories/reducer";

export default combineReducers({
    user: userReducer,
    categories: categoriesReducer
})