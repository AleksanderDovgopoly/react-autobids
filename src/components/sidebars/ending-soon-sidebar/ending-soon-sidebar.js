import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions} from "../../../firebase/firebase.utils";
import Spinner from "../../spinner/spinner";
import AuctionItem from "../../auction-item/auction-item";

import classes from "../new-listings-sidebar/new-listings-sidebar.module.css";


const EndingSoonSidebar = () => {
    const client = useQueryClient();
    const {isLoading, isError, data, error} = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const auctionItems = Object.values(data)
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