import {useSelector} from "react-redux";
import CommentItem from "../comment-item/comment-item";

import classes from "./comments-list.module.css";


const CommentsList = ({usersData, setIsUsersFetching, setReplyToId}) => {
    const commentsData = useSelector(state => state.detail.comments_n_bids);
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
                            commentData={comment}
                            usersData={usersData}
                            refetchUser={setIsUsersFetching}
                            setReplyToId={setReplyToId}
                        />
                    ))
                    : <p className={classes.noData}>There are no comments</p>
            }
        </ul>
    )
}

export default CommentsList;