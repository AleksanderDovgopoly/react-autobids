import RelatedAuctionContent from "../related-auction-content/related-auction-content";
import classes from "../watched-searches-collection/watched-searches-collection.module.css";

const RelatedAuction = ({auctionData}) => {
    return (
        <div>
            {
                auctionData !== undefined
                    ? <RelatedAuctionContent data={auctionData}/>
                    : <div className={classes.noMatches}><span>No active auctions</span></div>
            }
        </div>
    )
}

export default RelatedAuction