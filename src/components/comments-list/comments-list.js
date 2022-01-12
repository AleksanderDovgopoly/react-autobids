import CommentItem from "../comment-item/comment-item";
import classes from "./comments-list.module.css";


const CommentsList = (props) => {
    const {commentsList} = props;

    commentsList.sort(function(x, y){
        return y.commentDate - x.commentDate;
    })

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