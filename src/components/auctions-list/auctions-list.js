import {useSearchParams} from "react-router-dom";
import {doSortAuctionsList} from "../../helpers/auction-functions";
import AuctionItem from "../auction-item/auction-item";

import classes from "./auctions-list.module.css";


const AuctionsList = (props) => {
    const {auctionsArr, userId} = props;
    const [searchParams] = useSearchParams();
    const currentSort = searchParams.get('sort');

    if (!auctionsArr.length) {
        return <p>Nothing found for your request</p>;
    }

    const auctionItems = doSortAuctionsList(auctionsArr, currentSort);

    return (
        <ul className={classes.auctionList}>
            {
                auctionItems.map((item) => (
                    <AuctionItem key={item.id} item={item} userId={userId}/>
                ))
            }
        </ul>
    )
}

export default AuctionsList;