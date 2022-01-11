import classes from "./comments-list.module.css";
import CommentItem from "../comment-item/comment-item";


const CommentsList = (props) => {
    const {commentsList} = props;

    return (
        <div className={classes.commentsList}>
            {
                commentsList.length
                    ? commentsList.map((comment, index) => (
                        <CommentItem key={index} commentData={comment}/>
                    ))
                    : <p>There are no comments</p>
            }
        </div>
    )
}

export default CommentsList;