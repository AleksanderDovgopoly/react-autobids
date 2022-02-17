import {useSelector} from "react-redux";
import {brandsAndModelsToArray} from "../../../helpers/auction-functions";
import SearchesCollectionItem from "../searches-collection-item/searches-collection-item";
import classes from "./watched-searches-collection.module.css";


const WatchedSearchesCollection = ({searchesList}) => {
    const {brand_models} = useSelector(state => state.categories);
    const brandsModelsArr = brandsAndModelsToArray(brand_models);

    return (
        <ul className={classes.searchesCollection}>
            {
                searchesList.map((item, index) => (
                    <SearchesCollectionItem key={index} itemSearchParams={item} brandsModelsArr={brandsModelsArr}/>
                ))
            }
        </ul>
    )
}

export default WatchedSearchesCollection