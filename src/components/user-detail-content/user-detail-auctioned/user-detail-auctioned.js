import {useSelector} from "react-redux";
import AuctionsList from "../../auctions-list/auctions-list";

import classes from "./user-detail-auctioned.module.css";


const UserDetailAuctioned = ({userId}) => {
    const auctionItemsObject = useSelector((state => state.auctions.cars));

    let auctionsArr = Object.values(auctionItemsObject);

    const filteredAuctions = auctionsArr
        .filter(function (key, value) {
            return key.seller.id === userId
        })

    return (
        <div className={classes.auctionedCars}>
            <h2>Cars Auctioned</h2>
            {
                filteredAuctions.length
                    ? <AuctionsList auctionsArr={filteredAuctions}/>
                    : <p>There are no auctions created yet</p>
            }
        </div>
    )
}

export default UserDetailAuctioned;