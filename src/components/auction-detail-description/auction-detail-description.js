import DescriptionItem from "./description-item/description-item";
import classes from "./auction-detail-description.module.css";

const AuctionDetailDescription = ({descriptionsList}) => {
    return (
        <div className={classes.descriptionWrapper}>
            <DescriptionItem title="Highlights" content={descriptionsList.highlights}/>
            <DescriptionItem title="Equipment" content={descriptionsList.equip}/>
            <DescriptionItem title="Modifications" content={descriptionsList.mods}/>
            <DescriptionItem title="Known Flaws" content={descriptionsList.flaws}/>
            <DescriptionItem title="Recent Service History" content={descriptionsList.service_history}/>
            <DescriptionItem title="Other Items Included in Sale" content={descriptionsList.other_items}/>
            <DescriptionItem title="Ownership History" content={descriptionsList.owner_history}/>
        </div>
    )
}

export default AuctionDetailDescription;