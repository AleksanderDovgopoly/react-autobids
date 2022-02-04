import classes from "./user-nav-dropdown.module.css";

const ContentNotifications = () => {
    return (
        <div className={classes.notifyContent}>
            <div className={classes.empty}>No notifications yet</div>
        </div>
    )
}

export default ContentNotifications;