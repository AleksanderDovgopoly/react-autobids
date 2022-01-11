import {useEffect, useState} from "react";
import {calculateLeftTime} from "../../helpers/auction-functions";

import classes from "./auction-item-status-bar.module.css";


const AuctionItemStatusBar = (props) => {
    const {currentPrice, startPrice, startDate} = props;
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(startDate));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(startDate))
        }, 1000);
    }, [])

    const daysLeft = timeLeft.getDate();
    const hoursLeft = timeLeft.getUTCHours();
    const minutesLeft = timeLeft.getUTCMinutes();
    const secondsLeft = timeLeft.getUTCSeconds();

    return (
        <div className={classes.statusBar}>
            <div>
                $ {currentPrice || startPrice}
            </div>
            <div className={classes.auctionCounter}>
                {
                    daysLeft > 1
                        ? <span>{daysLeft} days</span>
                        : <span>{hoursLeft} : {minutesLeft} : {secondsLeft}</span>
                }
            </div>
        </div>
    )
}

export default AuctionItemStatusBar