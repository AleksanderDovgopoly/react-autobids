import CommentUpvoteButton from "./comment-upvote-button/comment-upvote-button";
import classes from "./comment-actions.module.css";

const CommentActions = ({commentId, authorId, repScore, refetchUser, setReplyToId}) => {

    function replyClickHandler() {
        setReplyToId(commentId);
        document.getElementById('comment_box').scrollIntoView({behavior: "smooth"});
    }

    return (
        <div className={classes.actions}>
            <CommentUpvoteButton commentId={commentId} authorId={authorId} repScore={repScore} refetchUser={refetchUser} />
            <button
                className={classes.reply}
                onClick={() => replyClickHandler()}
            >
                Reply
            </button>
        </div>
    )
}

export default CommentActions;