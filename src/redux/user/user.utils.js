export const utilUpdateUserWatchedAuctions = (stateData, auctionId) => {
    const isAuctionWatched = stateData.watch_list.auctions.includes(auctionId);
    let updatedData = stateData;
    let updatedAuctions = stateData.watch_list.auctions.filter(function (item) {
        return item !== auctionId;
    });

    isAuctionWatched
        ? updatedData.watch_list.auctions = updatedAuctions
        : updatedData.watch_list.auctions.push(auctionId)

    return updatedData;
}