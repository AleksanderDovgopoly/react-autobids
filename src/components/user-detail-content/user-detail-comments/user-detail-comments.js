import UserCommentsList from "./user-comments-list/user-comments-list";
import classes from "./user-detail-comments.module.css";

const UserDetailComments = ({comments}) => {
    return (
        <div className={classes.userComments}>
            <h2>
                Comments
                <span>({comments.length} comments)</span>
            </h2>
            {
                comments.length
                    ? <UserCommentsList comments={comments}/>
                    : <p>There are no auctions created yet</p>
            }
        </div>
    )
}

export default UserDetailComments;