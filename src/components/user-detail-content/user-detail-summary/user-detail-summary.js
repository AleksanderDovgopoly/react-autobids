import moment from "moment";
import classes from "./user-detail-summary.module.css";

const UserDetailSummary = ({userData}) => {
    const {createdAt, metadata, displayName, email, avatar, rep_score, bio} = userData;
    let createDate = createdAt;
    if (createdAt === undefined) {
        createDate = metadata.createdAt;
    }
    const joinDate = moment.unix(createDate.seconds).format("MMMM YYYY");
    let userPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c';
    let showRep = '-';
    if (rep_score) {
        showRep = rep_score.length;
    }

    if (avatar) {
        userPhoto = avatar;
    }

    return (
        <div className={classes.userSummary}>
            <div className={classes.userHero}>
                <img src={userPhoto} alt={displayName}/>
            </div>
            <div className={classes.metadata}>
                <h1>{displayName}</h1>
                <div>
                        <span className="reputation">
                            <span className={classes.rep}>
                                <svg className="reputation"
                                     width="11" height="13"
                                     viewBox="0 0 11 13"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     aria-labelledby="ir-profile-rep">
                                    <title id="ir-profile-rep">Reputation Icon</title>
                                    <path d="M5.125 1V12" stroke="#262626"
                                          strokeWidth="1.75" strokeLinecap="round"
                                          strokeLinejoin="round"></path><path
                                    d="M1 5.125L5.125 1L9.25 5.125" stroke="#262626" strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                                </svg>
                                {showRep} </span>Reputation Score
                        </span>
                </div>
                <p><span>Email: </span>{email}</p>
                <p>Joined {joinDate || 'no data'}</p>
                <p className={classes.bio}><span>Bio: </span>{bio}</p>
            </div>
        </div>
    )
}

export default UserDetailSummary;