import {Link} from "react-router-dom";

import classes from "./drop-down-menu.module.css";


const DropDownMenu = () => {

    return (
        <ul className={classes.submenu}>
            <li>
                <Link to="/">Live Auctions</Link>
            </li>
            <li>
                <Link to="/past-auctions">Past Results</Link>
            </li>
        </ul>
    )
}

export default DropDownMenu;