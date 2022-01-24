import FilterDropdown from "../collection-filter-dropdown/collection-filter-dropdown";
import FilterByYears from "../collection-filter-by-years/collection-filter-by-years";

import classes from "./collection-filters-bar.module.css";


const FiltersBar = () => {
    return (
        <div className={classes.filtersBar}>
            <FilterByYears/>
            <FilterDropdown categorySlug="transmission"/>
            <FilterDropdown categorySlug="body_style"/>
        </div>
    )
}

export default FiltersBar;