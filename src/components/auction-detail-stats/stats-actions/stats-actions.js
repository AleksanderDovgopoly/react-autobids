import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {togglePopupAuth} from "../../../redux/user/user.actions";
import Popup from "reactjs-popup";
import SetBidBar from "../../set-bid-bar/set-bid-bar";
import WatchListButton2 from "../../UI/watch-list-button/watch-list-button2";

import classes from "./stats-actions.module.css";


const StatsActions = () => {
    const auctionId = useSelector(state => state.detail.fetchingId)
    const {isLogin} = useSelector(state => state.user);
    const {model} = useSelector(state => state.detail.data.spec);
    const dispatch = useDispatch();
    const [isShowPopupBid, setIsShowPopup] = useState(false);

    function setNewBid() {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }
        setIsShowPopup(true);
    }

    return (
        <div className={classes.statsAction}>
            <Popup open={isShowPopupBid} onClose={() => setIsShowPopup(false)}>
                <SetBidBar/>
            </Popup>
            <button className="btn signInBtn" onClick={() => setNewBid()}>Place Bid</button>
            <div className={classes.subActions}>
                <Link className={classes.iconBtn + ' ' + classes.iconHw} to="#">
                    How buying works
                </Link>
                <WatchListButton2 auctionId={auctionId}/>
                <button className={classes.iconBtn + ' ' + classes.iconNotify}>
                    Notify me of {model}
                </button>
            </div>
        </div>
    )
}

export default StatsActions;