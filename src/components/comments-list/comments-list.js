import {useParams} from "react-router-dom";
import {useAuctionCacheById} from "../../hooks/useAuctionCacheById";
import CommentItem from "../comment-item/comment-item";
import classes from "./comments-list.module.css";


const CommentsList = ({commentsData, usersData, setReplyToId, activeCommentFilter}) => {
    const {auctionId} = useParams();
    const currentAuction = useAuctionCacheById(auctionId);
    const sellerId = currentAuction.seller.id;

    let sortedComments = commentsData.sort(function (x, y) {
        return y.createAt - x.createAt;
    })

    if (activeCommentFilter === 'upvoted') {
        sortedComments = commentsData.sort(function (x, y) {
            return y.rep.length - x.rep.length;
        })
    }

    if (activeCommentFilter === 'seller') {
        sortedComments = commentsData.filter((comment) => {
            return comment.author_id === sellerId;
        })
    }

    if (activeCommentFilter === 'bids') {
        sortedComments = sortedComments.filter((comment) => {
            return comment.type === 'bid'
        })
    }

    return (
        <ul className={classes.commentsList}>
            {
                sortedComments.length
                    ? sortedComments.map((comment, index) => (
                        <CommentItem
                            key={index}
                            allComments={commentsData}
                            commentData={comment}
                            usersData={usersData}
                            setReplyToId={setReplyToId}
                        />
                    ))
                    : <p className={classes.noData}>There are no comments</p>
            }
        </ul>
    )
}

export default CommentsList;