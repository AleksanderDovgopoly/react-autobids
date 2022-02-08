import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getDatabase, ref, child, get} from "firebase/database";
import NotificationsContent from "./notifications-content";

import classes from "./notifications-dropdown.module.css";


const NotificationsContainer = () => {
    const userId = useSelector(state => state.user.currentUser.uid);
    const [notifyData, setNotifyData] = useState([]);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/notifications/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setNotifyData(snapshot.val());
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userId]);

    return (
        <div className={classes.notifyContainer}>
            {
                notifyData !== []
                    ? <NotificationsContent notifyData={notifyData}/>
                    : <div className={classes.empty}>No notifications yet</div>
            }

        </div>
    )
}

export default NotificationsContainer;