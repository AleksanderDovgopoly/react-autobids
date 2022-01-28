import {useState} from "react";
import {useSelector} from "react-redux";
import CommentForm from "../comment-form/comment-form";
import CommentsList from "../comments-list/comments-list";

import classes from "./comment-box.module.css";


const CommentBox = ({auctionId}) => {
    const commentsData = useSelector(state => state.detail.comments_n_bids);

    const [commentsIsActive, setCommentsActive] = useState(true);
    const [bidsIsActive, setBidsActive] = useState(false);


    const sortedComments = commentsData.sort(function (x, y) {
        return y.createAt - x.createAt;
    })

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
            <CommentsList commentsList={sortedComments}/>
        </div>
    )
}

export default CommentBox