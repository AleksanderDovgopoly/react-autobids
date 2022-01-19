import {useSelector} from "react-redux";
import AuctionItem from "../../auction-item/auction-item";

import classes from "../new-listings-sidebar/new-listings-sidebar.module.css";


const EndingSoonSidebar = () => {
    const auctionsObj = useSelector(state => state.auctions.cars);

    const auctionItems = Object.values(auctionsObj)
        .sort(function (x, y) {
            return x.end_date - y.end_date;
        })
        .filter((item) => (item.status === 'active'));

    return (
        <div className={classes.sidebarContainer}>
            <h5>Ending Soon</h5>
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

export default EndingSoonSidebar