import {CLEAR_AUCTION_DETAIL, FETCH_AUCTION_DETAIL, UPDATE_AUCTION_COMMENTS, UPDATE_BID_HISTORY} from "../actionTypes";


export const fetchAuctionDetail = data => ({
    type: FETCH_AUCTION_DETAIL,
    payload: data
})

export const updateStateBidsHistory = newBidData => ({
    type: UPDATE_BID_HISTORY,
    payload: newBidData
})

export const updateAuctionComment = newComment => ({
    type: UPDATE_AUCTION_COMMENTS,
    payload: newComment
})

export const clearAuctionDetail = () => ({
    type: CLEAR_AUCTION_DETAIL
})