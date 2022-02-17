import AuctionItemHero from "../../auction-item/auction-item-hero/auction-item-hero";
import classes from "../../auction-item/auction-item.module.css";

const RelatedAuctionContent = ({data}) => {
    const {title, short_description, geo} = data;

    return (
        <div className={classes.auctionItem}>
            <AuctionItemHero itemData={data}/>
            <div className={classes.metaData}>
                <h4 className={classes.auctionTitle}>{title}</h4>
                <p className={classes.auctionSubtitle}>{short_description}</p>
                <p className={classes.auctionGeo}>{geo}</p>
            </div>
        </div>
    )
}

export default RelatedAuctionContent