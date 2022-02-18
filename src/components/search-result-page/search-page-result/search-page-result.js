import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions} from "../../../firebase/firebase.utils";
import SearchResultsCollection from "../search-results-collection/search-results-collection";
import Spinner from "../../spinner/spinner";

import classes from "./search-page-result.module.css";


const SearchPageResult = () => {
    const {brand, model} = useParams();
    const client = useQueryClient();
    const {isLoading, isError, data, error} = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    let auctionsArr = Object.values(data);
    if (brand !== undefined && model === undefined) {
        auctionsArr = auctionsArr.filter(item => item.spec.make.toLowerCase() === brand);
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