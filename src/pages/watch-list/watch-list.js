import WatchedAuctionsCollection from "../../components/watched-auctions-collection/watched-auctions-collection";

import classes from "./watch-list.module.css";

const WatchList = () => {
    return (
        <div className={classes.watchList}>
            <h1>Watch List</h1>
            <WatchedAuctionsCollection/>
        </div>
    )
}

export default WatchList;