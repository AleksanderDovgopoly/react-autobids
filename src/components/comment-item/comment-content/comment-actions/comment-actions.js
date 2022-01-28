import {useDispatch, useSelector} from "react-redux";
import {togglePopupAuth} from "../../../../redux/user/user.actions";
import {isUserAlreadyVoted} from "../../../../helpers/auction-functions";
import {updateCommentVotesById, updateUserVotesById} from "../../../../firebase/firebase.utils";
import {updateCommentVote} from "../../../../redux/auction-detail/auction-detail.actions";

import classes from "./comment-actions.module.css";


const CommentActions = ({commentId, authorId, repScore, refetchUser}) => {
    const {isLogin, currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const isUserVoted = isUserAlreadyVoted(repScore, currentUser.uid);

    async function setCommentVote() {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }

        try {
            await updateCommentVotesById(commentId, currentUser.uid);
            await updateUserVotesById(authorId, currentUser.uid);
            dispatch(updateCommentVote(commentId, currentUser.uid));
            refetchUser(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.actions}>
            <button
                className={classes.upvote}
                onClick={() => setCommentVote()}
                disabled={isUserVoted}
            >
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
                {repScore.length}
            </button>
            <button className={classes.reply}>
                Reply
            </button>
        </div>
    )
}

export default CommentActions;