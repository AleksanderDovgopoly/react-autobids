import {useEffect, useState} from "react";
import {getCategoriesListBySlug} from "../../firebase/firebase.utils";

import classes from "./collection-filter-dropdown.module.css";


const FilterDropdown = ({categorySlug}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [categoriesList, setCategoriesList] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);

    useEffect(async () => {
        if (!isFetching) {
            const fetchingData = await getCategoriesListBySlug(categorySlug);
            setCategoriesList(fetchingData);
            setIsFetching(true);
        }
    });

    function setCatName(categorySlug) {
        switch (categorySlug) {
            case "body_style":
                return 'Body Style';
            case "transmission":
                return 'Transmission';
            case "year_release":
                return 'Year';
            default:
                return 'Category';
        }
    }

    function toggleHandler(e) {
        e.preventDefault();

        setIsListOpen(!isListOpen);
    }

    return (
        <div className={classes.dropdownContainer}>
            <button
                className={classes.dropdownToggle}
                onClick={toggleHandler}
            >
                <span>{setCatName(categorySlug)}</span>
            </button>
            {
                isListOpen && (
                    <div role="list" className={classes.dropdown}>
                        <button className={classes.item} role='menuitem' data-filter=''>All</button>
                        {
                            isFetching
                                ? Object.entries(categoriesList).map(([key, value], index) => {
                                    return (
                                        <button className={classes.item} role='menuitem' key={index}
                                                data-filter={key}>{value}</button>
                                    )
                                })
                                : null
                        }
                    </div>
                )
            }

        </div>
    )
}

export default FilterDropdown;