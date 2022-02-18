import {useSelector} from "react-redux";
import WatchedSearchesCollection from "../watched-searches-collection/watched-searches-collection";
import classes from "./watched-search-results.module.css";


const WatchedSearchResults = () => {
    const searchesList = useSelector(state => state.user.currentUser.watch_list.searches);

    return (
        <div id="saved_searches" className={classes.watchedSearches}>
            <h3>Saved Searches</h3>
            {
                searchesList.length
                    ? <WatchedSearchesCollection searchesList={searchesList}/>
                    : <p>Get notified when a car you're looking for is listed – just click the yellow "Save Search &
                        Notify Me"
                        button as you search.</p>
            }
        </div>
    )
}

export default WatchedSearchResults