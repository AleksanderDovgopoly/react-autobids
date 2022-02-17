import {useSelector} from "react-redux";
import {useQuery} from "react-query";
import {fetchUserNotifications} from "../../../firebase/firebase.utils";
import NotificationsContent from "./notifications-content";
import Spinner from "../../spinner/spinner";
import classes from "./notifications-dropdown.module.css";


const NotificationsContainer = () => {
    const userId = useSelector(state => state.user.currentUser.uid);
    const {
        isLoading,
        isError,
        data,
        error,
        refetch
    } = useQuery(['notifications', userId], () => fetchUserNotifications(userId));

    if (isLoading) return <Spinner/>;

    if (isError) return <span>Error: {error.message}</span>

    return (
        <div className={classes.notifyContainer}>
            {
                data === undefined
                    ? <div className={classes.empty}>No notifications yet</div>
                    : <NotificationsContent notifyData={data} refetchData={refetch}/>
            }

        </div>
    )
}

export default NotificationsContainer;