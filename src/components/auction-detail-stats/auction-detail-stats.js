import StatsActions from "./stats-actions/stats-actions";
import StatsInfo from "./stats-info/stats-info";
import classes from "./auction-detail-stats.module.css";

const AuctionDetailStats = () => {
    return (
        <div className={classes.auctionStatsMeta}>
            <StatsInfo/>
            <StatsActions/>
        </div>
    )
}

export default AuctionDetailStats;