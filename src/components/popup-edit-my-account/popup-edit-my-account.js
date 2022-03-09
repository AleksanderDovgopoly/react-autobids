import {useRef} from "react";
import EditAccountForm from "./edit-account-form";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

import classes from "./popup-edit-my-account.module.css";


const PopupEditMyAccount = () => {
    const ref = useRef();
    const closePopup = () => ref.current.close();

    return (
        <Popup
            ref={ref}
            trigger={<button className='btn btn-secondary'>Edit profile</button>}
            modal
            contentStyle={{width: '580px', maxWidth: '580px'}}
        >
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
        </Popup>
    )
}

export default PopupEditMyAccount