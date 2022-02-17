import classes from "./auction-detail-jump.module.css";

const AuctionDetailJump = ({title}) => {
    return (
        <div id="auction-jump" className={classes.auctionJumpSection}>
            <h3>{title}</h3>
        </div>
    )
}

export default AuctionDetailJump;