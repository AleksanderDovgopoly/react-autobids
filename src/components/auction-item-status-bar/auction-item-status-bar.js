import {useEffect, useState} from "react";
import {calculateLeftTime, timeConverter} from "../../helpers/auction-functions";

import classes from "./auction-item-status-bar.module.css";


const AuctionItemStatusBar = (props) => {
    const {currentPrice, startPrice, startDate} = props;

    const start_date = timeConverter(startDate);

    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(startDate));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(startDate))
        }, 1000);
    }, [startDate])


    return (
        <div className={classes.statusBar}>
            <div>
                $ {currentPrice || startPrice}
            </div>
            <div className={classes.auctionCounter}>
                {
                    <span>{timeLeft}</span>
                    // daysLeft > 1
                    //     ? <span>{daysLeft} days</span>
                    //     : <span>{hoursLeft} : {minutesLeft} : {secondsLeft}</span>
                }
            </div>
        </div>
    )
}

export default AuctionItemStatusBar