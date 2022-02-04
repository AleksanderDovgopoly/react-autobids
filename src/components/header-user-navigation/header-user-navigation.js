import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import watchIcon from '../../images/watchlist.png';
import notifyIcon from '../../images/notify.svg';
import menuIcon from '../../images/main-menu.png';
import UserNavDropdown from "./user-nav-dropdown-menu/user-nav-dropdown";

import classes from "./header-user-navigation.module.css";


const UserNavigation = () => {
    const [isNotifyMenu, setIsNotifyMenu] = useState(false);
    const [isMainMenu, setIsMainMenu] = useState(false);
    const location = useLocation();

    const notifyToggleHandler = (event) => {
        event.preventDefault();
        setIsNotifyMenu(!isNotifyMenu);
        if (isMainMenu) {
            setIsMainMenu(false);
        }
    }

    const mainMenuToggleHandler = (event) => {
        event.preventDefault();
        setIsMainMenu(!isMainMenu);
        if (isNotifyMenu) {
            setIsNotifyMenu(false);
        }
    }

    return (
        <div className={classes.userNavigation}>
            <Link
                to="/watchlist"
                className={`${classes.watchlistToggle} ${location.pathname === "/watchlist" ? classes.activeToggle : null}`}
            >
                <img src={watchIcon} alt="Watchlist"/>
            </Link>
            <div className={classes.notificationsToggle}>
                <Link to="" onClick={notifyToggleHandler}>
                    <img src={notifyIcon}/>
                </Link>
                {
                    isNotifyMenu ? <UserNavDropdown menuType="notify"/> : null
                }
            </div>
            <div className={classes.menuToggle}>
                <Link to="" onClick={mainMenuToggleHandler}>
                    <img src={menuIcon} alt="Main menu"/>
                </Link>
                {
                    isMainMenu ? <UserNavDropdown menuType="main"/> : null
                }
            </div>
        </div>
    )
}

export default UserNavigation;