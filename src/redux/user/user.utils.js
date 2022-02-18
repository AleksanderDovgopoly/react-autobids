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
};

export const utilUpdateUserWatchedSearch = (stateData, searchParams) => {
    const {brand, model} = searchParams;
    const isSearchWatched = stateData.watch_list.searches.find(item => item.brand === brand && item.model === model);
    let updatedData = stateData;
    let updatedSearches = stateData.watch_list.searches.filter(function (item) {
        return (item.brand !== searchParams.brand) || (item.model !== searchParams.model)
    });

    isSearchWatched
        ? updatedData.watch_list.searches = updatedSearches
        : updatedData.watch_list.searches.push(searchParams)

    return stateData;
};