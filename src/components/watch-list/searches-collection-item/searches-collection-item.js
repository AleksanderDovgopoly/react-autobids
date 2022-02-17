import {useNavigate} from "react-router-dom";
import {useAuctionsFromCache} from "../../../hooks/useAuctionsFromCache";
import RelatedAuction from "../related-auction/related-auction";
import classes from "../watched-searches-collection/watched-searches-collection.module.css";


const SearchesCollectionItem = ({itemSearchParams, brandsModelsArr}) => {
    const navigate = useNavigate();
    const auctionsCache = useAuctionsFromCache();
    const {brand, model} = itemSearchParams;

    // Get current search params
    let searchObj = brandsModelsArr.filter((item) => item.slug === brand);
    if (model !== undefined) {
        searchObj = brandsModelsArr.filter(item => item.slug === `${brand}/${model}`)
    }
    const searchTitle = searchObj[0].title;
    const searchSlug = model !== undefined ? `${brand}/${model}` : brand;

    // Get last auction by current search
    let auctionsByCurrentSearch = Object.values(auctionsCache).filter(item => item.status === 'active');

    model !== undefined
        ? auctionsByCurrentSearch = auctionsByCurrentSearch.filter(item => item.spec.model.toLowerCase() === model.toLowerCase())
        : auctionsByCurrentSearch = auctionsByCurrentSearch.filter(item => item.spec.make.toLowerCase() === brand.toLowerCase());

    const countActiveAuctions = auctionsByCurrentSearch.length - 1;
    const lastCurrentSearchAuction = auctionsByCurrentSearch.sort(function (x, y) {
        return x.end_date - y.end_date;
    })[0];


    return (
        <li>
            <button
                className={classes.searchPill}
                onClick={() => navigate(`/search/${searchSlug}`)}
            >
                {searchTitle}
            </button>
            <button className={classes.searchEdit}>Edit</button>
            <RelatedAuction auctionData={lastCurrentSearchAuction}/>
            {
                countActiveAuctions > 0
                    ? <button
                        className={`btn btn-primary ${classes.moreBtn}`}
                        onClick={() => navigate(`/search/${searchSlug}`)}
                    >+{countActiveAuctions} more {searchTitle}</button>
                    : null
            }

        </li>
    )
}

export default SearchesCollectionItem