import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getDatabase, ref, child, get} from "firebase/database";
import NotificationsContent from "./notifications-content";

import classes from "./notifications-dropdown.module.css";


const NotificationsContainer = () => {
    const userId = useSelector(state => state.user.currentUser.uid);
    const [notifyData, setNotifyData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (isFetching) return;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/notifications/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setNotifyData(snapshot.val());
                setIsFetching(true);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userId, isFetching]);

    return (
        <div className={classes.notifyContainer}>
            {
                notifyData.length === 0
                    ? <div className={classes.empty}>No notifications yet</div>
                    : <NotificationsContent notifyData={notifyData} refetchData={setIsFetching}/>
            }

        </div>
    )
}

export default NotificationsContainer;