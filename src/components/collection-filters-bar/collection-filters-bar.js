import FilterDropdown from "../collection-filter-dropdown/collection-filter-dropdown";

import classes from "./collection-filters-bar.module.css";


const FiltersBar = () => {
    return (
        <div className={classes.filtersBar}>
            <FilterDropdown categorySlug="year_release" />
            <FilterDropdown categorySlug="transmission" />
            <FilterDropdown categorySlug="body_style" />
        </div>
    )
}

export default FiltersBar;