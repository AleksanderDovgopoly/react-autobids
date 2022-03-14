import {useDispatch} from "react-redux";
import {getAuth, deleteUser} from "firebase/auth";
import {removeAccountById} from "../../../firebase/firebase.utils";
import {clearCurrentUser} from "../../../redux/user/actions";

import classes from "./settings.module.css";
import Popup from "reactjs-popup";
import PopupSetPassword from "./popupSetPassword";


const MyAccountSettings = ({userData}) => {
    const {uid, email} = userData;
    const dispatch = useDispatch();

    const removeUserHandler = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        await deleteUser(user).then(() => {
            console.log('Auth delete')
        }).catch((error) => {
            console.log('Some problem with delete Auth')
        });
        dispatch(clearCurrentUser());
        await removeAccountById(uid);
        console.log('Complete')
    }

    return (
        <div className={classes.accountSettings}>
            <h1>Settings</h1>
            <div className={classes.section}>
                <h2>Account</h2>
                <div className={classes.flexColumn}>
                    <span>Linked accounts</span>
                    <div className={classes.accountAction}>
                        <div>{email}</div>
                        <button
                            className="btn btn-secondary"
                            onClick={removeUserHandler}
                        >
                            Remove account
                        </button>
                    </div>
                    <span>Password</span>
                    <div className={classes.accountAction}>
                        <div className={classes.pass}>Non set</div>
                        <PopupSetPassword />
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <h2>Payment info for bidding</h2>
                <button type="button" className="btn btn-primary">Register to bid</button>
            </div>
        </div>
    )
}

export default MyAccountSettings;