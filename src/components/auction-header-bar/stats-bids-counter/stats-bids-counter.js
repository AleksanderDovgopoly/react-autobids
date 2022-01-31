import {useSelector} from "react-redux";
import {bidCountFromCommentsList} from "../../../helpers/auction-functions";
import classes from "./stats-bids-counter.module.css";

const StatsBidsCounter = () => {
    const {comments_n_bids} = useSelector(state => state.detail)

    return (
        <div className={classes.bidsCounter}>
            <span>Bids: </span>
            {
                bidCountFromCommentsList(comments_n_bids)
            }
        </div>
    )
}

export default StatsBidsCounter;