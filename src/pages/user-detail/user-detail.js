import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserDetailSummary from "../../components/user-detail-summary/user-detail-summary";
import {getUserDataById} from "../../firebase/firebase.utils";

import classes from "./user-detail.module.css";


const UserDetail = () => {
    const {userId} = useParams();
    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function fetchUserData() {
            const fetchingData = await getUserDataById(userId);
            return fetchingData;
        }

        if (!userData.length) {
            const user = fetchUserData()
            setUserData(user);
        }
    }, []);

    console.log('State: ', userData)

    return (
        <div className={classes.userContainer}>
            <UserDetailSummary/>
        </div>
    )
}

export default UserDetail;