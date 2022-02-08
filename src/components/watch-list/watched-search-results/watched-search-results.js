import classes from "./watched-search-results.module.css";

const WatchedSearchResults = () => {
    return (
        <div className={classes.watchedSearches}>
            <h3>Saved Searches</h3>
            <p>Get notified when a car you're looking for is listed – just click the yellow "Save Search & Notify Me"
                button as you search.</p>
        </div>
    )
}

export default WatchedSearchResults