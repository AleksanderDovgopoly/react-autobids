import CommentMessage from "./comment-message/comment-message";
import CommentActions from "./comment-actions/comment-actions";
import CommentBid from "./comment-bid/comment-bid";

import classes from "./comment-content.module.css";


const CommentContent = ({itemType, message, repScore, replyId, bidPrice}) => {
    return (
        <div className={classes.content}>
            {
                itemType === 'comment'
                    ? <CommentMessage message={message} replyId={replyId}/>
                    : <CommentBid bid={bidPrice}/>
            }
            <CommentActions repScore={repScore}/>
        </div>
    )
}

export default CommentContent;