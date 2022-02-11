import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AuctionsList from "../auctions-list/auctions-list";
import Spinner from "../spinner/spinner";
import CollectionSortsBar from "../collection-sorts-bar/collection-sorts-bar";
import FiltersBar from "../collection-filters-bar/collection-filters-bar";
import CollectionHeadingMobile from "../auctions-collection-heading-mobile/auctions-collection-heading-mobile";

import classes from "./auctions-collection.module.css";


const AuctionsCollection = ({pageType}) => {
    const isCarsFetching = useSelector((state => state.auctions.isFetching));
    const auctionItemsObject = useSelector((state => state.auctions.cars));

    let auctionsArr = Object.values(auctionItemsObject);

    // Check page type
    let pageTitle = 'Auctions';

    if (pageType === 'home') {
        auctionsArr = auctionsArr.filter(auction => auction.status !== 'past');
    }

    if (pageType === 'past') {
        pageTitle = 'Results';
        auctionsArr = auctionsArr.filter(auction => auction.status === 'past');
    }

    // Mobile heading by viewport size
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const updateMedia = () => {
        setIsMobile(window.innerWidth < 769);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    return (
        <div className={classes.auctionCollection}>
            <div className={classes.heading}>
                {
                    isMobile
                        ? <CollectionHeadingMobile pageTitle={pageTitle}/>
                        : <h3>{pageTitle}</h3>
                }
                <FiltersBar/>
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