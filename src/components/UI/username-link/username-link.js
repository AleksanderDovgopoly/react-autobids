import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserDataById} from "../../../firebase/firebase.utils";

import classes from "./username-link.module.css";


const UsernameLink = ({userId}) => {
    const [userPhoto, setUserPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c')
    const [displayName, setDisplayName] = useState('No user data');

    useEffect(async () => {
        if (!userId) return;
        const fetchUserData = await getUserDataById(userId);
        if (fetchUserData.avatar) {
            setUserPhoto(fetchUserData.avatar);
        }
        setDisplayName(fetchUserData.displayName);

    }, [])

    return (
        <div className={classes.username}>
            <div className={classes.photo}>
                <Link to={`/user/${userId}`}>
                    <img src={userPhoto} alt=""/>
                </Link>
            </div>
            <div className={classes.text}>
                <Link to={`/user/${userId}`}>{displayName}</Link>
            </div>
        </div>
    )
}

export default UsernameLink;