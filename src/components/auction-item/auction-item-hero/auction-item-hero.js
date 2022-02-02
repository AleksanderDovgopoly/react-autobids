import {Link} from "react-router-dom";
import AuctionItemStatusBarByUser from "../../auction-item-status-bar-by-user/auction-item-status-bar-by-user";
import AuctionItemStatusBar from "../../auction-item-status-bar/auction-item-status-bar";

import classes from "./auction-item-hero.module.css";

const AuctionItemHero = ({itemData, bids}) => {
    const {title, current_price, start_price, photos, start_date, id, end_date} = itemData;

    let mainPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_photo.png?alt=media&token=b48f8851-a485-4743-bf51-31d0749de73b';
    if (photos.length) {
        mainPhoto = photos[0];
    }

    const detailPageLink = `/auctions/${id}`;

    return (
        <Link
            to={detailPageLink}
            className={classes.hero}
        >
            <div className={classes.image}>
                <img src={mainPhoto} alt={title}/>
                {
                    bids
                        ? <AuctionItemStatusBarByUser
                            itemData={itemData}
                            bids={bids}
                        />
                        : <AuctionItemStatusBar
                            currentPrice={current_price}
                            startPrice={start_price}
                            startDate={start_date}
                            endDate={end_date}
                        />
                }

            </div>
        </Link>
    )
}

export default AuctionItemHero;