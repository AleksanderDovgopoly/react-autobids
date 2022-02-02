import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import moment from "moment";
import AuctionItemHero from "../../../auction-item/auction-item-hero/auction-item-hero";
import CommentUpvoteButton
    from "../../../comment-item/comment-content/comment-actions/comment-upvote-button/comment-upvote-button";

import classes from "./user-comments-item.module.css";


const UserCommentsItem = ({commentData}) => {
    const {id, auction_id, author_id, createAt, message, rep, replyTo} = commentData;
    const auctionsList = useSelector(state => state.auctions.cars);

    const currentAuctionData = Object.values(auctionsList).find(item => item.id === auction_id);
    const currAuctionLink = `/auctions/${currentAuctionData.id}`;
    const createCommentDate = moment.unix(createAt.seconds).format("MMMM D, YYYY, h:mm a");

    return (
        <li className={classes.commentItem}>
            <div className={classes.auctionCard}>
                <AuctionItemHero itemData={currentAuctionData}/>
            </div>
            <div className={classes.metadata}>
                <div className={classes.auctionTitle}>
                    <Link to={currAuctionLink}>
                        {currentAuctionData.title}
                    </Link>
                </div>
                <div className={classes.commentCreate}>
                    {createCommentDate}
                </div>
                <div className={classes.commentText}>
                    <p>{message}</p>
                </div>
                <div className={classes.actions}>
                    <CommentUpvoteButton commentId={id} repScore={rep} authorId={author_id}/>
                </div>
            </div>
        </li>
    )
}

export default UserCommentsItem;