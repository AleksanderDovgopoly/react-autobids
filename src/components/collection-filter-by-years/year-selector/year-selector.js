import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {appendSearchParams} from "../../../helpers/auction-functions";

import classes from "../../collection-filter-dropdown/collection-filter-dropdown.module.css";


const YearSelector = ({filterType, catList}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeYear = searchParams.get([filterType]);
    let catArr = Object.values(catList);
    let initYear = Math.max(...catArr);
    if (filterType === 'start_year') {
        initYear = Math.min(...catArr);
    }

    const [currentYear, setCurrentYear] = useState(activeYear || initYear);

    function setYearHandler(event) {
        event.preventDefault();
        setCurrentYear(event.target.value);
        setSearchParams(appendSearchParams({[filterType]: event.target.value}, searchParams));
    }

    return (
        <fieldset>
            <select name={filterType} onChange={setYearHandler} value={currentYear}>
                {
                    Object.entries(catList).map(([key, value], index) => {
                        return (
                            <option
                                className={classes.item}
                                key={index}
                                value={key}
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