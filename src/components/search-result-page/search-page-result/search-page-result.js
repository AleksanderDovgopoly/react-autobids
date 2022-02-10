import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SearchResultsCollection from "../search-results-collection/search-results-collection";

import classes from "./search-page-result.module.css";


const SearchPageResult = () => {
    const {made, model} = useParams();
    const auctions = useSelector(state => state.auctions.cars);

    let auctionsArr = Object.values(auctions);
    if (made !== undefined && model === undefined) {
        auctionsArr = auctionsArr.filter(item => item.spec.make.toLowerCase() === made);
    }
    if (model !== undefined) {
        auctionsArr = auctionsArr.filter(item => item.spec.model.toLowerCase() === model);
    }

    const activeAuctions = auctionsArr.filter(item => item.status === 'active');
    const pastAuctions = auctionsArr.filter(item => item.status === 'past');

    return (
        <div className={classes.searchResults}>
            <SearchResultsCollection auctionsArr={activeAuctions} resultType="active"/>
            <SearchResultsCollection auctionsArr={pastAuctions} resultType="past"/>
        </div>
    )
}

export default SearchPageResult;