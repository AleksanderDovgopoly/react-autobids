import {useSelector} from "react-redux";
import {Carousel} from 'react-carousel-minimal';
import moment from "moment";
import {updateAuctionViewsById} from "../../firebase/firebase.utils";
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import CommentBox from "../comment-box/comment-box";
import AuctionSpec from "../auction-detail-spec/auction-detail-spec";
import NewListingsSidebar from "../sidebars/new-listings-sidebar/new-listings-sidebar";
import SetBidBar from "../set-bid-bar/set-bid-bar";

import classes from "./auction-detail-content.module.css";


const AuctionDetailContent = () => {
    const {title, short_description, photos, id, end_date} = useSelector(state => state.detail.data);

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));

    const endingMoment = moment.unix(end_date.seconds);
    const endingDate = endingMoment.format("MMM D YYYY, h:mm a");

    //views counter
    updateAuctionViewsById(id);

    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div className={classes.auctionDetailHeading}>
                    <h2>{title}</h2>
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
                />
                <SetBidBar/>
            </div>
            <div className={classes.withSidebar}>
                <div className={classes.col}>
                    <AuctionHeaderBar/>
                    <AuctionSpec/>
                    <CommentBox auctionId={id}/>
                </div>
                <div className={classes.sidebar}>
                    <NewListingsSidebar/>
                </div>
            </div>
        </div>
    )
}

export default AuctionDetailContent