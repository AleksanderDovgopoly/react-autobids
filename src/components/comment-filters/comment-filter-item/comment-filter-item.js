import {useDispatch, useSelector} from "react-redux";
import {setCommentsFilter} from "../../../redux/auction-detail/auction-detail.actions";
import classes from "./comment-filter-item.module.css";


const CommentFilterItem = ({slug, title}) => {
    const dispatch = useDispatch();
    const currentFilter = useSelector(state => state.detail.comments_filter)

    const buttonsSwitchHandler = () => {
        dispatch(setCommentsFilter(slug));
    }

    return (
        <button
            className={slug === currentFilter ? classes.filterItem + ' ' + classes.activeFilter : classes.filterItem}
            onClick={buttonsSwitchHandler}>
            {title}
        </button>
    )
}

export default CommentFilterItem;