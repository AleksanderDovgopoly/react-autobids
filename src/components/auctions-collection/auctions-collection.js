import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuctions} from "../../firebase/firebase.utils";
import {fetchAuctionsAction} from "../../redux/auctions/auctions.actions";
import AuctionsList from "../auctions-list/auctions-list";
import Spinner from "../spinner/spinner";

import classes from "./auctions-collection.module.css";


const AuctionsCollection = () => {
    const dispatch = useDispatch();
    const isCarsFetching = useSelector((state => state.auctions.isFetching));
    const auctionItemsObject = useSelector((state => state.auctions.cars));

    let auctionsArr = Object.values(auctionItemsObject);

    useEffect(() => {
        async function fetchData() {
            const auctionsCollection = await fetchAuctions();
            dispatch(fetchAuctionsAction(auctionsCollection));
        }

        fetchData();

    }, [dispatch])

    return (
        <div className={classes.auctionCollection}>
            <h3>Auctions</h3>
            {
                isCarsFetching
                    ? <AuctionsList auctionsArr={auctionsArr}/>
                    : <Spinner/>
            }
        </div>
    )
}

export default AuctionsCollection