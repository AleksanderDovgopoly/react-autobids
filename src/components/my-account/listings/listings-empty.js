import {Link} from "react-router-dom";
import classes from "./listings.module.css";

const ListingsEmpty = () => {
    return (
        <>
            <p className={classes.emptyListings}>You have not submitted any cars yet. Want to sell your car?</p>
            <Link className="btn btn-primary" to="/sell-car">
                Get started
            </Link>
        </>
    )
}

export default ListingsEmpty