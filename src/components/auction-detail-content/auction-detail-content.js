import {Carousel} from 'react-carousel-minimal';
import moment from "moment";
import {updateAuctionViewsById} from "../../firebase/firebase.utils";
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import CommentBox from "../comment-box/comment-box";
import AuctionSpec from "../auction-detail-spec/auction-detail-spec";
import NewListingsSidebar from "../sidebars/new-listings-sidebar/new-listings-sidebar";
import AuctionDetailDescription from "../auction-detail-description/auction-detail-description";
import EndingSoonSidebar from "../sidebars/ending-soon-sidebar/ending-soon-sidebar";
import AuctionDetailJump from "../auction-detail-jump/auction-detail-jump";
import AuctionDetailStats from "../auction-detail-stats/auction-detail-stats";
import WatchListButton from "../UI/watch-list-button/watch-list-button";

import classes from "./auction-detail-content.module.css";


const AuctionDetailContent = ({auctionData}) => {
    const {title, short_description, photos, id, end_date, descriptions} = auctionData;

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));
    console.log(sliderData)

    const endingMoment = moment.unix(end_date.seconds);
    const endingDate = endingMoment.format("MMM D YYYY, h:mm a");

    //views counter
    updateAuctionViewsById(id);

    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div className={classes.auctionDetailHeading}>
                    <h2>{title}</h2>
                    <WatchListButton auctionId={id} />
                    <span>{short_description}</span>
                </div>
                <div className={classes.ending}>
                    <span>Ending: </span>
                    {endingDate}
                </div>
            </div>
            <div className={classes.sliderContainer}>
                <Carousel
                    data={sliderData}
                    time={3000}
                    width="1440px"
                    height="500px"
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    classname={classes.auctionDetailContent}
                    style={{
                        maxWidth: "100%",
                    }}
                />
            </div>
            <div className={classes.withSidebar}>
                <div className={classes.col}>
                    <AuctionHeaderBar auctionData={auctionData}/>
                    <AuctionSpec auctionData={auctionData}/>
                    {
                        descriptions && <AuctionDetailDescription descriptionsList={descriptions}/>
                    }
                    <AuctionDetailJump title={title} />
                    <AuctionDetailStats />
                    <CommentBox auctionId={id}/>
                </div>
                <div className={classes.sidebar}>
                    <NewListingsSidebar/>
                    <EndingSoonSidebar/>
                </div>
            </div>
        </div>
    )
}

export default AuctionDetailContent