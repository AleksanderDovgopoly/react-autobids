import {Link} from "react-router-dom";
import moment from "moment";

import classes from "./bids-history-item.module.css";

const BidsHistoryItem = (props) => {
    const bid = props.bid;

    const date = moment.unix(bid.bid_date.seconds);
    const fromDate = date.from(Date.now())

    return (
        <li className={classes.bidHistoryItem}>
            <Link className={classes.user} to={`/user/${bid.user_id}`}>
                {bid.user_name}
            </Link>
            {fromDate}
            <div className={classes.price}>
                Bid:
                <span>${bid.bid_price}</span>
            </div>
        </li>
    )
}

export default BidsHistoryItem