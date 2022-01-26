import classes from "./comment-bid.module.css";

const CommentBid = ({bid}) => {
    return (
        <div className={classes.price}>
            Bid:
            <span>${bid}</span>
        </div>
    )
}

export default CommentBid;