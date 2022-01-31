import {useEffect, useState} from "react";
import {fetchUsers} from "../../firebase/firebase.utils";
import CommentForm from "../comment-form/comment-form";
import CommentsList from "../comments-list/comments-list";
import CommentFilters from "../comment-filters/comment-filters";

import classes from "./comment-box.module.css";


const CommentBox = ({auctionId}) => {
    const [isUsersFetching, setIsUsersFetching] = useState(false);
    const [usersData, setUsersData] = useState({});
    const [replyToId, setReplyToId] = useState('')

    useEffect(() => {
        async function fetchData() {
            const usersCollection = await fetchUsers();
            setUsersData(usersCollection);
            setIsUsersFetching(true);
        }

        if (!isUsersFetching) {
            fetchData();
        }
    }, [isUsersFetching])

    return (
        <div id="comment_box" className={classes.commentBox}>
            <div className={classes.heading}>
                <h3>Comments & Bids</h3>
                <CommentFilters/>
            </div>
            <CommentForm usersData={usersData} auctionId={auctionId} replyTo={replyToId} setReplyToId={setReplyToId}/>
            <CommentsList usersData={usersData} setIsUsersFetching={setIsUsersFetching} setReplyToId={setReplyToId}/>
        </div>
    )
}

export default CommentBox