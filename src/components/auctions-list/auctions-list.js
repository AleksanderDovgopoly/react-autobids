import {useSelector} from "react-redux";
import AuctionItem from "../auction-item/auction-item";

import classes from "./auctions-list.module.css";


const AuctionsList = () => {
    const auctionItemsObject = useSelector((state => state.auctions.cars));

    const auctionItems = Object.values(auctionItemsObject)
        .sort(function (x, y) {
            return x.start_date - y.start_date;
        })

    return (
        <ul className={classes.auctionList}>
            {
                auctionItems.map((item) => (
                    <AuctionItem key={item.id} item={item}/>
                ))
            }
        </ul>
    )
}

export default AuctionsList;