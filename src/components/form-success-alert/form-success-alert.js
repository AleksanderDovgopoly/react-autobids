import classes from "./form-success-alert.module.css";

const FormSuccessAlert = () => {

    return (
        <div className={classes.successMessage}>
            <svg viewBox="0 0 76 76" className={classes.iconCheckmark}>
                <circle cx="38" cy="38" r="36"/>
                <path fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                      stroke-miterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
            </svg>
            <h1 className={classes.title}>Your Auction will be published soon</h1>
            <div className={classes.content}>
                <p>We will respond in approximately 15 minutes</p>
            </div>
        </div>
    )
}

export default FormSuccessAlert;