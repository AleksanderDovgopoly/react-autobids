import {useRef} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import SetPasswordForm from "./set-password-form";
import classes from "./popupSetPassword.module.css";


const PopupSetPassword = () => {
    const ref = useRef();
    const closePopup = () => ref.current.close();

    return (
        <Popup
            ref={ref}
            trigger={<button className="btn btn-secondary">Set new password</button>}
            modal
        >
            <div className={classes.setPassModal}>
                <div className={classes.modalHeader}>
                    <h5></h5>
                    <button type="button" className={classes.close}>
                        <span aria-hidden="true" onClick={closePopup}>×</span>
                    </button>
                </div>
                <h5>Change password</h5>
                <SetPasswordForm/>
            </div>
        </Popup>
    )
}

export default PopupSetPassword;