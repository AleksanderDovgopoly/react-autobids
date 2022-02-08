import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {update, getDatabase, ref} from "firebase/database";

import classes from "./notifications-dropdown.module.css";


const NotificationsItem = ({data, itemKey}) => {
    const navigate = useNavigate();
    const {auction_id, status, type} = data;
    const userId = useSelector(state => state.user.currentUser.uid);
    const auctionsData = useSelector(state => state.auctions.cars);
    const currentAuction = Object.values(auctionsData).filter(item => item.id === auction_id)[0];

    function showNotifyHandler(event) {
        event.preventDefault();
        navigate(`/auctions/${currentAuction.id}`);
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`/notifications/${userId}/${itemKey}/status`] = 'seen';
        update(dbRef, updates);
    }

    return (
        <li className={status === 'seen' && classes.seen} onClick={showNotifyHandler}>
            <div className={classes.count} aria-label="Count">
                <span>1</span>
            </div>
            <div className={classes.notifyBody}>
                {
                    type === 'ended'
                        ? <p><strong>{currentAuction.title}</strong> sold for ${currentAuction.current_price}</p>
                        : <p>Auction for the <strong>{currentAuction.title}</strong> is ending soon.</p>
                }
                <p className={classes.time}>19 hours ago</p>
            </div>
        </li>
    )
}

export default NotificationsItem;