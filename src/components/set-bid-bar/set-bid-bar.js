import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewAuctionBidOrComment, setNewAuctionPrice} from "../../firebase/firebase.utils";
import {updateAuctionComment} from "../../redux/auction-detail/auction-detail.actions";
import CustomButton from "../custom-button/custom-button";

import classes from "./set-bid-bar.module.css";


const SetBidBar = () => {
    const dispatch = useDispatch();
    const {current_price, bids_step, id, start_price} = useSelector(state => state.detail.data);
    const [newBidValue, setNewBidValue] = useState(current_price + bids_step || start_price + bids_step);
    const user = useSelector(state => state.user.currentUser)

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
        dispatch(updateAuctionComment(newBidData));
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
                disabled={user.uid ? false : true}
            >
                Set New Bid
            </CustomButton>
            {!user.uid && <p>Only logged in users can place a bet</p>}
        </div>
    )
};

export default SetBidBar