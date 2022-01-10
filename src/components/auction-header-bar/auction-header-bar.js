import {useEffect, useState} from "react";

import classes from "./auction-header-bar.module.css";


const AuctionHeaderBar = (props) => {
    const {start_price, current_price, bids_history, start_date} = props;
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(start_date));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(start_date))
        }, 1000);
    }, [start_date])

    const daysLeft = timeLeft.getDate();
    const hoursLeft = timeLeft.getUTCHours();
    const minutesLeft = timeLeft.getUTCMinutes();
    const secondsLeft = timeLeft.getUTCSeconds();


    function calculateLeftTime(start_date) {
        Date.prototype.addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let timeLeft = 0;
        const startDate = new Date(start_date.seconds * 1000);
        const endDate = startDate.addDays(5);
        const currentDate = new Date();
        timeLeft = new Date(endDate.getTime() - currentDate.getTime());

        return timeLeft;
    }

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
                <span># Bids: </span>
                {
                    bids_history
                        ? bids_history.length
                        : 0
                }
            </div>
            <div>
                <span>Time left: </span>
                {
                    daysLeft
                        ? `${daysLeft} days ${hoursLeft} : ${minutesLeft} : ${secondsLeft}`
                        : `${hoursLeft} : ${minutesLeft} : ${secondsLeft}`
                }
            </div>
        </div>
    )
}

export default AuctionHeaderBar;