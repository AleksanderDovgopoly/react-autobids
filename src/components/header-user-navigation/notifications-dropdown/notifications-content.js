import {Fragment} from "react";
import NotificationsItem from "./notifications-item";
import classes from "./notifications-dropdown.module.css";

const NotificationsContent = ({notifyData, refetchData}) => {
    return (
        <Fragment>
            <div className={classes.heading}>
                <button>Mark All as read</button>
            </div>
            <ul>
                {
                    notifyData.map((item, index) => {
                        return <NotificationsItem key={index} itemData={item} itemKey={index} refetchData={refetchData}/>
                    })
                }
            </ul>
        </Fragment>
    )
}

export default NotificationsContent;