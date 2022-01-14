import classes from "../auction-item-status-bar/auction-item-status-bar.module.css";


const AuctionItemStatusBarByUser = (props) => {
    const {itemData, userId} = props;

    const allItemBids = itemData.bids_history;
    const currUserBids = allItemBids.filter(item => item.user_id === userId);
    const maxUserBid = Math.max.apply(Math, currUserBids.map(function (bid) {
        return bid.bid_price
    }));

    return (
        <div className={classes.statusBar}>
            <div>
                {currUserBids.length} Bids to
                <span className={classes.price}>${maxUserBid}</span>
            </div>
        </div>
    )
}

export default AuctionItemStatusBarByUser