import classes from "./save-search-result-button.module.css";

const SaveSearchResultButton = () => {
    return (
        <div className={classes.saveThis}>
            <button className={classes.saveSearchBtn}>Save Search & Notify Me</button>
        </div>
    )
}

export default SaveSearchResultButton