import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AuctionItem from "../../auction-item/auction-item";
import {fetchAuctions} from "../../../firebase/firebase.utils";
import {fetchAuctionsAction} from "../../../redux/auctions/auctions.actions";

import classes from "./new-listings-sidebar.module.css";


const NewListingsSidebar = () => {
    const dispatch = useDispatch();
    const isCarsFetching = useSelector((state => state.auctions.isFetching));
    const auctionsObj = useSelector(state => state.auctions.cars);

    useEffect(() => {
        async function fetchData() {
            const auctionsCollection = await fetchAuctions();
            dispatch(fetchAuctionsAction(auctionsCollection));
        }

        if (!isCarsFetching) {
            fetchData();
        }
    }, [dispatch, isCarsFetching])

    const auctionItems = Object.values(auctionsObj)
        .sort(function (x, y) {
            return y.start_date - x.start_date;
        })
        .filter((item) => (item.status === 'active'));

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