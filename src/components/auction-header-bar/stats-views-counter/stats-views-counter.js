import classes from "./stats-view-counter.module.css";

const StatsViewsCounter = ({views}) => {
    return (
        <div className={classes.viewCounter}>
            <span>Views: </span>
            {views}
        </div>
    )
}

export default StatsViewsCounter;