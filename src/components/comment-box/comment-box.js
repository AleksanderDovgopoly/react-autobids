import {useEffect, useState} from "react";
import {fetchCommentsByAuctionId} from "../../firebase/firebase.utils";
import CommentForm from "../comment-form/comment-form";
import CommentsList from "../comments-list/comments-list";
import Spinner from "../spinner/spinner";

import classes from "./comment-box.module.css";


const CommentBox = ({auctionId}) => {
    const [commentsIsActive, setCommentsActive] = useState(true);
    const [bidsIsActive, setBidsActive] = useState(false);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [refetchComments, setRefetchComments] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const commentCollection = await fetchCommentsByAuctionId(auctionId);
            setCommentsData(commentCollection);
            setIsDataFetching(true);
        }

        if (!isDataFetching || refetchComments) {
            fetchData();
            setRefetchComments(false);
        }
    }, [refetchComments]);

    const sortedComments = commentsData.sort(function (x, y) {
        return y.createAt - x.createAt;
    })

    function buttonsSwitchHandler() {
        setCommentsActive(!commentsIsActive);
        setBidsActive(!bidsIsActive)
    }

    return (
        <div className={classes.commentBox}>
            <div className={classes.heading}>
                <h3>Comments & Bids</h3>
                <div className={classes.headingNav}>
                    <button
                        className={commentsIsActive ? classes.btn + ' ' + classes.active : classes.btn}
                        onClick={buttonsSwitchHandler}>
                        Comments
                    </button>
                    <button
                        className={bidsIsActive ? classes.btn + ' ' + classes.active : classes.btn}
                        onClick={buttonsSwitchHandler}>
                        Bids
                    </button>
                </div>
            </div>
            <CommentForm auctionId={auctionId} refetchComments={setRefetchComments}/>
            {
                isDataFetching ? <CommentsList refetchComments={setRefetchComments} commentsList={sortedComments} /> : <Spinner />
            }
        </div>
    )
}

export default CommentBox