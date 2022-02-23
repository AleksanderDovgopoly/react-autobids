import {useDispatch} from "react-redux";
import {useState} from "react";
import {auth, getUserDataById} from "../../../firebase/firebase.utils";
import {setCurrentUser} from "../../../redux/user/actions";
import FormInput from "../../form-input/form-input";
import CustomButton from "../../custom-button/custom-button";

import classes from "./auth-email.module.css";


const AuthEmail = ({closePopup}) => {
    const dispatch = useDispatch();
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await auth.signInWithEmailAndPassword(email, password);
            const localUserData = await getUserDataById(response.user.uid);
            dispatch(setCurrentUser(localUserData));
            setUserCredentials({email: '', password: ''});
            closePopup();
        } catch (error) {
            console.log('SignIn error: ', error)
        }
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    };

    return (
        <div className={classes.authEmail}>
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
                <CustomButton type='submit'> Sign in </CustomButton>
            </form>
        </div>
    )
}

export default AuthEmail;