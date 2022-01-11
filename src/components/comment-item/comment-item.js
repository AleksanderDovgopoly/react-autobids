import ButtonMailto from "../button-mailto/button-mailto";

import classes from "./comment-item.module.css";


const CommentItem = (props) => {
    const {commentText, commentDate, user} = props.commentData;


    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    return (
        <div className={classes.commentItem}>
            <div className={classes.commentText}>{commentText}</div>
            <div className={classes.commentFooter}>
                <div className={classes.info}>
                                <span className={classes.author}>
                                    {
                                        user.email
                                            ? <ButtonMailto label={user.name} mailto={user.email}/>
                                            : <span>{user.name}</span>
                                    }

                                </span>
                    <span className={classes.date}>{timeConverter(commentDate)}</span>
                </div>

                <div className="comment-actions">
                    <a href="#">Reply</a>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;