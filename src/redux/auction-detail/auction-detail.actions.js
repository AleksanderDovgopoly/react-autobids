import {
    CLEAR_AUCTION_DETAIL,
    FETCH_AUCTION_COMMENTS,
    FETCH_AUCTION_DETAIL,
    UPDATE_AUCTION_COMMENTS,
    UPDATE_BID_HISTORY, UPDATE_COMMENT_REP
} from "../actionTypes";


export const fetchAuctionDetail = data => ({
    type: FETCH_AUCTION_DETAIL,
    payload: data
})

export const fetchAuctionComments = data => ({
    type: FETCH_AUCTION_COMMENTS,
    payload: data
})

export const updateAuctionComment = newComment => ({
    type: UPDATE_AUCTION_COMMENTS,
    payload: newComment
})

export const updateCommentVote = (commentId, userId) => ({
    type: UPDATE_COMMENT_REP,
    payload: {
        commentId,
        userId
    }
})

// ToDo: Delete or rebuild
export const updateStateBidsHistory = newBidData => ({
    type: UPDATE_BID_HISTORY,
    payload: newBidData
})

export const clearAuctionDetail = () => ({
    type: CLEAR_AUCTION_DETAIL
})