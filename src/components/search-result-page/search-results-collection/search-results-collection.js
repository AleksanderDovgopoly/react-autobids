import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CollectionSortsBar from "../../collection-sorts-bar/collection-sorts-bar";
import AuctionsList from "../../auctions-list/auctions-list";

import classes from "../../auctions-collection/auctions-collection.module.css";


const SearchResultsCollection = ({auctionsArr, resultType}) => {
    const {brand, model} = useParams();
    const brandsModels = useSelector(state => state.categories.brand_models);

    let sectionTitle = brandsModels[brand].title;
    if (model !== undefined) {
        sectionTitle = sectionTitle + ` ${brandsModels[brand].models[model]}`;
    }
    if (resultType === 'active') {
        sectionTitle = sectionTitle + ` Auctions (${auctionsArr.length})`;
    } else if (resultType === 'past') {
        sectionTitle = sectionTitle + ` Results (${auctionsArr.length})`;
    }

    return (
        <div className={classes.searchResultCollection}>
            <div className={classes.heading}>
                <h3>
                    {sectionTitle}
                </h3>
                <CollectionSortsBar pageType={resultType}/>
            </div>
            <AuctionsList auctionsArr={auctionsArr} pageType={resultType}/>
        </div>
    )
}

export default SearchResultsCollection;