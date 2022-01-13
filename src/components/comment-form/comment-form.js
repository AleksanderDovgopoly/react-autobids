import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewAuctionComment} from "../../firebase/firebase.utils";
import {updateAuctionComment} from "../../redux/auction-detail/auction-detail.actions";

import classes from "./comment-form.module.css";


const CommentForm = (props) => {
    const {auctionId} = props;
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector(state => state.user);
    const [newComment, setNewComment] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    function anonymousHandler() {
        setIsAnonymous(!isAnonymous);
        setCommentAuthor('');
    }

    async function formSubmitHandler(event) {
        event.preventDefault();

        const commentData = {
            user: {
                name: 'Anonymous'
            },
            commentText: newComment,
            commentDate: new Date()
        }

        if (isLogin) {
            commentData.user.id = currentUser.uid;
            commentData.user.name = currentUser.displayName;
            commentData.user.email = currentUser.email;
        }

        if (commentAuthor) {
            commentData.user.name = commentAuthor;
            commentData.user.email = commentAuthor;
        }

        const response = await setNewAuctionComment(auctionId, commentData);

        if (response.id === auctionId) {
            setNewComment('');
            setIsAnonymous(false);
            setCommentAuthor('');
            dispatch(updateAuctionComment(commentData))
        }
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={classes.formRow}>
                    <textarea
                        className={classes.input}
                        value={newComment}
                        onChange={event => setNewComment(event.target.value)}
                        placeholder="Add a comment..."
                        required
                    />
            </div>
            {
                !isLogin && (
                    <Fragment>
                        <div className={classes.formRow}>
                            <input
                                className={classes.input}
                                type="email"
                                value={commentAuthor}
                                onChange={event => setCommentAuthor(event.target.value)}
                                placeholder="Email"
                                disabled={isAnonymous}
                                required
                            />
                        </div>
                        <div className={classes.formRow}>
                            <input
                                id="comment-anonymous"
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={anonymousHandler}
                            />
                            <label htmlFor="comment-anonymous">Anonymous</label>
                        </div>
                    </Fragment>
                )
            }
            <div className={classes.formRow}>
                <button type="submit">Add comment</button>
            </div>
        </form>
    )
}

export default CommentForm;