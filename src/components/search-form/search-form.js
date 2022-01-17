import {useState} from "react";
import {useNavigate} from "react-router-dom";

import classes from "./search-form.module.css";

const SearchForm = () => {
    const navigate = useNavigate();
    let initSearchWords = '';
    const currentPath = window.location.pathname.split('/');
    if (currentPath[1] === 'search') {
        initSearchWords = decodeURI(currentPath[2]);
    }

    const [searchWords, setSearchWords] = useState(initSearchWords);

    const handleChange = (event) => {
        setSearchWords(event.target.value);
    }

    return (
        <form
            className={classes.searchForm}
            onSubmit={() => navigate(`/search/${searchWords}`, {replace: false})}
        >
            <input
                type="text"
                placeholder='Search for cars'
                value={searchWords}
                onChange={handleChange}
            />
        </form>
    )
}

export default SearchForm;