import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserWatchedAuctions, togglePopupAuth} from "../../../redux/user/user.actions";
import {updateUserWatchedAuctions} from "../../../firebase/firebase.utils";

import classes from "./watch-list-button2.module.css";


const WatchListButton2 = ({auctionId}) => {
    let isItemWatched = false;
    const {isLogin, currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();

    if (isLogin) {
        const watchlist = currentUser.watch_list.auctions;
        if (watchlist.length) {
            isItemWatched = watchlist.includes(auctionId);
        }
    }

    async function toggleWatchedHandle() {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }

        try {
            await updateUserWatchedAuctions(currentUser.uid, auctionId);
            dispatch(actionUpdateUserWatchedAuctions(auctionId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            {
                isItemWatched
                    ? <button
                        onClick={toggleWatchedHandle}
                        className={`${classes.watchButton} ${classes.watched}`}
                    >
                        Watched
                    </button>
                    : <button
                        onClick={toggleWatchedHandle}
                        className={classes.watchButton}
                    >
                        Watch this auction
                    </button>
            }
        </Fragment>
    )
}

export default WatchListButton2