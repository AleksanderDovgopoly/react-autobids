import {useEffect, useState} from "react";
import {fetchUsers} from "../../firebase/firebase.utils";
import CommentItem from "../comment-item/comment-item";

import classes from "./comments-list.module.css";


const CommentsList = ({commentsList}) => {
    const [isUsersFetching, setIsUsersFetching] = useState(false);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const usersCollection = await fetchUsers();
            setUsersData(usersCollection);
            setIsUsersFetching(true);
        }

        if (!isUsersFetching) {
            fetchData();
        }
    }, [])

    return (
        <ul className={classes.commentsList}>
            {
                commentsList.length
                    ? commentsList.map((comment, index) => (
                        <CommentItem key={index} commentData={comment} usersData={usersData}/>
                    ))
                    : <p className={classes.noData}>There are no comments</p>
            }
        </ul>
    )
}

export default CommentsList;