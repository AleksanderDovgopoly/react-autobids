import {useSelector} from "react-redux";
import {bidCountFromCommentsList} from "../../../helpers/auction-functions";

const StatsBidsCounter = () => {
    const {comments_n_bids} = useSelector(state => state.detail)

    return (
        <div>
            <span>#Bids: </span>
            {
                bidCountFromCommentsList(comments_n_bids)
            }
        </div>
    )
}

export default StatsBidsCounter;