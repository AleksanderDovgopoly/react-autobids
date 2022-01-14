import {useSelector} from "react-redux";
import AuctionsList from "../auctions-list/auctions-list";

import classes from "./user-detail-bid-history.module.css";


const UserDetailBidHistory = (props) => {
    const {userId} = props;

    const auctionItemsObject = useSelector((state => state.auctions.cars));

    let auctionsArr = Object.values(auctionItemsObject);

    const filteredAuctions = auctionsArr
        .filter(function (key, value) {
            return key.bids_history.find((bid) => ( bid.user_id === userId ))
        })

    return (
        <div className={classes.bidHistory}>
            <h2>
                Bid History
                <span>(Bids on {filteredAuctions.length} cars)</span>
            </h2>
            {
                filteredAuctions.length
                    ? <AuctionsList auctionsArr={filteredAuctions} userId={userId}/>
                    : <p>There are no auctions created yet</p>
            }
        </div>
    )
}

export default UserDetailBidHistory;