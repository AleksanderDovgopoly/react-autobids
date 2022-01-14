import UserDetailSummary from "../user-detail-summary/user-detail-summary";
import UserDetailAuctioned from "../user-detail-auctioned/user-detail-auctioned";
import UserDetailBidHistory from "../user-detail-bid-history/user-detail-bid-history";

import classes from "./user-detail-content.module.css";


const UserDetailContent = (props) => {
    const {userData, userId} = props;

    return (
        <div className={classes.userContainer}>
            <UserDetailSummary userData={userData}/>
            <UserDetailAuctioned userId={userId} />
            <UserDetailBidHistory userId={userId} />
        </div>
    )
}

export default UserDetailContent;