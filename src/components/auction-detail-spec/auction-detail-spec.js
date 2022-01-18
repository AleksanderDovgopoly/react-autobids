import {useSelector} from "react-redux";

import classes from "./auction-detail-spec.module.css";


const AuctionSpec = () => {
    const spec = useSelector(state => state.detail.data.spec);
    const {body_style, drivetrain, engine, exterior, interior, location, make, mileage, model, transmission, vin} = spec;

    return (
        <div className={classes.auctionSpec}>
            <dl>
                <dt>Make</dt><dd>{make}</dd>
                <dt>Model</dt><dd>{model}</dd>
                <dt>Location</dt><dd>{location}</dd>
                <dt>VIN</dt><dd>{vin}</dd>
                <dt>Mileage</dt><dd>{mileage}</dd>
                <dt>Body style</dt><dd>{body_style}</dd>
            </dl>
            <dl>
                <dt>Engine</dt><dd>{engine}</dd>
                <dt>Transmission</dt><dd>{transmission}</dd>
                <dt>Drivetrain</dt><dd>{drivetrain}</dd>
                <dt>Exterior color</dt><dd>{exterior}</dd>
                <dt>Interior color</dt><dd>{interior}</dd>
                <dt>Seller Type</dt><dd>ToDo</dd>
            </dl>
        </div>
    )
}

export default AuctionSpec;