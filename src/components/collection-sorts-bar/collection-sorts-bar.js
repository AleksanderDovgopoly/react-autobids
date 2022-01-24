import {useSearchParams} from "react-router-dom";

import classes from "./collection-sorts-bar.module.css";
import {appendSearchParams} from "../../helpers/auction-functions";


const CollectionSortsBar = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let activeSort = searchParams.get('sort');

    return (
        <div className={classes.sortsBar}>
            <ul className={classes.filterSorts}>
                <li>
                    <span
                        onClick={() => setSearchParams(appendSearchParams({sort: null}, searchParams))}
                        className={!activeSort ? classes.selected : null}
                    >
                        Ending soon
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