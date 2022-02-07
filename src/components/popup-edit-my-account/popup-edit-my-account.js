import EditAccountForm from "./edit-account-form";
import classes from "./popup-edit-my-account.module.css";

const PopupEditMyAccount = ({closePopup}) => {
    return (
        <div className={classes.editAccountModal}>
            <div className={classes.modalHeader}>
                <h5>Edit profile</h5>
                <button type="button" className={classes.close}>
                    <span aria-hidden="true" onClick={closePopup}>×</span>
                </button>
            </div>
            <div className={classes.modalBody}>
                <EditAccountForm closePopup={closePopup}/>
            </div>
        </div>
    )
}

export default PopupEditMyAccount