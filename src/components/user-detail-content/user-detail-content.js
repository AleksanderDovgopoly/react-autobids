import {useEffect, useState} from "react";
import {getCommentsAndBidsByUserId} from "../../firebase/firebase.utils";
import UserDetailSummary from "../user-detail-summary/user-detail-summary";
import UserDetailAuctioned from "../user-detail-auctioned/user-detail-auctioned";
import UserDetailBidHistory from "../user-detail-bid-history/user-detail-bid-history";
import Spinner from "../spinner/spinner";

import classes from "./user-detail-content.module.css";


const UserDetailContent = ({userData, userId}) => {
    const [isCommentsFetching, setIsCommentsFetching] = useState(false);
    const [userBidsArr, setUserBidsArr] = useState([]);
    const [userCommentsArr, setUserCommentsArr] = useState([]);

    // ToDo: User comments list

    useEffect(async () => {
        const fetchUserCommentsAndBids = await getCommentsAndBidsByUserId(userId);
        setUserBidsArr(Object.values(fetchUserCommentsAndBids).filter(item => item.type === 'bid'));
        setUserCommentsArr(Object.values(fetchUserCommentsAndBids).filter(item => item.type === 'comment'));
        setIsCommentsFetching(true);
    }, [userId]);

    return (
        <div className={classes.userContainer}>
            <UserDetailSummary userData={userData}/>
            <UserDetailAuctioned userId={userId} />
            {
                isCommentsFetching
                    ? <UserDetailBidHistory userBids={userBidsArr}/>
                    : <Spinner/>
            }

        </div>
    )
}

export default UserDetailContent;