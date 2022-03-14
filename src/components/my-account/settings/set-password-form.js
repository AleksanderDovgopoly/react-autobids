import SetPasswordFormInput from "./set-password-form-input";
import classes from "./set-password-form.module.css";

const SetPasswordForm = () => {
    return (
        <form className={classes.formSetPassword}>
            <SetPasswordFormInput inputName="Current password" inputSlug="current"/>
            <SetPasswordFormInput inputName="New password" inputSlug="new_password"/>
            <SetPasswordFormInput inputName="Re-enter new password" inputSlug="confirm_password"/>
            <button type="submit" className="btn btn-primary ">Change password</button>
        </form>
    )
}

export default SetPasswordForm