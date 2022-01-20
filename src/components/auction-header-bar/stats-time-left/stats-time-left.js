import {useEffect, useState} from "react";
import {calculateLeftTime} from "../../../helpers/auction-functions";


const StatsTimeLeft = (props) => {
    const {endDate} = props;
    const [timeLeft, setTimeLeft] = useState(calculateLeftTime(endDate));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateLeftTime(endDate))
        }, 1000);
    });

    return (
        <div>
            <span>Time left: </span>
            {timeLeft}
        </div>
    )
}

export default StatsTimeLeft;