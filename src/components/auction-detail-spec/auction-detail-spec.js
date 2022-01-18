import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import classes from "./auction-detail-spec.module.css";


const AuctionSpec = () => {
    const {spec, seller} = useSelector(state => state.detail.data);
    const {body_style, drivetrain, engine, exterior, interior, location, make, mileage, model, transmission, vin} = spec;

    const sellerUrl = `/user/${seller.id}`;

    return (
        <div className={classes.auctionSpec}>
            <dl>
                <dt>Make</dt><dd>{make}</dd>
                <dt>Model</dt><dd>{model}</dd>
                <dt>Seller</dt><dd><Link to={sellerUrl}>{seller.name}</Link></dd>
                <dt>Location</dt><dd>{location}</dd>
                <dt>VIN</dt><dd>{vin}</dd>
                <dt>Mileage</dt><dd>{mileage}</dd>
            </dl>
            <dl>
                <dt>Engine</dt><dd>{engine}</dd>
                <dt>Transmission</dt><dd>{transmission}</dd>
                <dt>Drivetrain</dt><dd>{drivetrain}</dd>
                <dt>Exterior color</dt><dd>{exterior}</dd>
                <dt>Interior color</dt><dd>{interior}</dd>
                <dt>Body style</dt><dd>{body_style}</dd>
            </dl>
        </div>
    )
}

export default AuctionSpec;