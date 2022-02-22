import classes from "./form-input-hook.module.css";

const Input = ({label, name, type, register, isRequired, errors, ...otherProps}) => {
    return (
        <label className={classes.sellInput}>{label}
            <input
                type={type || 'text'} {...register(name, {required: isRequired ? "This field is required!" : false})} {...otherProps} />
            {
                errors && errors[name]
                    ? <p className={classes.warning}>{errors[name].message || "Error!"}</p>
                    : null
            }
        </label>
    )
};

export default Input;