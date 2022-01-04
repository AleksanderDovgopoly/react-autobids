import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

import classes from "./sign-in-and-sign-up.module.css";


const SignInAndSignUpPage = () => (
    <div className={classes.signInSignUp}>
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInAndSignUpPage;
