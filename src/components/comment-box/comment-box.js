import {useState} from "react";
import {useSelector} from "react-redux";
import CommentForm from "../comment-form/comment-form";
import CommentsList from "../comments-list/comments-list";
import BidsHistory from "../bids-history/bids-history";

import classes from "./comment-box.module.css";


const CommentBox = (props) => {
    const {auctionId} = props;
    const {comments, bids_history} = useSelector(state => state.detail.data);
    const [commentsIsActive, setCommentsActive] = useState(true);
    const [bidsIsActive, setBidsActive] = useState(false);

    function buttonsSwitchHandler() {
        setCommentsActive(!commentsIsActive);
        setBidsActive(!bidsIsActive)
    }

    return (
        <div className={classes.commentBox}>
            <div className={classes.heading}>
                <h3>Comments & Bids</h3>
                <div className={classes.headingNav}>
                    <button
                        className={commentsIsActive ? classes.btn + ' ' + classes.active : classes.btn}
                        onClick={buttonsSwitchHandler}>
                        Comments
                    </button>
                    <button
                        className={bidsIsActive ? classes.btn + ' ' + classes.active : classes.btn}
                        onClick={buttonsSwitchHandler}>
                        Bids
                    </button>
                </div>
            </div>
            <CommentForm auctionId={auctionId}/>
            {
                commentsIsActive && <CommentsList commentsList={comments}/>
            }
            {
                bidsIsActive && <BidsHistory history={bids_history}/>
            }
        </div>
    )
}

export default CommentBox