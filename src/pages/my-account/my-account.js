import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import classes from "./my-account.module.css";


const MyAccount = () => {
    const {currentUser, isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!isLogin) {
        return navigate('/sign-in')
    }

    const {displayName, email, uid} = currentUser;

    return (
        <div className={classes.myAccount}>
            <h2>{displayName}</h2>
            <p>{email}</p>
            <p>{uid}</p>
        </div>
    )
}

export default MyAccount