import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAuthorNameByCommentId} from "../../../../helpers/auction-functions";
import classes from "./comment-message.module.css";


const CommentMessage = ({message, replyId, usersData}) => {
    const comments = useSelector(state => state.detail.comments_n_bids);
    const [replyAuthorName, setAuthorName] = useState('');

    useEffect(() => {
        if (Object.keys(usersData).length && replyId !== undefined) {
            setAuthorName(() => getAuthorNameByCommentId(replyId, comments, usersData))
        }
    }, [usersData])

    return (
        <div className={classes.message}>
            {
                replyId !== undefined
                    ? <button className={classes.replyTo} data-to_id={replyId}
                              onClick={() => document.querySelector(`[data-id=${replyId}]`).scrollIntoView({behavior: "smooth"})}
                    >
                        Re: {replyAuthorName}
                    </button>
                    : null
            }
            <p>{message}</p>
        </div>
    )
}

export default CommentMessage;