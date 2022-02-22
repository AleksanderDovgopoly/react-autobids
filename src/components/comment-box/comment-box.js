import {useState} from "react";
import {useQuery} from "react-query";
import {fetchCommentsByAuctionId, fetchUsers} from "../../firebase/firebase.utils";
import CommentForm from "../comment-form/comment-form";
import CommentsList from "../comments-list/comments-list";
import CommentFilters from "../comment-filters/comment-filters";
import Spinner from "../spinner/spinner";

import classes from "./comment-box.module.css";


const CommentBox = ({auctionId}) => {
    const [replyToId, setReplyToId] = useState('');
    const commentsQuery = useQuery(['comments', auctionId], () => fetchCommentsByAuctionId(auctionId));
    const usersQuery = useQuery('users', fetchUsers);
    const [activeCommentFilter, setActiveCommentFilter] = useState('newest');

    if (usersQuery.isLoading || commentsQuery.isLoading) {
        return <Spinner/>;
    }

    if (usersQuery.isError || commentsQuery.isError) {
        return <span>Error: {usersQuery.error.message}</span>
    }

    return (
        <div id="comment_box" className={classes.commentBox}>
            <div className={classes.heading}>
                <h3>Comments & Bids</h3>
                <CommentFilters
                    activeCommentFilter={activeCommentFilter}
                    setActiveCommentFilter={setActiveCommentFilter}
                />
            </div>
            <CommentForm
                commentsData={commentsQuery.data}
                usersData={usersQuery.data}
                auctionId={auctionId}
                replyTo={replyToId}
                setReplyToId={setReplyToId}
            />
            <CommentsList
                activeCommentFilter={activeCommentFilter}
                commentsData={commentsQuery.data}
                usersData={usersQuery.data}
                setReplyToId={setReplyToId}
            />
        </div>
    )
}

export default CommentBox