import { Carousel } from 'react-carousel-minimal';

import classes from "./auction-detail-content.module.css";

const AuctionDetailContent = (props) => {
    const {title, short_description, current_price, start_price, geo, photos, id} = props.item;

    const sliderData = Object.entries(photos).map((e) => ( { image: e[1] } ));

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <div className={classes.auctionDetailContent}>
            <div className={classes.auctionDetailHeader}>
                <div>
                    <h2>{title}</h2>
                    <span>{short_description}</span>
                </div>
                <div className={classes.auctionHeaderBar}>
                    <div>
                        <span>Start price: </span>
                        ${start_price}
                    </div>
                    <div>
                         <span>Current price: </span>
                        ${current_price || start_price}
                    </div>
                </div>
            </div>
            <Carousel
                data={sliderData}
                time={3000}
                width="850px"
                height="500px"
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                    textAlign: "center",
                    maxWidth: "850px",
                    maxHeight: "500px",
                    margin: "40px auto",
                }}
            />
        </div>
    )
}

export default AuctionDetailContent