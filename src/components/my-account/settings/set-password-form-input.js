import classes from "./set-password-form.module.css";
import {useRef} from "react";

const SetPasswordFormInput = ({inputSlug, inputName}) => {
    const inputRef = useRef();

    function toggleInputType() {
        const currentType = inputRef.current.type;
        if (currentType === 'password') {
            inputRef.current.type = 'text'
        } else {
            inputRef.current.type = 'password'
        }
    }

    return (
        <fieldset>
            <label
                htmlFor={inputSlug}
            >
                {inputName}
            </label>
            <div className={classes.showHideWrap}>
                <input id={inputSlug} type="password" ref={inputRef} required/>
                <button
                    type="button"
                    className={classes.showPass}
                    onClick={toggleInputType}
                >
                    <span className="sr-only">show</span>
                </button>
            </div>
        </fieldset>
    )
}

export default SetPasswordFormInput;