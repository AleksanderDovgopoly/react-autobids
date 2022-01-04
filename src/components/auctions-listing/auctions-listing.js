
import classes from "./auctions-listing.module.css";

const AuctionsListing = () => {

    return (
        <div className={classes.auctionListContainer}>
            <h3>Auctions</h3>
            <ul className={classes.auctionList}>
                <li className={classes.auctionItem}>
                    <div
                        className='image'
                        style={{
                            backgroundImage: 'url(/gt-85.jpg)'
                        }}
                    />
                </li>
            </ul>
        </div>
    )
}

export default AuctionsListing