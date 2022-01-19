import {useSearchParams} from "react-router-dom";

import classes from "./collection-sorts-bar.module.css";


const CollectionSortsBar = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let activeSort = searchParams.get('sort');

    return (
        <div className={classes.sortsBar}>
            <ul className={classes.filterSorts}>
                <li>
                    <span
                        onClick={() => setSearchParams()}
                        className={!activeSort ? classes.selected : null}
                    >
                        Ending soon
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams({sort: 'lowest_mileage'})}
                        className={activeSort === 'lowest_mileage' ? classes.selected : null}
                    >
                        Lowest mileage
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams({sort: 'highest_mileage'})}
                        className={activeSort === 'highest_mileage' ? classes.selected : null}
                    >
                        Highest mileage
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams({sort: 'lowest_price'})}
                        className={activeSort === 'lowest_price' ? classes.selected : null}
                    >
                        Lowest price
                    </span>
                </li>
                <li>
                    <span
                        onClick={() => setSearchParams({sort: 'highest_price'})}
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