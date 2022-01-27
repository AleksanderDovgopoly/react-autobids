import AuthSocials from "./auth-socials/auth-socials";
import AuthEmail from "./auth-email/auth-email";
import classes from "./popup-auth.module.css";


const PopupAuth = ({closePopup}) => {
    return (
        <div className={classes.modalAuth}>
            <div className={classes.modalHeader}>
                <button type="button" className={classes.close} onClick={closePopup}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className={classes.modalBody}>
                <h5>Sign in</h5>
                <AuthSocials closePopup={closePopup}/>
                <div className={classes.authDivider}><span>or</span></div>
                <AuthEmail closePopup={closePopup}/>
            </div>
        </div>
    )
}

export default PopupAuth;