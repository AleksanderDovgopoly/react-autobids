import {FETCH_AUCTIONS_COLLECTION} from "../actionTypes";


export const fetchAuctionsAction = collection => ({
    type: FETCH_AUCTIONS_COLLECTION,
    payload: collection,
})