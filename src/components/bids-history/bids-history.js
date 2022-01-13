import {useSelector} from "react-redux";
import BidsHistoryItem from "../bids-history-item/bids-history-item";

import classes from "./bids-history.module.css";


const BidsHistory = () => {
    const bidsHistory = useSelector(state => state.detail.data.bids_history)

    bidsHistory.sort(function (x, y) {
        return y.bid_date - x.bid_date;
    })

    return (
        <div className={classes.bidsHistoryContainer}>
            {
                bidsHistory.length
                    ? <ul>
                        {
                            bidsHistory.map((bid, index) => (
                                    <BidsHistoryItem key={index} bid={bid}/>
                                )
                            )
                        }
                    </ul>
                    : <p>Your bid will be first</p>
            }

        </div>
    )
}

export default BidsHistory