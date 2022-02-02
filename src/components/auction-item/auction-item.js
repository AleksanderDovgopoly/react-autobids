import moment from "moment";
import AuctionItemHero from "./auction-item-hero/auction-item-hero";

import classes from "./auction-item.module.css";

const AuctionItem = ({item, bids}) => {
    const {title, short_description, geo, status, end_date} = item;

    const endingMoment = moment.unix(end_date.seconds);
    const endingDate = endingMoment.format("M/D/YY");

    return (
        <li className={classes.auctionItem}>
            <AuctionItemHero itemData={item} bids={bids}/>
            <div className={classes.metaData}>
                <h4 className={classes.auctionTitle}>{title}</h4>
                <p className={classes.auctionSubtitle}>{short_description}</p>
                {
                    status === 'past'
                        ? <p className={classes.auctionGeo}>Ended {endingDate}</p>
                        : <p className={classes.auctionGeo}>{geo}</p>
                }
            </div>
        </li>
    )
}

export default AuctionItem;