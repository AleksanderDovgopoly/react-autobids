import {CLEAR_AUCTION_DETAIL, FETCH_AUCTION_DETAIL, UPDATE_AUCTION_COMMENTS, UPDATE_BID_HISTORY} from "../actionTypes";
import {addAuctionComment, addBidToHistory} from "./auction-detail.utils";

const INITIAL_STATE = {
    fetchingId: '',
    data: []
};

const auctionDetailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_AUCTION_DETAIL:
            return {
                ...state,
                fetchingId: action.payload.id,
                data: action.payload
            }
        case UPDATE_BID_HISTORY:
            return {
                ...state,
                data: addBidToHistory(state.data, action.payload)
            }
        case UPDATE_AUCTION_COMMENTS:
            return {
                ...state,
                data: addAuctionComment(state.data, action.payload)
            }
        case CLEAR_AUCTION_DETAIL:
            return {
                state: INITIAL_STATE
            }
        default:
            return state;
    }
};

export default auctionDetailReducer;