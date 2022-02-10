import classes from "./search-form-autocomplete.module.css";

const SuggestionsListComponent = ({filteredSuggestions, activeSuggestionIndex, onClick}) => {
    return filteredSuggestions.length ? (
        <div className={classes.autosuggestionContainer}>
            <ul>
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = classes.activeSuggest;
                    }

                    return (
                        <li className={className} key={suggestion.slug}>
                            <button onClick={onClick} data-slug={suggestion.slug}>{suggestion.title}</button>
                        </li>
                    );
                })}
            </ul>
        </div>

    ) : (
        <div className={classes.autosuggestionContainer}>
        <span role="img" aria-label="tear emoji">
          😪
        </span>{" "}
            <em>sorry no suggestions</em>
        </div>
    );
};

export default SuggestionsListComponent;