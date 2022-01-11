import {Carousel} from 'react-carousel-minimal';

import classes from "./auction-detail-content.module.css";
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import SetBidBar from "../set-bid-bar/set-bid-bar";
import BidsHistory from "../bids-history/bids-history";
import CommentBox from "../comment-box/comment-box";
import CommentsList from "../comments-list/comments-list";


const AuctionDetailContent = (props) => {
    const {
        title,
        short_description,
        current_price,
        start_price,
        geo,
        photos,
        id,
        bids_history,
        start_date,
        bids_step,
        comments,
    } = props.item;

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));


    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div className={classes.auctionDetailHeading}>
                    <h2>{title}</h2>
                    <span>{short_description}</span>
                </div>
                <AuctionHeaderBar
                    start_price={start_price}
                    current_price={current_price}
                    bids_history={bids_history}
                    start_date={start_date}
                />
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
                <BidsHistory history={bids_history} />
            </div>
            <SetBidBar current_price={current_price} step={bids_step} auctionId={id} startPrice={start_price}/>
            <CommentBox auctionId={id} />
            <CommentsList commentsList={comments} />
        </div>
    )
}

export default AuctionDetailContent