import SearchPageHeading from "../../components/search-result-page/search-page-heading/search-page-heading";
import SearchPageResult from "../../components/search-result-page/search-page-result/search-page-result";
import classes from "./search-page.module.css";

const SearchPage = () => {
    return (
        <div className={classes.searchContainer}>
            <SearchPageHeading/>
            <SearchPageResult/>
        </div>
    )
}

export default SearchPage