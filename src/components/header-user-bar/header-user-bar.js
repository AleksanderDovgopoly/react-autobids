import {Fragment} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserNavigation from "../header-user-navigation/header-user-navigation";

const UserBar = () => {
    const isLogin = useSelector((state => state.user.isLogin));

    return (
        <Fragment>
            {
                isLogin
                    ? <UserNavigation/>
                    : <Link
                        className="btn btn-primary signInBtn"
                        to='sign-in'
                        style={{margin: "1rem 1.5rem"}}
                    >
                        Sign In
                    </Link>
            }
        </Fragment>
    )
}

export default UserBar