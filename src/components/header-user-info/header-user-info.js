import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../firebase/firebase.utils";
import {clearCurrentUser} from "../../redux/user/user.actions";

import classes from "./header-user-info.module.css";


const UserInfo = () => {
    const {photoURL, displayName} = useSelector((state => state.user.currentUser));
    const dispatch = useDispatch();
    let userPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c';

    function logOutHandler(event) {
        event.preventDefault();
        auth.signOut();
        dispatch(clearCurrentUser());
    }

    return (
        <div className={classes.info}>
            <div className={classes.avatar}>
                <Link to='/my-account'>
                    <img src={photoURL || userPhoto} alt={displayName}/>
                </Link>
            </div>
            <span className={classes.userName}>
                    {displayName}
            </span>
            <div className={classes.drop}>
                <ul>
                    <li>
                        <Link to="/my-account">Profile</Link>
                    </li>
                </ul>
                <div className={classes.logOut}>
                    <button onClick={logOutHandler}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;