import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useQuery} from "react-query";
import {bidCountFromCommentsList} from "../../../helpers/auction-functions";
import {fetchCommentsByAuctionId} from "../../../firebase/firebase.utils";

import classes from "./stats-bids-counter.module.css";

const StatsBidsCounter = () => {
    const [bidsCount, setBidsCount] = useState(0);
    const auctionId = useSelector(state => state.detail.fetchingId);
    const {status, data} = useQuery(['comments', auctionId], () => fetchCommentsByAuctionId(auctionId));

    useEffect(() => {
        if (status === 'success') {
            setBidsCount(bidCountFromCommentsList(data));
        }
    }, [status])


    return (
        <div className={classes.bidsCounter}>
            <span>Bids: </span>
            {bidsCount}
        </div>
    )
}

export default StatsBidsCounter;