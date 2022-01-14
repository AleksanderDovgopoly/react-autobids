import AuctionItem from "../auction-item/auction-item";

import classes from "./auctions-list.module.css";


const AuctionsList = (props) => {
    const {auctionsArr, userId} = props;

    const auctionItems = auctionsArr
        .sort(function (x, y) {
            return x.start_date - y.start_date;
        })

    return (
        <ul className={classes.auctionList}>
            {
                auctionItems.map((item) => (
                    <AuctionItem key={item.id} item={item} userId={userId}/>
                ))
            }
        </ul>
    )
}

export default AuctionsList;