import AuctionsCollection from "../../components/auctions-collection/auctions-collection";

import classes from "./search-page.module.css";
import {useParams} from "react-router-dom";


const SearchPage = () => {
    const {query} = useParams();


    return (
        <div className={classes.searchContainer}>
            <AuctionsCollection pageType="search" queryWord={query}/>
        </div>
    )
}

export default SearchPage