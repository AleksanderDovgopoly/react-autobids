import {useSelector} from "react-redux";
import UsernameLink from "../../../UI/username-link/username-link";
import moment from "moment";

import classes from "./stats.module.css";

const Stats = () => {
    const {end_date, views} = useSelector(state => state.detail.data);
    const sellerId = useSelector(state => state.detail.data.seller.id);
    const {comments_n_bids} = useSelector(state => state.detail);

    const formattedEndDate = moment.unix(end_date.seconds).format("MMMM D YYYY, h:mm a");
    const bidsCount = comments_n_bids.filter(item => item.type === 'bid').length;
    const commentsCount = comments_n_bids.filter(item => item.type === 'comment').length;

    return (
        <ul className={classes.stats}>
            <li>
                <div className={classes.th}>Seller</div>
                <div className={classes.td}>
                    <UsernameLink userId={sellerId}/>
                </div>
            </li>
            <li>
                <div className={classes.th}>Ending</div>
                <div className={`${classes.td} ${classes.endIcon}`}>{formattedEndDate}</div>
            </li>
            <li>
                <div className={classes.th}>Bids</div>
                <div className={`${classes.td} ${classes.bidsIcon}`}>{bidsCount}</div>
            </li>
            <li>
                <div className={classes.th}>Comments</div>
                <div className={`${classes.td} ${classes.commentsIcon}`}>{commentsCount}</div>
            </li>
            <li>
                <div className={classes.th}>Views</div>
                <div className={`${classes.td} ${classes.viewsIcon}`}>{views}</div>
            </li>
        </ul>
    )
}

export default Stats;