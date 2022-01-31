import {combineReducers} from "redux";
import userReducer from "./user/users.reducer";
import auctionsReducer from "./auctions/auctions.reducer";
import auctionDetailReducer from "./auction-detail/auction-detail.reducer";
import categoriesReducer from "./categories/categories.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    auctions: auctionsReducer,
    detail: auctionDetailReducer,
    categories: categoriesReducer
});

export default rootReducer;