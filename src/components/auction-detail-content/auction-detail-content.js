import {useSelector} from "react-redux";
import {Carousel} from 'react-carousel-minimal';
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import CommentBox from "../comment-box/comment-box";
import AuctionDetailSummary from "../auction-detail-summary/auction-detail-summary";
import {updateAuctionViewsById} from "../../firebase/firebase.utils";

import classes from "./auction-detail-content.module.css";
import AuctionSpec from "../auction-detail-spec/auction-detail-spec";
import NewListingsSidebar from "../sidebars/new-listings-sidebar/new-listings-sidebar";


const AuctionDetailContent = () => {
    const {
        title,
        short_description,
        photos,
        id
    } = useSelector(state => state.detail.data)

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));
    updateAuctionViewsById(id);


    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div className={classes.auctionDetailHeading}>
                    <h2>{title}</h2>
                    <span>{short_description}</span>
                </div>
                <AuctionHeaderBar/>
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
                {/*<AuctionDetailSummary/>*/}
            </div>
            <div className={classes.withSidebar}>
                <div className={classes.col}>
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