import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserWatchedAuctions, togglePopupAuth} from "../../../redux/user/actions";
import {updateUserWatchedAuctions} from "../../../firebase/firebase.utils";

import classes from "./watch-list-button.module.css";


const WatchListButton = ({auctionId}) => {
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
        <button
            onClick={toggleWatchedHandle}
            className={`${classes.toggleWatchList} ${isItemWatched && classes.watched}`}
        />
    )
}

export default WatchListButton;