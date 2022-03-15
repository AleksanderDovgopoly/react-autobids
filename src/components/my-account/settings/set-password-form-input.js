import {useRef} from "react";
import classes from "./set-password-form.module.css";

const SetPasswordFormInput = ({inputSlug, inputName, formData, setFormData, newPasswordError}) => {
    const inputRef = useRef();

    function toggleInputType() {
        const currentType = inputRef.current.type;
        if (currentType === 'password') {
            inputRef.current.type = 'text'
        } else {
            inputRef.current.type = 'password'
        }
    }

    const onChangeHandler = (event) => {
        const {value} = event.target;
        setFormData({...formData, [inputSlug]: value});
    }

    return (
        <fieldset>
            <label
                htmlFor={inputSlug}
            >
                {inputName}
            </label>
            {
                newPasswordError !== '' ? <span className="st-prompt">{newPasswordError}</span> : null
            }
            <div className={classes.showHideWrap}>
                <input id={inputSlug} type="password" ref={inputRef} onChange={onChangeHandler}/>
                <button
                    type="button"
                    className={classes.showPass}
                    onClick={toggleInputType}
                >
                    <span>show</span>
                </button>
            </div>
        </fieldset>
    )
}

export default SetPasswordFormInput;