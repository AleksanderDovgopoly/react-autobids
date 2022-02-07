import {useRef} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import UserDetailSummary from "../../components/user-detail-content/user-detail-summary/user-detail-summary";
import PopupEditMyAccount from "../../components/popup-edit-my-account/popup-edit-my-account";

import classes from "./my-account.module.css";


const MyAccount = () => {
    const {currentUser, isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();
    const ref = useRef();
    const closePopup = () => ref.current.close();

    if (!isLogin) {
        return navigate('/sign-in')
    }

    return (
        <div className={classes.myAccount}>
            <UserDetailSummary userData={currentUser}/>
            <Popup
                ref={ref}
                trigger={<button className='btn btn-secondary'>Edit profile</button>}
                modal
                contentStyle={{width: '580px', maxWidth: '580px'}}
            >
                <PopupEditMyAccount closePopup={closePopup} />
            </Popup>
        </div>
    )
}

export default MyAccount