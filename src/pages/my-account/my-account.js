import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserDetailSummary from "../../components/user-detail-summary/user-detail-summary";

import classes from "./my-account.module.css";


const MyAccount = () => {
    const {currentUser, isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!isLogin) {
        return navigate('/sign-in')
    }

    return (
        <div className={classes.myAccount}>
            <UserDetailSummary userData={currentUser}/>
        </div>
    )
}

export default MyAccount