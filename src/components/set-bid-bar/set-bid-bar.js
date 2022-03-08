import {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useQueryClient} from "react-query";
import {setNewAuctionBidOrComment, setNewAuctionPrice} from "../../firebase/firebase.utils";
import {useAuctionCacheById} from "../../hooks/useAuctionCacheById";
import CustomButton from "../custom-button/custom-button";

import classes from "./set-bid-bar.module.css";


const SetBidBar = ({close}) => {
    const queryClient = useQueryClient();
    const {auctionId} = useParams();
    const user = useSelector(state => state.user.currentUser);
    const {current_price, bids_step, id, start_price} = useAuctionCacheById(auctionId);
    const [newBidValue, setNewBidValue] = useState(current_price + bids_step || start_price + bids_step);

    function setNewBidHandler(event) {
        event.preventDefault();

        if (!newBidValue) return;
        const newBidData = {
            createAt: new Date(),
            bid_price: Number(newBidValue),
            author_id: user.uid,
            auction_id: id,
            type: 'bid',
            rep: []
        }

        // ToDo: Update Auction price in Redux
        queryClient.invalidateQueries(['comments', auctionId]);
        setNewAuctionBidOrComment(newBidData);
        setNewAuctionPrice(id, Number(newBidValue));
        close();
    }

    return (
        <div className={classes.SetBidBar}>
            <h3>Place Bid</h3>
            <p>Step - ${bids_step}</p>
            <input
                type="number"
                onChange={(event => setNewBidValue(event.target.value))}
                min={current_price + bids_step}
                step={bids_step}
                value={newBidValue}
            />
            <CustomButton
                className={classes.submitBid}
                onClick={setNewBidHandler}
                disabled={!user.uid}
            >
                Set New Bid
            </CustomButton>
            {!user.uid && <p>Only logged in users can place a bet</p>}
        </div>
    )
};

export default SetBidBar