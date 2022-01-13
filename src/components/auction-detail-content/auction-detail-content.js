import {useSelector} from "react-redux";
import {Carousel} from 'react-carousel-minimal';
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import SetBidBar from "../set-bid-bar/set-bid-bar";
import CommentBox from "../comment-box/comment-box";

import classes from "./auction-detail-content.module.css";


const AuctionDetailContent = () => {
    const {
        title,
        short_description,
        photos,
        id
    } = useSelector(state => state.detail.data)

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));


    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div className={classes.auctionDetailHeading}>
                    <h2>{title}</h2>
                    <span>{short_description}</span>
                </div>
                <AuctionHeaderBar />
            </div>
            <div className={classes.sliderContainer}>
                <Carousel
                    data={sliderData}
                    time={3000}
                    width="850px"
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
            </div>
            <SetBidBar />
            <CommentBox auctionId={id}/>
        </div>
    )
}

export default AuctionDetailContent