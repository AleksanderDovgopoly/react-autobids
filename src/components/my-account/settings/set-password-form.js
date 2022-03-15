import {useEffect, useState} from "react";
import SetPasswordFormInput from "./set-password-form-input";
import {updateUserAuthPassword} from "../../../firebase/firebase.utils";
import classes from "./set-password-form.module.css";


const formFields = {
    current: '',
    new_password: '',
    confirm_password: ''
};

const SetPasswordForm = () => {
    const [isFieldEmpty, setIsFieldEmpty] = useState(false);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
    const [newPasswordError, setNewPasswordError] = useState('');
    const [formData, setFormData] = useState(formFields);
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        const poorRegExp = /[a-z]/;
        const weakRegExp = /(?=.*?[0-9])/;
        const whitespaceRegExp = /^$|\s+/;
        const passwordLength = formData.new_password.length;
        const poorPassword = poorRegExp.test(formData.new_password);
        const weakPassword = weakRegExp.test(formData.new_password);
        const whiteSpace = whitespaceRegExp.test(formData.new_password);

        if (passwordLength === 0) {
            setNewPasswordError('Empty password');
            return;
        }

        if (passwordLength < 6) {
            setNewPasswordError('Short password');
        } else {
            setNewPasswordError('');
            if (!poorPassword) {
                setNewPasswordError('Poor password');
            }
            if (!weakPassword) {
                setNewPasswordError('Weak password');
            }
            if (whiteSpace) {
                setNewPasswordError('Spaces are not allowed')
            }
        }
    }, [formData])

    const submitSetPassForm = async (event) => {
        event.preventDefault();
        const {current, new_password, confirm_password} = formData;

        if (current === '' || new_password === '' || confirm_password === '') {
            setIsFieldEmpty(true);
            return;
        } else {
            setIsFieldEmpty(false);
        }

        if (new_password === confirm_password) {
            setIsPasswordsMatch(true);
        } else {
            setIsPasswordsMatch(false);
            return;
        }

        const response = await updateUserAuthPassword(new_password);
        setSubmitStatus(response);
    }

    return (
        <form className={classes.formSetPassword} onSubmit={submitSetPassForm}>
            <SetPasswordFormInput
                inputName="Current password"
                inputSlug="current"
                formData={formData}
                setFormData={setFormData}
            />
            <SetPasswordFormInput
                inputName="New password"
                inputSlug="new_password"
                formData={formData}
                setFormData={setFormData}
                newPasswordError={newPasswordError}
            />
            <SetPasswordFormInput
                inputName="Re-enter new password"
                inputSlug="confirm_password"
                formData={formData}
                setFormData={setFormData}
            />
            {
                isFieldEmpty
                    ? <p className="text-danger">All fields required</p>
                    : null
            }
            {
                !isPasswordsMatch
                    ? <p className="text-danger">Passwords do not match</p>
                    : null
            }
            {
                submitStatus === ''
                    ? <button type="submit" className="btn btn-primary ">Change password</button>
                    : <span className="st-complete">{submitStatus}</span>
            }
        </form>
    )
}

export default SetPasswordForm