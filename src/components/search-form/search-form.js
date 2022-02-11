import {useSelector} from "react-redux";
import {brandsAndModelsToArray} from "../../helpers/auction-functions";
import SearchFormAutocomplete from "../search-form-autocomplete/search-form-autocomplete";
import classes from "./search-form.module.css";

const SearchForm = ({modal, close}) => {
    const brandsModels = useSelector(state => state.categories.brand_models);
    const brandsAndModelsArr = brandsAndModelsToArray(brandsModels);

    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <form
            className={`${classes.searchForm} ${modal ? classes.inModal : null}`}
            onSubmit={submitHandler}
        >
            <SearchFormAutocomplete close={close} suggestions={brandsAndModelsArr}/>
        </form>
    )
}

export default SearchForm;