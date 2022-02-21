import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchFormDropdown from "./search-form-dropdown";
import classes from "../search-form/search-form.module.css";


const SearchFormAutocomplete = ({close, suggestions}) => {
    const navigate = useNavigate();
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e) => {
        const userInput = e.target.value;

        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
        if (typeof close !== 'undefined') {
            close();
        }
        navigate(`/search/${e.target.getAttribute('data-slug')}`);
    };

    const onKeyDown = (e) => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setInput(filteredSuggestions[activeSuggestionIndex].title);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
            navigate(`/search/${filteredSuggestions[activeSuggestionIndex].slug}`);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const resetBtnHandler = (e) => {
        setFilteredSuggestions([]);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
        setInput('');
    }

    return (
        <fieldset className={showSuggestions ? classes.active : undefined}>
            <input
                type="text"
                placeholder='Search for cars'
                onClick={() => setShowSuggestions(true)}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && <SearchFormDropdown
                filteredSuggestions={filteredSuggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onClick={onClick}
                showList={setShowSuggestions}
            />}
            <button type="reset" className={classes.clearSearch} onClick={resetBtnHandler}>
                <span>Clear</span>
            </button>
        </fieldset>
    );
};

export default SearchFormAutocomplete;