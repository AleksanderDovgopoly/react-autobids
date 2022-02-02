import UserCommentsItem from "../user-comments-item/user-comments-item";
import classes from "./user-comments-list.module.css";

const UserCommentsList = ({comments}) => {
    return (
        <ul className={classes.commentsList}>
            {
                comments.map(comment => (
                    <UserCommentsItem key={comment.id} commentData={comment}/>
                ))
            }
        </ul>
    )
}

export default UserCommentsList;