import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchAuctionById} from "../../firebase/firebase.utils";
import AuctionDetailContent from "../../components/auction-detail-content/auction-detail-content";
import Spinner from "../../components/spinner/spinner";

import classes from "./auction-detail.module.css";

const AuctionDetail = () => {
    const {auctionId} = useParams();
    const [auctionData, setAuctionData] = useState();

    useEffect(() => {
        async function fetchData () {
            const fetchingData = await fetchAuctionById(auctionId);
            setAuctionData(fetchingData);
        }

        if (!auctionData) {
            fetchData();
        }
    }, []);


    return (
        <div className={classes.auctionDetails}>
            {
                auctionData
                    ? <AuctionDetailContent item={auctionData} />
                    : <Spinner />
            }
        </div>
    )
}

export default AuctionDetail;