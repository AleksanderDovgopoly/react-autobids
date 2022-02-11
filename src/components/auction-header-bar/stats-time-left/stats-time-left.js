import {useEffect, useState} from "react";
import {calculateLeftTime} from "../../../helpers/auction-functions";
import classes from "./stats-time-left.module.css";


const StatsTimeLeft = (props) => {
    const {endDate} = props;
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(endDate));

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeLeft(calculateLeftTime(endDate))
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className={classes.timeLeft}>
            <span>Time left: </span>
            {timeLeft}
        </div>
    )
}

export default StatsTimeLeft;