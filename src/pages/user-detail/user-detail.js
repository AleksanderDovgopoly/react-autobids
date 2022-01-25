import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUserDataById} from "../../firebase/firebase.utils";
import UserDetailContent from "../../components/user-detail-content/user-detail-content";
import Spinner from "../../components/spinner/spinner";

import classes from "./user-detail.module.css";


const UserDetail = () => {
    const {userId} = useParams();
    const [isFetchingData, setIsFetching] = useState(false);
    const [userData, setUserData] = useState([])

    useEffect(async () => {
        if (!userData.length) {
            const fetchingData = await getUserDataById(userId);
            setUserData(fetchingData);
            setIsFetching(true);
        }
    }, [userData, userId]);

    return (
        <div className={classes.userContainer}>
            {
                isFetchingData
                    ? <UserDetailContent userId={userId} userData={userData}/>
                    : <Spinner/>
            }
        </div>
    )
}

export default UserDetail;