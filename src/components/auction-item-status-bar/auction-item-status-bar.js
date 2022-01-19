import {useEffect, useState} from "react";
import {calculateLeftTime} from "../../helpers/auction-functions";

import classes from "./auction-item-status-bar.module.css";


const AuctionItemStatusBar = (props) => {
    const {currentPrice, startPrice, endDate} = props;

    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(endDate));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(endDate))
        }, 1000);
    })


    return (
        <div className={classes.statusBar}>
            <div className={classes.statusBg}>
                <div>
                    $ {currentPrice || startPrice}
                </div>
                <div className={classes.auctionCounter}>
                    <span>{timeLeft}</span>
                </div>
            </div>
        </div>
    )
}

export default AuctionItemStatusBar