export const addBidToHistory = (stateData, newBid) => {
    const newStateData = stateData;
    newStateData.bids_history.push(newBid);
    newStateData.current_price = newBid.bid_price;

    return newStateData;
}

export const addAuctionComment = (stateData, newComment) => {
    const newStateData = stateData;
    newStateData.comments.push(newComment);

    return newStateData;
}