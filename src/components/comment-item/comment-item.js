import ButtonMailto from "../button-mailto/button-mailto";
import {timeConverter} from "../../helpers/auction-functions";

import classes from "./comment-item.module.css";


const CommentItem = (props) => {
    const {commentText, commentDate, user} = props.commentData;

    return (
        <div className={classes.commentItem}>
            <div className={classes.commentText}>{commentText}</div>
            <div className={classes.commentFooter}>
                <div className="comment-actions">
                    {/*<a href="#">Reply</a>*/}
                </div>
                <div className={classes.info}>
                                <span className={classes.author}>
                                    {
                                        user.email
                                            ? <ButtonMailto label={user.name} mailto={user.email} />
                                            : <span>{user.name}</span>
                                    }
                                </span>
                    <span className={classes.date}>{timeConverter(commentDate)}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;