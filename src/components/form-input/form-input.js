import classes from './form-input.module.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className={classes.group}>
        <input className={classes.formInput} onChange={handleChange} {...otherProps} />
        {label ? (
            <label
                className={classes.formInputLabel}
            >
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInput;
