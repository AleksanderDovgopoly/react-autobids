import {Link} from "react-router-dom";
import classes from "./models-bar-item.module.css";

const ModelsBarItem = ({itemSlug, itemName, currentBrand, showList}) => {
    let itemLink = `/search/${currentBrand}`;
    if (itemSlug) {
        itemLink = itemLink + `/${itemSlug}`
    }

    function onClick() {
        if (typeof showList !== 'undefined') {
            showList(false);
        }
    }

    return (
        <li className={classes.modelItem} onClick={onClick}>
            <Link to={itemLink}>
                <span>{itemName}</span>
            </Link>
        </li>
    )
}

export default ModelsBarItem