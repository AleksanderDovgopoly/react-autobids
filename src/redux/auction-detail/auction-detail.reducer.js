import {
    CLEAR_AUCTION_DETAIL,
    FETCH_AUCTION_COMMENTS,
    FETCH_AUCTION_DETAIL,
    UPDATE_AUCTION_COMMENTS,
    UPDATE_BID_HISTORY,
    UPDATE_COMMENT_REP
} from "../actionTypes";
import {addAuctionComment, addBidToHistory, addVoteToCommentById} from "./auction-detail.utils";

const INITIAL_STATE = {
    fetchingId: '',
    data: [],
    comments_n_bids: []
};

const auctionDetailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_AUCTION_DETAIL:
            return {
                ...state,
                fetchingId: action.payload.id,
                data: action.payload
            }
        case FETCH_AUCTION_COMMENTS:
            return {
                ...state,
                comments_n_bids: action.payload
            }
        case UPDATE_AUCTION_COMMENTS:
            return {
                ...state,
                comments_n_bids: addAuctionComment(state.comments_n_bids, action.payload)
            }
        case UPDATE_COMMENT_REP:
            return {
                ...state,
                comments_n_bids: addVoteToCommentById(state.comments_n_bids, action.payload)
            }
        case UPDATE_BID_HISTORY:
            return {
                ...state,
                data: addBidToHistory(state.data, action.payload)
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