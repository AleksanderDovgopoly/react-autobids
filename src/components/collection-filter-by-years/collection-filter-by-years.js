import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {getCategoriesListBySlug} from "../../firebase/firebase.utils";
import YearSelector from "./year-selector/year-selector";

import classes from "../collection-filter-dropdown/collection-filter-dropdown.module.css";
import classes2 from "./collection-filter-by-years.module.css"


const FilterByYears = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [categoriesList, setCategoriesList] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const activeStartYear = searchParams.get('start_year');
    const activeEndYear = searchParams.get('end_year');

    useEffect(async () => {
        if (!isFetching) {
            const fetchingData = await getCategoriesListBySlug('year_release');
            setCategoriesList(fetchingData);
            setIsFetching(true);
        }
    });

    function toggleHandler(e) {
        e.preventDefault();

        setIsListOpen(!isListOpen);
    }

    function getDropdownTitle() {
        if (!activeStartYear && !activeEndYear) {
            return 'Year';
        }

        let catArr = Object.values(categoriesList);
        let maxYear = Math.max(...catArr);
        let minYear = Math.min(...catArr);

        return ((activeStartYear || minYear) + ' - ' + (activeEndYear || maxYear));
    }


    return (
        <div className={classes.dropdownContainer}>
            <button
                className={activeStartYear !== null && activeEndYear !== null ? classes.dropdownToggleActive : classes.dropdownToggle}
                onClick={toggleHandler}
            >
                <span>{getDropdownTitle()}</span>
            </button>
            {
                isListOpen && (
                    <div role="list" className={classes.dropdown}>
                        {
                            isFetching
                                ? <div className={classes2.yearOptions}>
                                    <YearSelector filterType='start_year' catList={categoriesList}/>
                                    <span>To</span>
                                    <YearSelector filterType='end_year' catList={categoriesList}/>
                                </div>
                                : null
                        }
                    </div>
                )
            }
        </div>
    )
}

export default FilterByYears;