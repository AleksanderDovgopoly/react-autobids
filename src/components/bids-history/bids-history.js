import BidsHistoryItem from "../bids-history-item/bids-history-item";

import classes from "./bids-history.module.css";

const BidsHistory = (props) => {
    const bidsHistory = props.history;

    return (
        <div className={classes.bidsHistoryContainer}>
            <h4>Bids history</h4>
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