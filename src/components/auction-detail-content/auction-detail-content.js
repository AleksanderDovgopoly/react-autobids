import {Carousel} from 'react-carousel-minimal';

import classes from "./auction-detail-content.module.css";
import AuctionHeaderBar from "../auction-header-bar/auction-header-bar";
import SetBidBar from "../set-bid-bar/set-bid-bar";


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
        bids_step
    } = props.item;

    const sliderData = Object.entries(photos).map((e) => ({image: e[1]}));


    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div>
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
                style={{
                    display: "contents",
                    textAlign: "center",
                    maxWidth: "850px",
                    maxHeight: "500px",
                    margin: "40px auto",
                }}
            />
            <SetBidBar current_price={current_price} step={bids_step} auctionId={id} startPrice={start_price}/>
        </div>
    )
}

export default AuctionDetailContent