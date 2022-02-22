import CommentFilterItem from "./comment-filter-item/comment-filter-item";
import classes from "./comment-filters.module.css";

const CommentFilters = ({activeCommentFilter, setActiveCommentFilter}) => {
    const filtersList = {
        newest: 'Newest',
        upvoted: 'Most Upvoted',
        seller: 'Seller comments',
        bids: 'Bid History'
    }

    return (
        <div className={classes.headingNav}>
            {
                Object.entries(filtersList).map((item, index) => (
                    <CommentFilterItem
                        key={index}
                        slug={item[0]}
                        title={item[1]}
                        activeCommentFilter={activeCommentFilter}
                        setActiveCommentFilter={setActiveCommentFilter}
                    />
                ))
            }
        </div>
    )
}

export default CommentFilters