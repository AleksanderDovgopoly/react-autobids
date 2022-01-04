import {combineReducers} from "redux";
import userReducer from "./user/users.reducer";
import auctionsReducer from "./auctions.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    auctions: auctionsReducer
});

export default rootReducer;