import {useState} from "react";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import classes from "./sign-up.module.css";


const SignUp = () => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords dont match")
            return
        }

        try {

            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, {displayName});

            setCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = event => {
        const {name, value} = event.target;

        setCredentials({...userCredentials, [name]: value})
    }

    return (
        <div className={classes.SignUp}>
            <h2 className={classes.title}>I do not have account</h2>
            <span>Sign Up with your Email and Password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    handleChange={handleChange}
                    label='Display name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    handleChange={handleChange}
                    label='Confirm password'
                    required
                />

                <CustomButton type='submit'> Sign up </CustomButton>

            </form>
        </div>
    )
}

export default SignUp;