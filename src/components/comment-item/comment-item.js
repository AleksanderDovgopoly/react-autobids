import moment from "moment";
import ButtonMailto from "../button-mailto/button-mailto";

import classes from "./comment-item.module.css";


const CommentItem = (props) => {
    const {commentText, commentDate, user} = props.commentData;

    const date = moment.unix(commentDate.seconds);
    const fromDate = date.from(Date.now())

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
                                            ? <ButtonMailto label={user.name} mailto={user.email}/>
                                            : <span>{user.name}</span>
                                    }
                                </span>
                    <span className={classes.date}>{fromDate}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;