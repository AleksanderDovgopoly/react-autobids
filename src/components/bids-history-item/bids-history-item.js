import {Link} from "react-router-dom";

import classes from "./bids-history-item.module.css";

const BidsHistoryItem = (props) => {
    const bid = props.bid;

    return (
        <li className={classes.bidHistoryItem}>
            <Link className={classes.user} to={`/user/${bid.user_id}`} >
                {bid.user_name}
            </Link>
            -
            <span>${bid.bid_price}</span>
        </li>
    )
}

export default BidsHistoryItem