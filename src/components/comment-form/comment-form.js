import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewAuctionBidOrComment} from "../../firebase/firebase.utils";
import {togglePopupAuth} from "../../redux/user/user.actions";
import {updateAuctionComment} from "../../redux/auction-detail/auction-detail.actions";
import {getAuthorNameByCommentId} from "../../helpers/auction-functions";

import classes from "./comment-form.module.css";


const CommentForm = ({auctionId, usersData, replyTo, setReplyToId}) => {
    const comments = useSelector(state => state.detail.comments_n_bids);
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector(state => state.user);

    const {register, handleSubmit, formState: {isDirty}, setValue, reset} = useForm({
        defaultValues: {
            auction_id: auctionId,
            author_id: currentUser.uid,
            createAt: new Date(),
            message: '',
            rep: [],
            type: 'comment',
        }
    });

    useEffect(() => {
        if (currentUser.uid) {
            setValue('author_id', currentUser.uid)
        }
    }, [currentUser]);

    useEffect(() => {
        if (replyTo !== '') {
            setValue('replyTo', replyTo)
        }
    }, [replyTo]);


    const formSubmitHandler = async (data) => {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }

        const response = await setNewAuctionBidOrComment(data);

        if (response === 'success') {
            reset();
            setReplyToId('');
            dispatch(updateAuctionComment(data));
        } else {
            console.log('Submit comment Error')
        }
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.commentForm}>
            {
                replyTo !== ''
                    ? <label className={classes.replyTo}>
                        Re: {getAuthorNameByCommentId(replyTo, comments, usersData)}
                        <span onClick={() => setReplyToId('')}> </span>
                    </label>
                    : null
            }
            <fieldset className={classes.formGroup}>
                <label className={isDirty || replyTo !== '' ? classes.hidden : null} htmlFor="message">
                    Add a Comment...
                </label>
                <textarea
                    className={classes.input}
                    {...register('message', {})}
                    autoComplete="off"
                    rows="1"
                    style={replyTo !== '' ? {paddingLeft: '140px'} : null}
                />
            </fieldset>
            <button type="submit" disabled={!isDirty}>
                <span className={classes.hidden}>Submit</span>
            </button>
        </form>
    )
}

export default CommentForm;