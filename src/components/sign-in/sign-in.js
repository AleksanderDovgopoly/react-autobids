import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import firebase from "firebase/compat/app";
import {getAuth, signInWithPopup} from "firebase/auth";
import {setCurrentUser} from "../../redux/user/user.actions";

import CustomButton from "../custom-button/custom-button";
import FormInput from "../form-input/form-input";

import classes from "./sign-in.module.css";


const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;


    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await auth.signInWithEmailAndPassword(email, password);
            dispatch(setCurrentUser(response.user));
            setUserCredentials({email: '', password: ''});
            navigate('/my-account')
        } catch (error) {
            console.log('SignIn error: ', error)
        }
    };

    const signInWithPopupHandle = async event => {
        event.preventDefault();

        const auth = getAuth();
        const provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                dispatch(setCurrentUser(user));
                createUserProfileDocument(user);
                navigate('/my-account');

            }).catch((error) => {
            console.log('Sign In Error', error)
        });
    };

    const handleChange = event => {
        const {value, name} = event.target;

        setUserCredentials({...userCredentials, [name]: value});
    };

    return (
        <div className={classes.SignIn}>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton type='button' onClick={signInWithPopupHandle} isGoogleSignIn> Sign in with
                        Google </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;