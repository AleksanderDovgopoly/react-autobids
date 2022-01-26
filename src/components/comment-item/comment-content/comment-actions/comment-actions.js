import classes from "./comment-actions.module.css";

const CommentActions = ({repScore}) => {
    return (
        <div className={classes.actions}>
            <button className={classes.upvote}>
                <svg className="reputation"
                     width="8" height="10"
                     viewBox="0 0 11 13"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-labelledby="ir-profile-rep"
                >
                    <title id="ir-profile-rep">Reputation Icon</title>
                    <path d="M5.125 1V12" stroke="#828282" strokeWidth="1.75" strokeLinecap="round"
                          strokeLinejoin="round"></path>
                    <path d="M1 5.125L5.125 1L9.25 5.125" stroke="#828282" strokeWidth="1.75" strokeLinecap="round"
                          strokeLinejoin="round"></path>
                </svg>
                {repScore}
            </button>
            <button className={classes.reply}>
                Reply
            </button>
        </div>
    )
}

export default CommentActions;