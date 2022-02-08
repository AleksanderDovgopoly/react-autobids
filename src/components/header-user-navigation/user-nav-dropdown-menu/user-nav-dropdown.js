import ContentMainMenu from "./content-main-menu";
import NotificationsContainer from "../notifications-dropdown/notifications-container";
import classes from "./user-nav-dropdown.module.css";

const UserNavDropdown = ({menuType}) => {
    return (
        <div className={classes.drop}>
            {
                menuType === "main"
                    ? <ContentMainMenu/>
                    : <NotificationsContainer/>
            }
        </div>
    )
}

export default UserNavDropdown;