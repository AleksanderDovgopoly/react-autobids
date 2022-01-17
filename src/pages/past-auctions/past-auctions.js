import AuctionsCollection from "../../components/auctions-collection/auctions-collection";

import classes from "./past-auctions.module.css";


const PastAuctions = () => {

    return (
        <div className={classes.pastAuctions}>
            <AuctionsCollection pageType="past" />
        </div>
    )
}

export default PastAuctions;