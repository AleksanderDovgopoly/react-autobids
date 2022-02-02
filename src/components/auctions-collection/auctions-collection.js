import {useSelector} from "react-redux";
import AuctionsList from "../auctions-list/auctions-list";
import Spinner from "../spinner/spinner";
import CollectionSortsBar from "../collection-sorts-bar/collection-sorts-bar";
import FiltersBar from "../collection-filters-bar/collection-filters-bar";

import classes from "./auctions-collection.module.css";


const AuctionsCollection = (props) => {
    const {pageType, queryWord} = props;
    const isCarsFetching = useSelector((state => state.auctions.isFetching));
    const auctionItemsObject = useSelector((state => state.auctions.cars));

    let auctionsArr = Object.values(auctionItemsObject);

    let pageTitle = 'Auctions';

    // Check page type
    if (pageType === 'home') {
        auctionsArr = auctionsArr.filter(auction => auction.status !== 'past');
    }

    if (pageType === 'past') {
        pageTitle = 'Results';
        auctionsArr = auctionsArr.filter(auction => auction.status === 'past');
    }

    if (pageType === 'search') {
        auctionsArr = auctionsArr.filter(auction => {
            return auction.title.toLowerCase().includes(queryWord.toLowerCase())
        });
        pageTitle = `Results for: ${queryWord}  (${auctionsArr.length})`;
    }

    return (
        <div className={classes.auctionCollection}>
            <div className={classes.heading}>
                <h3>
                    {pageTitle}
                </h3>
                <FiltersBar />
                <CollectionSortsBar pageType={pageType}/>
            </div>
            {
                isCarsFetching
                    ? <AuctionsList auctionsArr={auctionsArr} pageType={pageType}/>
                    : <Spinner/>
            }
        </div>
    )
}

export default AuctionsCollection