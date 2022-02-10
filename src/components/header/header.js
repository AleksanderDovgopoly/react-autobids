import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import {togglePopupAuth} from "../../redux/user/user.actions";
import SearchForm from "../search-form/search-form";
import DropDownMenu from "../drop-down-menu/drop-down-menu";
import UserBar from "../header-user-bar/header-user-bar";
import PopupAuth from "../popup-auth/popup-auth";

import classes from "./header.module.css";
import 'reactjs-popup/dist/index.css';



const Header = () => {
    const showPopupAuth = useSelector(state => state.user.showPopupAuth)
    const dispatch = useDispatch();
    const ref = useRef();
    const closePopup = () => ref.current.close();

    return (
        <div className={classes.header}>
            <div className={classes.logoContainer}>
                <Link to='/'>React<span>&</span>Redux</Link>
            </div>
            <div className={classes.navContainer}>
                <ul className={classes.navBar}>
                    <li className={classes.hasSubMenu}>
                        Auctions
                        <DropDownMenu/>
                    </li>
                    <li className={classes.navSellCar}>
                        <Link to="/sell-car">Sell car</Link>
                    </li>
                </ul>
                <SearchForm/>
            </div>
            <div className={classes.loginContainer}>
                <UserBar/>
            </div>
            <Popup
                ref={ref}
                open={showPopupAuth}
                onClose={() => dispatch(togglePopupAuth())}
            >
                <PopupAuth closePopup={closePopup}/>
            </Popup>
        </div>
    )
}

export default Header;