import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuctions} from "../../firebase/firebase.utils";
import {fetchAuctionsAction} from "../../redux/auctions/auctions.actions";
import AuctionsList from "../auctions-list/auctions-list";
import Spinner from "../spinner/spinner";
import CollectionSortsBar from "../collection-sorts-bar/collection-sorts-bar";
import FiltersBar from "../collection-filters-bar/collection-filters-bar";

import classes from "./auctions-collection.module.css";


const AuctionsCollection = (props) => {
    const {pageType, queryWord} = props;
    const dispatch = useDispatch();
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

    useEffect(() => {
        async function fetchData() {
            const auctionsCollection = await fetchAuctions();
            dispatch(fetchAuctionsAction(auctionsCollection));
        }

        if (!isCarsFetching) {
            fetchData();
        }
    }, [dispatch, isCarsFetching])

    return (
        <div className={classes.auctionCollection}>
            <div className={classes.heading}>
                <h3>
                    {pageTitle}
                </h3>
                <FiltersBar />
                <CollectionSortsBar/>
            </div>
            {
                isCarsFetching
                    ? <AuctionsList auctionsArr={auctionsArr}/>
                    : <Spinner/>
            }
        </div>
    )
}

export default AuctionsCollection