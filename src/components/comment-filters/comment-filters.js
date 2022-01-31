import CommentFilterItem from "./comment-filter-item/comment-filter-item";
import classes from "./comment-filters.module.css";


const CommentFilters = () => {
    const filtersList = {
        newest: 'Newest',
        upvoted: 'Most Upvoted',
        bids: 'Bid History'
    }

    return (
        <div className={classes.headingNav}>
            {
                Object.entries(filtersList).map((item, index) => (
                    <CommentFilterItem key={index} slug={item[0]} title={item[1]}/>
                ))
            }
        </div>
    )
}

export default CommentFilters