import {useDispatch, useSelector} from "react-redux";
import {isUserAlreadyVoted} from "../../../../../helpers/auction-functions";
import {togglePopupAuth} from "../../../../../redux/user/user.actions";
import {updateCommentVotesById, updateUserVotesById} from "../../../../../firebase/firebase.utils";
import {updateCommentVote} from "../../../../../redux/auction-detail/auction-detail.actions";

import classes from "./comment-upvote-button.module.css";


const CommentUpvoteButton = ({commentId, repScore, authorId, refetchUser}) => {
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
            if (refetchUser !== undefined) {
                refetchUser(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
    )
}

export default CommentUpvoteButton;