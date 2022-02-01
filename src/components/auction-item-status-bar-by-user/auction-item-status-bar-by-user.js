import classes from "../auction-item-status-bar/auction-item-status-bar.module.css";

const AuctionItemStatusBarByUser = ({itemData, bids}) => {
    const allItemBids = bids[itemData.id];
    const maxUserBid = Math.max.apply(Math, allItemBids.map(function (bid) {
        return bid.bid_price
    }));

    return (
        <div className={classes.statusBar}>
            <div className={classes.statusBg}>
                <div>
                    {allItemBids.length} Bids to
                    <span className={classes.price}>${maxUserBid}</span>
                </div>
            </div>
        </div>
    )
}

export default AuctionItemStatusBarByUser