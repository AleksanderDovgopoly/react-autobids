import {useSelector} from "react-redux";
import UsernameLink from "../UI/username-link/username-link";

import classes from "./auction-detail-spec.module.css";


const AuctionSpec = () => {
    const {spec, seller, geo} = useSelector(state => state.detail.data);
    const {taxonomies} = useSelector(state => state.categories);
    const {body_style, drivetrain, engine, exterior, interior, make, mileage, model, transmission, vin} = spec;

    return (
        <div className={classes.auctionSpec}>
            <dl>
                <dt>Make</dt><dd>{make}</dd>
                <dt>Model</dt><dd>{model}</dd>
                <dt>Seller</dt><dd><UsernameLink userId={seller.id}/></dd>
                <dt>Location</dt><dd>{geo}</dd>
                <dt>VIN</dt><dd>{vin}</dd>
                <dt>Mileage</dt><dd>{mileage}</dd>
            </dl>
            <dl>
                <dt>Engine</dt><dd>{engine}</dd>
                <dt>Transmission</dt><dd>{taxonomies.transmission[transmission]}</dd>
                <dt>Drivetrain</dt><dd>{drivetrain}</dd>
                <dt>Exterior color</dt><dd>{exterior}</dd>
                <dt>Interior color</dt><dd>{interior}</dd>
                <dt>Body style</dt><dd>{taxonomies.body_style[body_style]}</dd>
            </dl>
        </div>
    )
}

export default AuctionSpec;