import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {togglePopupAuth} from "../../../redux/user/actions";
import {useAuctionCacheById} from "../../../hooks/useAuctionCacheById";
import Popup from "reactjs-popup";
import SetBidBar from "../../set-bid-bar/set-bid-bar";
import WatchListButton2 from "../../UI/watch-list-button/watch-list-button2";
import WatchListSearchButton from "../../UI/watch-list-button/watch-list-search-button";

import classes from "./stats-actions.module.css";


const StatsActions = () => {
    const {auctionId} = useParams();
    const {isLogin} = useSelector(state => state.user);
    const auctionCache = useAuctionCacheById(auctionId);
    const {model, make} = auctionCache.spec;
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
                <WatchListSearchButton brand={make} model={model}/>
            </div>
        </div>
    )
}

export default StatsActions;