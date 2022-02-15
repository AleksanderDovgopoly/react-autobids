import AuctionsList from "../../auctions-list/auctions-list";
import classes from "./user-detail-bid-history.module.css";

const UserDetailBidHistory = ({userBids, auctionsData}) => {
    let auctionsItemsArr = Object.values(auctionsData);

    const bidsGroupByAuctions = userBids.reduce((acc, item) => {
        const auctionId = item.auction_id;
        if (acc[auctionId]) {
            acc[auctionId].push(item)
        } else {
            acc[auctionId] = [item]
        }
        return acc
    }, {});

    const filteredAuctions = Object.keys(bidsGroupByAuctions).map(key => auctionsItemsArr.find(item => item.id === key));

    return (
        <div className={classes.bidHistory}>
            <h2>
                Bid History
                <span>(Bids on {filteredAuctions.length} cars)</span>
            </h2>
            {
                filteredAuctions.length
                    ? <AuctionsList auctionsArr={filteredAuctions} bidGroups={bidsGroupByAuctions}/>
                    : <p>There are no auctions created yet</p>
            }
        </div>
    )
}

export default UserDetailBidHistory;