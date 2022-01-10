import {useState} from "react";
import NumericInput from 'react-numeric-input';
import CustomButton from "../custom-button/custom-button";

import classes from "./set-bid-bar.module.css";
import {useSelector} from "react-redux";
import {setNewBidByAuctionId} from "../../firebase/firebase.utils";


const SetBidBar = (props) => {
    const {current_price, step, auctionId, startPrice} = props;
    const [newBidValue, setNewBidValue] = useState(current_price || startPrice);
    const userId = useSelector(state => state.user.currentUser.uid)

    function setBidInputHandler (event) {
        setNewBidValue(event);
    }

    function setNewBidHandler (event) {
        event.preventDefault();

        if (!newBidValue) return;
        const newBidData = {
            bid_date: new Date(),
            bid_price: newBidValue,
            user_id: userId
        }

        setNewBidByAuctionId( auctionId, newBidData);
    }

    return (
        <div className={classes.SetBidBar}>
            <p>Step - ${step}</p>
            <NumericInput onChange={setBidInputHandler} min={current_price} step={step} value={newBidValue} />
            <CustomButton className={classes.submitBid} onClick={setNewBidHandler} disabled={userId ? false : true}>Set New Bid</CustomButton>
            {!userId && <p>Only logged in users can place a bet</p>}
        </div>
    )
};

export default SetBidBar