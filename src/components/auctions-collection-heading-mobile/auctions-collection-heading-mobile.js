import {useState} from "react";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import PopupMobileBody from "../popup-mobile-body/popup-mobile-body";
import SearchForm from "../search-form/search-form";

import classes from "./auctions-collection-heading-mobile.module.css";


const CollectionHeadingMobile = ({pageTitle}) => {
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const contentStyle = {width: '100%', borderRadius: 0};

    function headerClick() {
        setIsShowDropdown(!isShowDropdown);
    }

    return (
        <div className={classes.mobileHeading}>
            <div className={classes.dropdown}>
                <h1 onClick={headerClick}>{pageTitle}</h1>
                <ul className={`${classes.dropdownMenu} ${isShowDropdown ? classes.show : null}`}>
                    <li
                        className={`${classes.dropdownItem} ${pageTitle === 'Auctions' ? classes.selected : null}`}
                    >
                        <Link to="/">Live Auctions</Link>
                    </li>
                    <li
                        className={`${classes.dropdownItem} ${pageTitle === 'Results' ? classes.selected : null}`}
                    >
                        <Link to="/past-auctions">Past Results</Link>
                    </li>
                </ul>
            </div>
            <Popup
                trigger={<button className={classes.search}>Search</button>}
                modal
                close
                {...{contentStyle}}
            >
                {close => (<PopupMobileBody title="Search" content={<SearchForm modal={true}/>} close={close}/>)}

            </Popup>
        </div>
    )
}

export default CollectionHeadingMobile;