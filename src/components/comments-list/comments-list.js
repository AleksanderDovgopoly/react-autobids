import {useSelector} from "react-redux";
import CommentItem from "../comment-item/comment-item";

import classes from "./comments-list.module.css";


const CommentsList = ({commentsData, usersData, setReplyToId}) => {
    const activeFilter = useSelector(state => state.detail.comments_filter);

    let sortedComments = commentsData.sort(function (x, y) {
        return y.createAt - x.createAt;
    })

    if (activeFilter === 'upvoted') {
        sortedComments = commentsData.sort(function (x, y) {
            return y.rep.length - x.rep.length;
        })
    }

    if (activeFilter === 'bids') {
        sortedComments = sortedComments.filter((comment) => {
            return comment.type === 'bid'
        })
    }

    return (
        <ul className={classes.commentsList}>
            {
                sortedComments.length
                    ? sortedComments.map((comment, index) => (
                        <CommentItem
                            key={index}
                            allComments={commentsData}
                            commentData={comment}
                            usersData={usersData}
                            setReplyToId={setReplyToId}
                        />
                    ))
                    : <p className={classes.noData}>There are no comments</p>
            }
        </ul>
    )
}

export default CommentsList;