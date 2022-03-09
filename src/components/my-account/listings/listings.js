import {useSelector} from "react-redux";
import {useQuery, useQueryClient} from "react-query";
import {fetchAuctions} from "../../../firebase/firebase.utils";
import Spinner from "../../spinner/spinner";
import ListingsEmpty from "./listings-empty";
import ListingsAuctions from "./listings-auctions";

import classes from "./listings.module.css";


const MyAccountListings = () => {
    const client = useQueryClient();
    const userId = useSelector(state => state.user.currentUser.uid);
    const auctions = useQuery('auctions', fetchAuctions, {
        placeholderData: () => {
            return client.getQueryData('auctions');
        }
    });

    if (auctions.isLoading) return <Spinner/>;

    const userAuctions = Object.values(auctions.data)
        .filter(function (key, value) {
            return key.seller.id === userId
        });

    return (
        <div className={classes.listingsWrapper}>
            <h1>My Listings</h1>
            {
                userAuctions.length
                    ? <ListingsAuctions auctions={userAuctions}/>
                    : <ListingsEmpty/>
            }
        </div>
    )
}

export default MyAccountListings;