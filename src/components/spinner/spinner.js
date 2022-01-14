import classes from "./spinner.module.css";

const Spinner = () => {
    return (
        <div className={classes.center}>
            <div className={classes.lightgreen}></div>
            <div className={classes.darkgreen}></div>
        </div>
    )
}

export default Spinner