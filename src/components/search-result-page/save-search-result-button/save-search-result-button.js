import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isSearchWatched} from "../../../helpers/searches-functions";
import {actionUpdateUserWatchedSearch, togglePopupAuth} from "../../../redux/user/actions";
import {removeWatchedSearch, setNewWatchedSearch} from "../../../firebase/firebase.utils";

import classes from "./save-search-result-button.module.css";


const SaveSearchResultButton = () => {
    const searchParams = useParams();
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector(state => state.user);
    let isWatched = false;
    if (isLogin) {
        isWatched = isSearchWatched(searchParams, currentUser.watch_list.searches);
    }

    async function saveSearchHandler() {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }

        try {
            await setNewWatchedSearch(currentUser.uid, searchParams);
            dispatch(actionUpdateUserWatchedSearch(searchParams));
        } catch (error) {
            console.log(error);
        }
    }

    async function removeSearchHandler() {
        try {
            await removeWatchedSearch(currentUser.uid, searchParams);
            dispatch(actionUpdateUserWatchedSearch(searchParams));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.saveThis}>
            {
                !isWatched
                    ? <button
                        className={classes.saveSearchBtn}
                        onClick={saveSearchHandler}
                    >
                        Save Search & Notify Me
                    </button>
                    : <button
                        className={classes.savedSearchBtn}
                        onClick={removeSearchHandler}
                    >
                        Saved
                    </button>
            }
        </div>
    )
}

export default SaveSearchResultButton