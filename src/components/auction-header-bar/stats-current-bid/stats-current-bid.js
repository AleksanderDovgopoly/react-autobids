import classes from "./stats-current-bid.module.css";

const StatsCurrentBid = ({bid, startPrice}) => {
    return (
        <div className={classes.currentBid}>
            <span>Current bid: </span>
            ${bid || startPrice}
        </div>
    )
}

export default StatsCurrentBid;