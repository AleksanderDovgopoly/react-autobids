import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isSearchWatched} from "../../../helpers/searches-functions";
import {actionUpdateUserWatchedSearch, togglePopupAuth} from "../../../redux/user/actions";
import {removeWatchedSearch, setNewWatchedSearch} from "../../../firebase/firebase.utils";

import classes from "./watch-list-search-button.module.css";


const WatchListSearchButton = (props) => {
    const searchParams = props;
    const dispatch = useDispatch();
    const {isLogin, currentUser} = useSelector(state => state.user);
    const {brand_models} = useSelector(state => state.categories);
    const modelTitle = brand_models[props.brand].models[props.model];
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
        <Fragment>
            {
                isWatched
                    ? <button
                        className={`${classes.watchButton} ${classes.watched}`}
                        onClick={removeSearchHandler}
                    >
                        Notify me of {modelTitle}
                    </button>
                    : <button className={classes.watchButton} onClick={saveSearchHandler}>
                        Notify me of {modelTitle}
                    </button>
            }
        </Fragment>
    )
}

export default WatchListSearchButton