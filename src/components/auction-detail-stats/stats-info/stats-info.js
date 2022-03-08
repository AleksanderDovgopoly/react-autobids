import {useParams} from "react-router-dom";
import {useAuctionCacheById} from "../../../hooks/useAuctionCacheById";
import {getBidsByAuctionId} from "../../../firebase/firebase.utils";
import {Fragment, useEffect, useState} from "react";
import Stats from "./stats/stats";
import UsernameLink from "../../UI/username-link/username-link";

import classes from "./stats-info.module.css";


const StatsInfo = () => {
    const {auctionId} = useParams();
    const {start_price} = useAuctionCacheById(auctionId);
    const [auctionBids, setAuctionBids] = useState('');
    const [currentBidData, setCurrentBidData] = useState(null);

    useEffect(async () => {
        if (auctionBids === '' || auctionBids !== auctionId) {
            const fetchData = await getBidsByAuctionId(auctionId);
            if (Object.keys(fetchData).length !== 0) {
                setAuctionBids(fetchData);
                setCurrentBidData(fetchData[0]);
            }
        }
    }, [auctionId]);

    return (
        <div className={classes.statsInfo}>
            <div className={classes.infoWrapper}>
                <div className={classes.bidder}>
                    {
                        currentBidData !== null
                            ? <Fragment>
                                <h4>Current Bid</h4>
                                <UsernameLink userId={currentBidData.author_id}/>
                            </Fragment>
                            : <span>There have been no bids yet</span>
                    }
                </div>
                <div className={classes.currentBid}>
                    <span className={classes.dollar}>$</span>
                    {
                        currentBidData !== null
                            ? currentBidData.bid_price
                            : start_price
                    }
                </div>
            </div>
            <Stats/>
        </div>
    )
}

export default StatsInfo;