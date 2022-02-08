import AuctionsList from "../../auctions-list/auctions-list";
import classes from "./watched-auctions-collection.module.css";

const WatchedAuctionsCollection = ({type, watchedArr}) => {
    let sectionTitle = 'Auctions';
    if (type === 'past') {
        sectionTitle = 'Results'
    }
    return (
        <div className={classes.watchedCollection}>
            <h2>{sectionTitle}</h2>
            {
                watchedArr.length
                    ? <div className={classes.results}>
                        <AuctionsList auctionsArr={watchedArr}/>
                    </div>
                    : <p className={classes.noResults}>
                        Click the star icon next to any auction to add it to your watch list and
                        start getting auction notifications.
                    </p>
            }
        </div>
    )
}

export default WatchedAuctionsCollection