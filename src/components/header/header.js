import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../firebase/firebase.utils";
import SearchForm from "../search-form/search-form";
import {clearCurrentUser} from "../../redux/user/user.actions";
import DropDownMenu from "../drop-down-menu/drop-down-menu";

import classes from "./header.module.css";


const Header = () => {
    const isLogin = useSelector((state => state.user.isLogin));
    const dispatch = useDispatch();

    function logOutHandler(event) {
        event.preventDefault();
        auth.signOut();
        dispatch(clearCurrentUser())
    }

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
                {
                    isLogin
                        ? <button className="btn btn-primary signOutBtn" onClick={logOutHandler}>Log out</button>
                        : <Link className="btn btn-primary signInBtn" to='sign-in'>Sign In</Link>
                }
            </div>
        </div>
    )
}

export default Header;