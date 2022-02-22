import classes from "./comment-filter-item.module.css";

const CommentFilterItem = ({slug, title, activeCommentFilter, setActiveCommentFilter}) => {
    return (
        <button
            className={slug === activeCommentFilter ? classes.filterItem + ' ' + classes.activeFilter : classes.filterItem}
            onClick={() => setActiveCommentFilter(slug)}>
            {title}
        </button>
    )
}

export default CommentFilterItem;