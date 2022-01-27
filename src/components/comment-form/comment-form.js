import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewAuctionBidOrComment} from "../../firebase/firebase.utils";
import {togglePopupAuth} from "../../redux/user/user.actions";

import classes from "./comment-form.module.css";


const CommentForm = ({auctionId, refetchComments}) => {
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector(state => state.user);

    const {register, handleSubmit, formState: {isDirty}, setValue, reset} = useForm({
        defaultValues: {
            auction_id: auctionId,
            author_id: currentUser.uid,
            createAt: new Date(),
            message: '',
            rep: 0,
            type: 'comment'
        }
    });

    useEffect(() => {
        if (currentUser.uid) {
            setValue('author_id', currentUser.uid)
        }
    }, [currentUser])


    const formSubmitHandler = async (data) => {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }

        const response = await setNewAuctionBidOrComment(data);

        if (response === 'success') {
            reset();
            refetchComments(true);
        } else {
            console.log('Submit comment Error')
        }
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.commentForm}>
            <fieldset className={classes.formGroup}>
                <label className={isDirty ? classes.hidden : null} htmlFor="message">
                    Add a Comment...
                </label>
                <textarea className={classes.input} {...register('message', {})} autoComplete="off" rows="1"/>
            </fieldset>
            <button type="submit" disabled={!isDirty}>
                <span className={classes.hidden}>Submit</span>
            </button>
        </form>
    )
}

export default CommentForm;