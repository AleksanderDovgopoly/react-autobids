import {Link} from "react-router-dom";
import SearchForm from "../search-form/search-form";
import DropDownMenu from "../drop-down-menu/drop-down-menu";
import UserBar from "../header-user-bar/header-user-bar";

import classes from "./header.module.css";


const Header = () => {


    return (
        <div className={classes.header}>
            <div className={classes.logoContainer}>
                <Link to='/'>AutoBids</Link>
            </div>
            <div className={classes.navContainer}>
                <ul className={classes.navBar}>
                    <li className={classes.hasSubMenu}>
                        Auctions
                        <DropDownMenu/>
                    </li>
                    <li>
                        <Link to="/sell-car">Sell car</Link>
                    </li>
                </ul>
                <SearchForm/>
            </div>
            <div className={classes.loginContainer}>
                <UserBar/>
            </div>
        </div>
    )
}

export default Header;