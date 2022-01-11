import {Fragment, useState} from "react";

import classes from "./comment-box.module.css";
import {useSelector} from "react-redux";
import {setNewAuctionComment} from "../../firebase/firebase.utils";


const CommentBox = (props) => {
    const {auctionId} = props;
    const {isLogin, currentUser} = useSelector(state => state.user);
    const [newComment, setNewComment] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    // console.log('Comment: ', newComment);
    // console.log('Author: ', commentAuthor);
    // console.log('Anonymous: ', isAnonymous);
    // console.log('User: ', currentUser);
    // console.log('---//----///---- ');

    function anonymousHandler() {
        setIsAnonymous(!isAnonymous);
        setCommentAuthor('');
    }

    async function formSubmitHandler (event) {
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
        }
    }

    return (
        <div className={classes.commentBox}>
            <h3>Asks & Comments</h3>
            <form>
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
                                />
                            </div>
                            <div className={classes.formRow}>
                                <input
                                    name="comment-anonymous"
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
                    <button type="submit" onClick={formSubmitHandler}>Add comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentBox