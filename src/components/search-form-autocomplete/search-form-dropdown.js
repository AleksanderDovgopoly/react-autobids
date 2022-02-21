import {useSelector} from "react-redux";
import SavedSearchesList from "./saved-searches-list";
import AutocompleteDropdownList from "./autocomplete-dropdown-list";


const SearchFormDropdown = ({filteredSuggestions, activeSuggestionIndex, onClick, showList}) => {
    const {isLogin} = useSelector(state => state.user);

    if (filteredSuggestions.length) {
        return <AutocompleteDropdownList
            filteredSuggestions={filteredSuggestions}
            activeSuggestionIndex={activeSuggestionIndex}
            onClick={onClick}/>
    }

    return isLogin ?
        <SavedSearchesList showList={showList}/>
        : null
};

export default SearchFormDropdown;