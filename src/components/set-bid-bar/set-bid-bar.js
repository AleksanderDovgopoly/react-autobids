import {useState} from "react";
import {useSelector} from "react-redux";
import {useQueryClient} from "react-query";
import {setNewAuctionBidOrComment, setNewAuctionPrice} from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button";

import classes from "./set-bid-bar.module.css";


const SetBidBar = () => {
    const queryClient = useQueryClient();
    const auctionId = useSelector(state => state.detail.fetchingId);
    const user = useSelector(state => state.user.currentUser);
    const {current_price, bids_step, id, start_price} = useSelector(state => state.detail.data);
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
        setNewAuctionPrice(id, Number(newBidValue))
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