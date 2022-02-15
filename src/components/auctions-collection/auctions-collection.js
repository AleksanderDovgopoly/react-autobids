import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions} from "../../firebase/firebase.utils";
import AuctionsList from "../auctions-list/auctions-list";
import Spinner from "../spinner/spinner";
import CollectionSortsBar from "../collection-sorts-bar/collection-sorts-bar";
import FiltersBar from "../collection-filters-bar/collection-filters-bar";
import CollectionHeadingMobile from "../auctions-collection-heading-mobile/auctions-collection-heading-mobile";

import classes from "./auctions-collection.module.css";


const AuctionsCollection = ({pageType}) => {
    const client = useQueryClient();
    const {isLoading, isError, data, error} = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    // Mobile heading by viewport size
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const updateMedia = () => {
        setIsMobile(window.innerWidth < 769);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className={classes.auctionCollection}>
            <div className={classes.heading}>
                {
                    isMobile
                        ? <CollectionHeadingMobile pageTitle={pageType === 'home' ? 'Auctions' : 'Results'}/>
                        : <h3>{pageType === 'home' ? 'Auctions' : 'Results'}</h3>
                }
                <FiltersBar/>
                <CollectionSortsBar pageType={pageType}/>
            </div>
            <AuctionsList auctionsArr={Object.values(data)} pageType={pageType}/>
        </div>
    )
}

export default AuctionsCollection