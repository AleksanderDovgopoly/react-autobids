export const addAuctionComment = (stateData, newComment) => {
    const newStateData = stateData;
    newStateData.push(newComment);

    return newStateData;
}

export const addVoteToCommentById = (stateData, payload) => {
    const {commentId, userId} = payload;
    const objIndex = stateData.findIndex((obj => obj.id === commentId));
    stateData[objIndex].rep.push(userId);

    return stateData;
}


export const addBidToHistory = (stateData, newBid) => {
    const newStateData = stateData;
    newStateData.bids_history.push(newBid);
    newStateData.current_price = newBid.bid_price;

    return newStateData;
}