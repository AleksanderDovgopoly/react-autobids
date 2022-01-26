import moment from "moment";
import {Link} from "react-router-dom";

import classes from "./comment-username.module.css";


const CommentUsername = ({authorData, commentCreate}) => {
    const {id, avatar, displayName, rep_score} = authorData;
    const date = moment.unix(commentCreate.seconds);
    const fromDate = date.from(Date.now());
    let userPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c';
    if (avatar) {
        userPhoto = avatar;
    }

    return (
        <div className={classes.username}>
            <div className={classes.photo}>
                <Link className={classes.userIcon} to={`/user/${id}`}>
                    <img src={userPhoto} alt={displayName}/>
                </Link>
            </div>
            <div className={classes.text}>
                <Link className={classes.userLink} to={`/user/${id}`}>
                    {displayName}
                </Link>
                <span className={classes.rep}>
                    <svg className="reputation"
                         width="8" height="10"
                         viewBox="0 0 11 13"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         aria-labelledby="ir-profile-rep"
                    >
                        <title id="ir-profile-rep">Reputation Icon</title>
                        <path d="M5.125 1V12" stroke="#262626" strokeWidth="1.75" strokeLinecap="round"
                              strokeLinejoin="round"></path>
                        <path d="M1 5.125L5.125 1L9.25 5.125" stroke="#262626" strokeWidth="1.75" strokeLinecap="round"
                              strokeLinejoin="round"></path>
                    </svg>
                    {rep_score}
                </span>
                <span className={classes.userExtra}>
                    {fromDate}
                </span>
            </div>
        </div>
    )
}

export default CommentUsername;