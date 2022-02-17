import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCommentsByAuctionId} from "../../../../firebase/firebase.utils";
import {useAuctionCacheById} from "../../../../hooks/useAuctionCacheById";
import UsernameLink from "../../../UI/username-link/username-link";
import moment from "moment";

import classes from "./stats.module.css";


const Stats = () => {
    const {auctionId} = useParams();
    const [bidsCount, setBidsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const auctionData = useAuctionCacheById(auctionId);
    const {end_date, views} = auctionData;
    const sellerId = auctionData.seller.id;
    const {status, data} = useQuery(['comments', auctionId], () => fetchCommentsByAuctionId(auctionId));

    const formattedEndDate = moment.unix(end_date.seconds).format("MMMM D YYYY, h:mm a");

    useEffect(() => {
        if (status === 'success') {
            setBidsCount(data.filter(item => item.type === 'bid').length);
            setCommentsCount(data.filter(item => item.type === 'comment').length)
        }
    }, [status])


    return (
        <ul className={classes.stats}>
            <li>
                <div className={classes.th}>Seller</div>
                <div className={classes.td}>
                    <UsernameLink userId={sellerId}/>
                </div>
            </li>
            <li>
                <div className={classes.th}>Ending</div>
                <div className={`${classes.td} ${classes.endIcon}`}>{formattedEndDate}</div>
            </li>
            <li>
                <div className={classes.th}>Bids</div>
                <div className={`${classes.td} ${classes.bidsIcon}`}>{bidsCount}</div>
            </li>
            <li>
                <div className={classes.th}>Comments</div>
                <div className={`${classes.td} ${classes.commentsIcon}`}>{commentsCount}</div>
            </li>
            <li>
                <div className={classes.th}>Views</div>
                <div className={`${classes.td} ${classes.viewsIcon}`}>{views}</div>
            </li>
        </ul>
    )
}

export default Stats;