import {useSearchParams} from "react-router-dom";
import {appendSearchParams} from "../../helpers/auction-functions";
import classes from "./collection-sorts-bar.module.css";

const CollectionSortsBar = ({pageType}) => {
    let [searchParams, setSearchParams] = useSearchParams();
    let activeSort = searchParams.get('sort');
    let defaultSortTitle = 'Ending soon';

    if (pageType === 'past') defaultSortTitle = 'Recently ended';

    return (
        <div className={classes.sortsBar}>
            <ul className={classes.filterSorts}>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: null}, searchParams))}
                        className={!activeSort ? classes.selected : null}
                    >
                        {defaultSortTitle}
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: 'lowest_mileage'}, searchParams))}
                        className={activeSort === 'lowest_mileage' ? classes.selected : null}
                    >
                        Lowest mileage
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: 'highest_mileage'}, searchParams))}
                        className={activeSort === 'highest_mileage' ? classes.selected : null}
                    >
                        Highest mileage
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: 'lowest_price'}, searchParams))}
                        className={activeSort === 'lowest_price' ? classes.selected : null}
                    >
                        Lowest price
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: 'highest_price'}, searchParams))}
                        className={activeSort === 'highest_price' ? classes.selected : null}
                    >
                        Highest price
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default CollectionSortsBar;