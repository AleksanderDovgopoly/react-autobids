import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import UserDetailSummary from "../../components/user-detail-content/user-detail-summary/user-detail-summary";
import MyAccountNavigation from "../../components/sidebars/my-account-navigation/my-account-navigation";

import classes from "./my-account.module.css";


const MyAccount = () => {
    const {breakpoint} = useParams();
    const {currentUser, isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();

    if (!isLogin) {
        return navigate('/sign-in')
    }

    return (
        <div className={classes.withSidebar}>
            <div className={classes.sidebar}>
                <MyAccountNavigation/>
            </div>
            <UserDetailSummary userData={currentUser}/>
        </div>
    )
}

export default MyAccount