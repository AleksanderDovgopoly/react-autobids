import {Link} from "react-router-dom";
import classes from "./my-account-navigation.module.css";

const MyAccountNavigation = () => {
    return (
        <ul className={classes.accountNavigation}>
            <li>
                <Link to='/my-account'>Profile</Link>
            </li>
            <li>
                <Link to='/my-account/listings'>My Listings</Link>
            </li>
            <li>
                <Link to='/my-account/settings'>Settings</Link>
            </li>
        </ul>
    )
}

export default MyAccountNavigation