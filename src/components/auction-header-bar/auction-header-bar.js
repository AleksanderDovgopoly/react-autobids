import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {calculateLeftTime} from "../../helpers/auction-functions";

import classes from "./auction-header-bar.module.css";


const AuctionHeaderBar = () => {
    const {start_price, current_price, bids_history, views, end_date} = useSelector(state => state.detail.data);
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(end_date));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(end_date))
        }, 1000);
    });

    return (
        <div className={classes.auctionHeaderBar}>
            <div className={classes.bidStats}>
                <div>
                    <span>Time left: </span>
                    {timeLeft}
                </div>
                <div>
                    <span>Current bid: </span>
                    ${current_price || start_price}
                </div>
                <div>
                    <span>#Bids: </span>
                    {
                        bids_history
                            ? bids_history.length
                            : 0
                    }
                </div>
                <div>
                    <span>Views: </span>
                    {views}
                </div>
            </div>
            <button className="btn btn-primary signInBtn">Place Bid</button>
        </div>
    )
}

export default AuctionHeaderBar;