export const isSearchWatched = (searchParams, userSearches) => {
    const {brand, model} = searchParams;
    return userSearches.find(item => item.brand === brand && item.model === model);
}