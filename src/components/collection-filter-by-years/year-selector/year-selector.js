import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {appendSearchParams} from "../../../helpers/auction-functions";

import classes from "../../collection-filter-dropdown/collection-filter-dropdown.module.css";


const YearSelector = ({filterType, catList}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeStartYear = searchParams.get('start_year');
    const activeEndYear = searchParams.get('end_year');
    const activeYear = searchParams.get([filterType]);
    let catArr = Object.values(catList);
    let initYear = Math.max(...catArr);
    if (filterType === 'start_year') {
        initYear = Math.min(...catArr);
    }

    const [currentYear, setCurrentYear] = useState(activeYear || initYear);

    let yearsList = [];
    const yearsArr = Object.values(catList);
    const maxYear = Math.max(...yearsArr);
    const minYear = Math.min(...yearsArr);

    if (filterType === 'start_year') {
        yearsList = yearsArr.filter((year) => {
            return year <= (activeEndYear || maxYear)
        })
    } else {
        yearsList = yearsArr.filter((year) => {
            return year >= (activeStartYear || minYear)
        })
    }

    function setYearHandler(event) {
        event.preventDefault();
        setCurrentYear(event.target.value);
        setSearchParams(appendSearchParams({[filterType]: event.target.value}, searchParams));
    }

    return (
        <fieldset>
            <select name={filterType} onChange={setYearHandler} value={currentYear}>
                {
                    yearsList.map((value, index) => {
                        return (
                            <option
                                className={classes.item}
                                key={index}
                                value={value}
                            >
                                {value}
                            </option>
                        )
                    })
                }
            </select>
        </fieldset>
    )
}

export default YearSelector;