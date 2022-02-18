import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Popup from "reactjs-popup";
import ModelsBar from "../models-bar/models-bar";
import SearchForm from "../../search-form/search-form";
import PopupMobileBody from "../../popup-mobile-body/popup-mobile-body";
import FiltersBar from "../../collection-filters-bar/collection-filters-bar";
import SaveSearchResultButton from "../save-search-result-button/save-search-result-button";

import classes from "./search-page-heading.module.css";


const SearchPageHeading = () => {
    const {brand, model} = useParams();
    const {brand_models} = useSelector(state => state.categories);

    let pageTitle = brand_models[brand].title;
    if (model !== undefined) {
        pageTitle = (<>
            <Link to={`/search/${brand}`}>{brand_models[brand].title}</Link>
            <span className={classes.arrow}/>
            {brand_models[brand].models[model]}
        </>)
    }

    // Mobile heading by viewport size
    const contentStyle = {width: '100%', borderRadius: 0};
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const updateMedia = () => {
        setIsMobile(window.innerWidth < 769);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <div className={classes.searchHeading}>
            {
                isMobile
                    ? <Popup
                        trigger={
                            <button className={classes.pseudoSearch}>
                                <span>{brand_models[brand].title} {brand_models[brand].models[model]}</span>
                            </button>
                        }
                        modal
                        close
                        {...{contentStyle}}>
                        {close => (
                            <PopupMobileBody
                                title="Search"
                                content={<SearchForm modal={true} close={close}/>}
                                close={close}
                            />
                        )}
                    </Popup>
                    : <h1>{pageTitle}</h1>
            }
            {model === undefined ? <ModelsBar currentMade={brand}/> : null}
            <div className={classes.filterSet}>
                <FiltersBar/>
                <SaveSearchResultButton/>
            </div>
        </div>
    )
}

export default SearchPageHeading;