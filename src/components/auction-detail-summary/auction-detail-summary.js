import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";
import SetBidBar from "../set-bid-bar/set-bid-bar";

import classes from "./auction-detail-summary.module.css";


const AuctionDetailSummary = () => {
    const {end_date, views, seller, current_price, bids_history} = useSelector(state => state.detail.data);

    const endingMoment = moment.unix(end_date.seconds);
    const endingDate = endingMoment.format("MMM D YYYY, h:mm a");

    const sellerUrl = `/user/${seller.id}`


    return (
        <div className={classes.summaryContainer}>
            <dl>
                <dt>Ending</dt>
                <dd>{endingDate}</dd>
                <dt>Seller</dt>
                <dd>
                    <Link to={sellerUrl}>{seller.name}</Link>
                </dd>
                <dt>Views</dt>
                <dd>{views}</dd>
                <dt>Current Bid</dt>
                <dd>${current_price}</dd>
                <dt>Bids</dt>
                <dd>{bids_history.length}</dd>
            </dl>
            <SetBidBar/>
        </div>
    )
}

export default AuctionDetailSummary