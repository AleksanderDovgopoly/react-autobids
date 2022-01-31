import {useState} from "react";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {appendSearchParams} from "../../helpers/auction-functions";

import classes from "./collection-filter-dropdown.module.css";


const FilterDropdown = ({categorySlug}) => {
    const {isFetching, taxonomies} = useSelector(state => state.categories);
    const currentCatList = taxonomies[categorySlug];
    const [isListOpen, setIsListOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilter = searchParams.get(categorySlug);

    function setCatName(categorySlug) {
        switch (categorySlug) {
            case "body_style":
                return 'Body Style';
            case "transmission":
                return 'Transmission';
            default:
                return 'Category';
        }
    }

    function toggleHandler(e) {
        e.preventDefault();

        setIsListOpen(!isListOpen);
    }

    const setFilterHandler = (catKey) => {
        setSearchParams(appendSearchParams({[categorySlug]: catKey}, searchParams));
        setIsListOpen(!isListOpen);
    }

    return (
        <div className={classes.dropdownContainer}>
            <button
                className={activeFilter !== null ? classes.dropdownToggleActive : classes.dropdownToggle}
                onClick={toggleHandler}
            >
                <span>{activeFilter === null ? setCatName(categorySlug) : currentCatList[activeFilter]}</span>
            </button>
            {
                isListOpen && (
                    <div role="list" className={classes.dropdown}>
                        <button
                            className={classes.item}
                            role='menuitem'
                            onClick={() => setFilterHandler(null)}
                        >
                            All
                        </button>
                        {
                            isFetching
                                ? Object.entries(currentCatList).map(([key, value], index) => {
                                    return (
                                        <button
                                            className={classes.item}
                                            role='menuitem'
                                            key={index}
                                            data-filter={key}
                                            onClick={() => setFilterHandler(key)}
                                        >
                                            {value}
                                        </button>
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