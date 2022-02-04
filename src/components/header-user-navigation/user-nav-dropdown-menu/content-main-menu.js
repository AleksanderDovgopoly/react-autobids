import {Link} from "react-router-dom";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../../firebase/firebase.utils";
import {clearCurrentUser} from "../../../redux/user/user.actions";

import classes from "./user-nav-dropdown.module.css";


const ContentMainMenu = () => {
    const dispatch = useDispatch();
    const {photoURL} = useSelector((state => state.user.currentUser));
    let userPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c';

    function logOutHandler(event) {
        event.preventDefault();
        auth.signOut();
        dispatch(clearCurrentUser());
    }

    return (
        <Fragment>
            <ul>
                <li className={classes.profileLink}>
                    <Link to="/my-account">
                        <span>Profile</span>
                        <img src={photoURL || userPhoto} alt="Profile photo"/>
                    </Link>
                </li>
                <li>
                    <Link to="/my-account">My Listings</Link>
                </li>
                <li>
                    <Link to="/my-account">Settings</Link>
                </li>
            </ul>
            <div className={classes.logOut}>
                <button onClick={logOutHandler}>Log out</button>
            </div>
        </Fragment>
    )
}

export default ContentMainMenu