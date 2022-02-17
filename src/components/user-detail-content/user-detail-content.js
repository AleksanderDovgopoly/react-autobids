import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions, getCommentsAndBidsByUserId} from "../../firebase/firebase.utils";
import UserDetailSummary from "./user-detail-summary/user-detail-summary";
import UserDetailAuctioned from "./user-detail-auctioned/user-detail-auctioned";
import UserDetailBidHistory from "./user-detail-bid-history/user-detail-bid-history";
import UserDetailComments from "./user-detail-comments/user-detail-comments";
import Spinner from "../spinner/spinner";

import classes from "./user-detail-content.module.css";


const UserDetailContent = ({userData}) => {
    const userId = userData.uid;
    const client = useQueryClient();
    const commentsNBids = useQuery(['userComments', userId], () => getCommentsAndBidsByUserId(userId));
    const auctions = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (commentsNBids.isLoading || auctions.isLoading) return <Spinner/>;

    if (commentsNBids.isError) return <span>Error: {commentsNBids.error.message}</span>;
    if (auctions.isError) return <span>Error: {auctions.error.message}</span>;

    const userBidsArr = Object.values(commentsNBids.data).filter(item => item.type === 'bid');
    const userCommentsArr = Object.values(commentsNBids.data).filter(item => item.type === 'comment');

    return (
        <div className={classes.userContainer}>
            <UserDetailSummary userData={userData}/>
            <UserDetailAuctioned userId={userId} auctionsData={auctions.data}/>
            <UserDetailBidHistory userBids={userBidsArr} auctionsData={auctions.data}/>
            <UserDetailComments comments={userCommentsArr}/>
        </div>
    )
}

export default UserDetailContent;