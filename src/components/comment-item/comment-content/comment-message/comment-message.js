import classes from "./comment-message.module.css";

const CommentMessage = ({message}) => {
    return (
        <div className={classes.message}>
            <p>{message}</p>
        </div>
    )
}

export default CommentMessage;