import classes from "./listings.module.css";

const ListingsAuctions = ({auctions}) => {
    return (
        <ul className={classes.auctionsList}>
            {auctions.map(auction => (
                <li>{auction.title}</li>
            ))}
        </ul>
    )
}

export default ListingsAuctions;