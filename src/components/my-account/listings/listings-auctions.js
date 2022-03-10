import ListingsAuctionItem from "./listings-auction-item";
import classes from "./listings.module.css";

const ListingsAuctions = ({auctions}) => {
    return (
        <ul className={classes.auctionsList}>
            {auctions.map(auction => (
                <ListingsAuctionItem key={auction.id} auctionData={auction}/>
            ))}
        </ul>
    )
}

export default ListingsAuctions;