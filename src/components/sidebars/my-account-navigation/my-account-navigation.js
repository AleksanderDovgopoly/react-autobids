import {Link, useParams} from "react-router-dom";
import classes from "./my-account-navigation.module.css";

const MyAccountNavigation = () => {
    const {breakpoint} = useParams();

    return (
        <ul className={classes.accountNavigation}>
            <li>
                <Link to='/my-account'
                      className={breakpoint === undefined ? classes.active : null}
                >
                    Profile
                </Link>
            </li>
            <li>
                <Link to='/my-account/listings'
                      className={breakpoint === 'listings' ? classes.active : null}
                >
                    My Listings
                </Link>
            </li>
            <li>
                <Link to='/my-account/settings'
                      className={breakpoint === 'settings' ? classes.active : null}
                >
                    Settings
                </Link>
            </li>
        </ul>
    )
}

export default MyAccountNavigation