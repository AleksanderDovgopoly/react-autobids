import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewBidByAuctionId} from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button";
import {updateStateBidsHistory} from "../../redux/auction-detail/auction-detail.actions";

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
            bid_date: new Date(),
            bid_price: Number(newBidValue),
            user_id: user.uid,
            user_name: user.displayName,
        }

        dispatch(updateStateBidsHistory(newBidData));
        setNewBidByAuctionId(id, newBidData);
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