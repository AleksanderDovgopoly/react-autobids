import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ModelsBarItem from "../search-result-page/models-bar-item/models-bar-item";
import classes from "./search-form-autocomplete.module.css";

const SavedSearchesList = ({showList}) => {
    const {searches} = useSelector(state => state.user.currentUser.watch_list);
    const {brand_models} = useSelector(state => state.categories);

    const getTitle = (item) => {
        const {brand, model} = item;
        return `${brand_models[brand].title} ${model ? brand_models[brand].models[model] : ''}`;
    }

    return (
        <div className={classes.savedItems}>
            <h6>
                Saved searches
                <Link onClick={() => showList(false)} to="/watchlist#saved_searches">Edit</Link>
            </h6>
            <ul className={classes.searchesList}>
                {
                    searches.map((item, index) => {
                        return <ModelsBarItem
                            key={index}
                            itemName={getTitle(item)}
                            itemSlug={item.model}
                            currentBrand={item.brand}
                            showList={showList}
                        />
                    })
                }
            </ul>
        </div>
    )
}

export default SavedSearchesList