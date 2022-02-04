export const utilUpdateUserWatchedAuctions = (stateData, auctionId) => {
    const isAuctionWatched = stateData.watch_list.auctions.includes(auctionId);
    console.log(isAuctionWatched)
    let updatedData = stateData;
    console.log(updatedData)
    isAuctionWatched
        ? updatedData.watch_list.auctions.filter(id => id !== auctionId)
        : updatedData.watch_list.auctions.push(auctionId)

    return updatedData;
}