import {useSelector} from "react-redux";
import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions} from "../../firebase/firebase.utils";
import WatchedAuctionsCollection from "../../components/watch-list/watched-auctions-collection/watched-auctions-collection";
import WatchedSearchResults from "../../components/watch-list/watched-search-results/watched-search-results";
import Spinner from "../../components/spinner/spinner";

import classes from "./watch-list.module.css";


const WatchList = () => {
    const client = useQueryClient();
    const watched_ids = useSelector(state => state.user.currentUser.watch_list.auctions);
    const {isLoading, isError, data, error} = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (isLoading) return <Spinner/>;

    if (isError) return <span>Error: {error.message}</span>;

    let auctionsArr = Object.values(data);
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