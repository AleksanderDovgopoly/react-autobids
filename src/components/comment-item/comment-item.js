import CommentUsername from "./comment-username/comment-username";
import CommentContent from "./comment-content/comment-content";
import Spinner from "../spinner/spinner";

import classes from "./comment-item.module.css";


const CommentItem = ({allComments, commentData, usersData, setReplyToId}) => {
    const {id, author_id, message, createAt, rep, type, replyTo, bid_price} = commentData;
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
                    allComments={allComments}
                    commentId={id}
                    authorId={author_id}
                    itemType={type}
                    message={message}
                    repScore={rep}
                    replyId={replyTo}
                    bidPrice={bid_price}
                    setReplyToId={setReplyToId}
                    usersData={usersData}
                />
            </div>
        </li>
    )
}

export default CommentItem;