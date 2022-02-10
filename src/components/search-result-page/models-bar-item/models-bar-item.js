import {Link} from "react-router-dom";
import classes from "./models-bar-item.module.css";

const ModelsBarItem = ({itemSlug, itemName, currentBrand}) => {
    return (
        <li className={classes.modelItem}>
            <Link to={`/search/${currentBrand}/${itemSlug}`}>
                <span>{itemName}</span>
            </Link>
        </li>
    )
}

export default ModelsBarItem