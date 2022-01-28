import CommentUsername from "./comment-username/comment-username";
import CommentContent from "./comment-content/comment-content";
import Spinner from "../spinner/spinner";

import classes from "./comment-item.module.css";


const CommentItem = ({commentData, usersData, refetchUser}) => {
    const {id, author_id, message, createAt, rep, type, reply_id, bid_price} = commentData;
    const commentAuthor = Object.values(usersData).find(item => item.id === author_id);

    return (
        <li data-id={id} data-comment-type={type} className={classes.commentItem}>
            <div className={classes.content}>
                {
                    commentAuthor !== undefined
                        ? <CommentUsername authorData={commentAuthor} commentCreate={createAt}/>
                        : <Spinner/>
                }
                <CommentContent
                    commentId={id}
                    authorId={author_id}
                    itemType={type}
                    message={message}
                    repScore={rep}
                    replyId={reply_id}
                    bidPrice={bid_price}
                    refetchUser={refetchUser}
                />
            </div>
        </li>
    )
}

export default CommentItem;