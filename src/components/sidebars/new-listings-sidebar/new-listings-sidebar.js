import {useSelector} from "react-redux";
import AuctionItem from "../../auction-item/auction-item";

import classes from "./new-listings-sidebar.module.css";


const NewListingsSidebar = () => {
    const auctionsObj = useSelector(state => state.auctions.cars);

    const auctionItems = Object.values(auctionsObj)
        .sort(function (x, y) {
            return y.start_date - x.start_date;
        });

    return (
        <div className={classes.sidebarContainer}>
            <h5>New Listings</h5>
            <ul>
                {
                    auctionItems.slice(0, 6).map((item) => (
                        <AuctionItem key={item.id} item={item}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default NewListingsSidebar;