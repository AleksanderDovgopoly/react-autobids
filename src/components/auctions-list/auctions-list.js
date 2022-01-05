import classes from "./auctions-list.module.css";
import {useSelector} from "react-redux";
import AuctionItem from "../auction-item/auction-item";


const AuctionsList = () => {
    const auctionItems = useSelector((state => state.auctions.cars));

    return (
        <ul className={classes.auctionList}>
            {
                Object.keys(auctionItems).map((key) => (
                    <AuctionItem key={key} item={auctionItems[key]} />
                ))
            }
        </ul>
    )
}

export default AuctionsList;