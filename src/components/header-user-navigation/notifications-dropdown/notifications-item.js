import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {update, getDatabase, ref} from "firebase/database";
import {fetchAuctions} from "../../../firebase/firebase.utils";
import Spinner from "../../spinner/spinner";

import classes from "./notifications-dropdown.module.css";


const NotificationsItem = ({itemData, itemKey}) => {
    const navigate = useNavigate();
    const {auction_id, status, type} = itemData;
    const userId = useSelector(state => state.user.currentUser.uid);
    const client = useQueryClient();
    const {isLoading, isError, data, error} = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (isLoading) return <Spinner/>;

    if (isError) return <p>{error.message}</p>

    const currentAuction = Object.values(data).filter(item => item.id === auction_id)[0];

    function showNotifyHandler(event) {
        event.preventDefault();
        navigate(`/auctions/${currentAuction.id}`);
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`/notifications/${userId}/${itemKey}/status`] = 'seen';
        update(dbRef, updates);
        client.invalidateQueries(['notifications', userId]);
    }

    return (
        <li className={status === 'seen' ? classes.seen : null} onClick={showNotifyHandler}>
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