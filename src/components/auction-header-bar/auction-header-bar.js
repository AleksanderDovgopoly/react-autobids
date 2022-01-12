import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {calculateLeftTime} from "../../helpers/auction-functions";

import classes from "./auction-header-bar.module.css";


const AuctionHeaderBar = () => {
    const {start_price, current_price, bids_history, start_date} = useSelector(state => state.detail.data);
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(start_date));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(start_date))
        }, 1000);
    }, [start_date])

    // const daysLeft = timeLeft.getDate();
    // const hoursLeft = timeLeft.getUTCHours();
    // const minutesLeft = timeLeft.getUTCMinutes();
    // const secondsLeft = timeLeft.getUTCSeconds();


    return (
        <div className={classes.auctionHeaderBar}>
            <div>
                <span>Start price: </span>
                ${start_price}
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
                <span>Time left: </span>
                {
                    timeLeft
                    // daysLeft
                    //     ? `${daysLeft} days ${hoursLeft} : ${minutesLeft} : ${secondsLeft}`
                    //     : `${hoursLeft} : ${minutesLeft} : ${secondsLeft}`
                }
            </div>
        </div>
    )
}

export default AuctionHeaderBar;