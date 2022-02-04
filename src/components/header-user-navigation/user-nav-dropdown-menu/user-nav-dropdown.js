import ContentMainMenu from "./content-main-menu";
import ContentNotifications from "./content-notifications";
import classes from "./user-nav-dropdown.module.css";

const UserNavDropdown = ({menuType}) => {
    return (
        <div className={classes.drop}>
            {
                menuType === "main"
                    ? <ContentMainMenu/>
                    : <ContentNotifications/>
            }
        </div>
    )
}

export default UserNavDropdown;