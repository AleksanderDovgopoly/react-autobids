import {FETCH_AUCTIONS_COLLECTION} from "../actionTypes";

const INITIAL_STATE = {
    isFetching: false,
    cars: []
};

const auctionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_AUCTIONS_COLLECTION:
            return {
                ...state,
                isFetching: true,
                cars: action.payload
            }
        default:
            return state;
    }
};

export default auctionsReducer;