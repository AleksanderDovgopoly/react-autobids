import {useDispatch} from "react-redux";
import {getAuth, signInWithPopup} from "firebase/auth";
import firebase from "firebase/compat/app";
import {setCurrentUser} from "../../../redux/user/user.actions";
import {createUserProfileDocument} from "../../../firebase/firebase.utils";
import CustomButton from "../../custom-button/custom-button";

import classes from "./auth-socials.module.css";


const AuthSocials = ({closePopup}) => {
    const dispatch = useDispatch();

    const signInWithPopupHandle = async event => {
        event.preventDefault();

        const auth = getAuth();
        const provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                dispatch(setCurrentUser(user));
                closePopup();
                createUserProfileDocument(user);
            }).catch((error) => {
            console.log('Sign In Error', error)
        });
    };

    return (
        <div className={classes.authSocialsBlock}>
            <CustomButton type='button' onClick={signInWithPopupHandle} isGoogleSignIn>
                Sign in with Google
            </CustomButton>
        </div>
    )
}

export default AuthSocials;