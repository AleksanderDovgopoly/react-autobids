import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ModelsBar from "../models-bar/models-bar";
import FiltersBar from "../../collection-filters-bar/collection-filters-bar";
import SaveSearchResultButton from "../save-search-result-button/save-search-result-button";

import classes from "./search-page-heading.module.css";

const SearchPageHeading = () => {
    const {made, model} = useParams();
    const {brand_models} = useSelector(state => state.categories);

    let pageTitle = brand_models[made].title;
    if (model !== undefined) {
        pageTitle = (<>
            <Link to={`/search/${made}`}>{brand_models[made].title}</Link>
            <span className={classes.arrow}/>
            {brand_models[made].models[model]}
        </>)
    }

    return (
        <div className={classes.searchHeading}>
            <h1>{pageTitle}</h1>
            {model === undefined ? <ModelsBar currentMade={made}/> : null}
            <div className={classes.filterSet}>
                <FiltersBar/>
                <SaveSearchResultButton/>
            </div>
        </div>
    )
}

export default SearchPageHeading;