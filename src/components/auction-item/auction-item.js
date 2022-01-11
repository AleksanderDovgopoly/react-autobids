import {Link} from "react-router-dom";
import AuctionItemStatusBar from "../auction-item-status-bar/auction-item-status-bar";

import classes from "./auction-item.module.css";


const AuctionItem = (props) => {
    const {title, short_description, current_price, start_price, geo, photos, start_date, id} = props.item;

    let mainPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_photo.png?alt=media&token=b48f8851-a485-4743-bf51-31d0749de73b';
    if (photos.length) {
        mainPhoto = photos[0];
    }

    const detailPageLink = `/auctions/${id}`;

    return (
        <li className={classes.auctionItem}>
            <Link
                to={detailPageLink}
                className={classes.hero}
            >
                <div className={classes.image}>
                    <img src={mainPhoto} alt={title}/>
                </div>
            </Link>
            <div className={classes.metaData}>
                <div className={classes.auctionTitle}>{title}</div>
                <p className={classes.auctionSubtitle}>{short_description}</p>
                <p className={classes.auctionGeo}>{geo}</p>
                <AuctionItemStatusBar currentPrice={current_price} startPrice={start_price} startDate={start_date} />
            </div>
        </li>
    )
}

export default AuctionItem;