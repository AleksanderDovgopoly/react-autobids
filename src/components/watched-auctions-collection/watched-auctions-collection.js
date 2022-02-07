import {Fragment} from "react";
import {useSelector} from "react-redux";
import AuctionsList from "../auctions-list/auctions-list";

import classes from "./watched-auctions-collection.module.css";

const WatchedAuctionsCollection = () => {
    const auctionItemsObject = useSelector((state => state.auctions.cars));
    const watched_ids = useSelector(state => state.user.currentUser.watch_list.auctions);

    let auctionsArr = Object.values(auctionItemsObject);
    auctionsArr = auctionsArr.filter(({id}) => watched_ids.includes(id));

    return (
        <Fragment>
            <div className={classes.heading}>
                <h2>Auctions</h2>
            </div>
            {
                watched_ids.length
                    ? <div className={classes.results}>
                        <AuctionsList auctionsArr={auctionsArr}/>
                    </div>
                    : <p className={classes.noResults}>Click the star icon next to any auction to add it to your watch
                        list and
                        start getting auction notifications.</p>
            }
        </Fragment>
    )
}

export default WatchedAuctionsCollection