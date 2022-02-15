import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getUserDataById} from "../../firebase/firebase.utils";
import UserDetailContent from "../../components/user-detail-content/user-detail-content";
import Spinner from "../../components/spinner/spinner";

import classes from "./user-detail.module.css";


const UserDetail = () => {
    const {userId} = useParams();
    const {isLoading, isError, data, error} = useQuery(['userData', userId], () => getUserDataById(userId));

    if (isLoading) return <Spinner/>;
    if (isError) return <span>{error.message}</span>;

    return (
        <div className={classes.userContainer}>
            <UserDetailContent userData={data}/>
        </div>
    )
}

export default UserDetail;