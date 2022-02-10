import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuctionComments, fetchAuctionDetail} from "../../redux/auction-detail/auction-detail.actions";
import {fetchAuctionById, fetchCommentsByAuctionId} from "../../firebase/firebase.utils";
import AuctionDetailContent from "../../components/auction-detail-content/auction-detail-content";
import Spinner from "../../components/spinner/spinner";

import classes from "./auction-detail.module.css";


const AuctionDetail = () => {
    const dispatch = useDispatch();
    const {auctionId} = useParams();
    const {fetchingId} = useSelector(state => state.detail);
    const isFetchingCategories = useSelector(state => state.categories.isFetching);


    useEffect(() => {
        async function fetchData() {
            const fetchingData = await fetchAuctionById(auctionId);
            const fetchingComments = await fetchCommentsByAuctionId(auctionId);
            dispatch(fetchAuctionComments(fetchingComments));
            dispatch(fetchAuctionDetail(fetchingData));
        }

        if (auctionId !== fetchingId) {
            fetchData();
        }

    }, [dispatch, auctionId, fetchingId]);


    return (
        <div className={classes.auctionDetails}>
            {
                auctionId === fetchingId && isFetchingCategories
                    ? <AuctionDetailContent/>
                    : <Spinner/>
            }
        </div>
    )
}

export default AuctionDetail;