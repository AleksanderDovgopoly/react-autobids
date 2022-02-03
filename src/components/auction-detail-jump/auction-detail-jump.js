import {useSelector} from "react-redux";
import classes from "./auction-detail-jump.module.css";

const AuctionDetailJump = () => {
    const {title} = useSelector(state => state.detail.data);

    return (
        <div id="auction-jump" className={classes.auctionJumpSection}>
            <h3>{title}</h3>
        </div>
    )
}

export default AuctionDetailJump;