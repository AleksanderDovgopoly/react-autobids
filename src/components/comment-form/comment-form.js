import {useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {setNewAuctionBidOrComment} from "../../firebase/firebase.utils";

import classes from "./comment-form.module.css";
import 'reactjs-popup/dist/index.css';
import Popup from "reactjs-popup";
import SignIn from "../sign-in/sign-in";


const CommentForm = ({auctionId}) => {
    const {isLogin, currentUser} = useSelector(state => state.user);
    const [openPopupSignIn, setOpenPopupSignIn] = useState(false);

    const {register, handleSubmit, formState: {isDirty, isSubmitSuccessful},} = useForm({
        defaultValues: {
            auction_id: auctionId,
            author_id: currentUser.uid,
            createAt: new Date(),
            message: '',
            rep: 0,
            type: 'comment'
        }
    });


    const formSubmitHandler = async (data) => {

        if (!isLogin) {
            setOpenPopupSignIn(true);
        }

        const response = await setNewAuctionBidOrComment(data);

        console.log('Response: ', response)

        if (response === auctionId) {
            console.log('Success submit', response)
        } else {
            console.log(response)
        }
    }

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.commentForm}>
            <fieldset className={classes.formGroup}>
                <label className={isDirty ? classes.hidden : null} htmlFor="message">
                    Add a Comment...
                </label>
                <textarea className={classes.input} {...register('message', {})} autoComplete="off" rows="1" />
            </fieldset>

            <button type="submit" disabled={!isDirty}>
                <span className={classes.hidden}>Submit</span>
            </button>

            {/*ToDO:  Rebuild to global Popup*/}
            <Popup open={openPopupSignIn} >
                <SignIn />
            </Popup>
        </form>
    )
}

export default CommentForm;