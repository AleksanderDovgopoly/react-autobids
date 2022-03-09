import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import UserDetailSummary from "../../components/user-detail-content/user-detail-summary/user-detail-summary";
import MyAccountNavigation from "../../components/sidebars/my-account-navigation/my-account-navigation";
import MyAccountListings from "../../components/my-account/listings/listings";
import MyAccountSettings from "../../components/my-account/settings/settings";

import classes from "./my-account.module.css";


const MyAccount = () => {
    const {breakpoint} = useParams();
    const {currentUser, isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();
    let content;

    if (!isLogin) {
        return navigate('/sign-in')
    }

    if (breakpoint === 'listings') {
        content = <MyAccountListings/>
    } else if (breakpoint === 'settings') {
        content = <MyAccountSettings/>
    } else {
        content = <UserDetailSummary userData={currentUser} isEditable={true}/>
    }

    return (
        <div className={classes.withSidebar}>
            <div className={classes.sidebar}>
                <MyAccountNavigation/>
            </div>
            <div className={classes.accountContent}>
                {content}
            </div>
        </div>
    )
}

export default MyAccount