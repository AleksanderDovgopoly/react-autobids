import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserInfo from "../header-user-info/header-user-info";

import classes from "./header-user-bar.module.css";


const UserBar = () => {
    const isLogin = useSelector((state => state.user.isLogin));

    return (
        <div className={classes.userBar}>
            {
                isLogin
                    ? <UserInfo />
                    : <Link className="btn btn-primary signInBtn" to='sign-in'>Sign In</Link>
            }
        </div>
    )
}

export default UserBar