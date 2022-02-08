import {useSelector} from "react-redux";
import WatchedAuctionsCollection from "../../components/watch-list/watched-auctions-collection/watched-auctions-collection";
import WatchedSearchResults from "../../components/watch-list/watched-search-results/watched-search-results";

import classes from "./watch-list.module.css";


const WatchList = () => {
    const auctionItemsObject = useSelector((state => state.auctions.cars));
    const watched_ids = useSelector(state => state.user.currentUser.watch_list.auctions);

    let auctionsArr = Object.values(auctionItemsObject);
    auctionsArr = auctionsArr.filter(({id}) => watched_ids.includes(id));
    const activeAuctions = auctionsArr.filter(item => item.status === 'active')
    const pastAuctions = auctionsArr.filter(item => item.status === 'past')

    return (
        <div className={classes.watchList}>
            <h1>Watch List</h1>
            <WatchedAuctionsCollection type="active" watchedArr={activeAuctions}/>
            <WatchedSearchResults />
            {
                pastAuctions.length !== 0 && <WatchedAuctionsCollection type="past" watchedArr={pastAuctions}/>
            }
        </div>
    )
}

export default WatchList;