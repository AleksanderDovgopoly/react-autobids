import {useSearchParams} from "react-router-dom";
import {doFilterAuctions, doSortAuctionsList} from "../../helpers/auction-functions";
import AuctionItem from "../auction-item/auction-item";

import classes from "./auctions-list.module.css";


const AuctionsList = ({auctionsArr, bidGroups, pageType}) => {
    const [searchParams] = useSearchParams();
    let currentSort = searchParams.get('sort');
    const transmissionFilter = searchParams.get('transmission');
    const bodyStyleFilter = searchParams.get('body_style');
    const startYearFilter = searchParams.get('start_year');
    const endYearFilter = searchParams.get('end_year');

    if (transmissionFilter || bodyStyleFilter || startYearFilter || endYearFilter) {
        auctionsArr = doFilterAuctions(auctionsArr, transmissionFilter, bodyStyleFilter, startYearFilter, endYearFilter);
    }

    if (!auctionsArr.length) {
        return <p>Nothing found for your request</p>;
    }

    if (pageType === 'past' && currentSort === null) {
        currentSort = 'recently_ended'
    }

    const auctionItems = doSortAuctionsList(auctionsArr, currentSort);

    return (
        <ul className={classes.auctionList}>
            {
                auctionItems.map((item) => (
                    <AuctionItem key={item.id} item={item} bids={bidGroups}/>
                ))
            }
        </ul>
    )
}

export default AuctionsList;