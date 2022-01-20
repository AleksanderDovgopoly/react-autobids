import {Fragment} from "react";
import {useSelector} from "react-redux";
import StatsTimeLeft from "./stats-time-left/stats-time-left";
import StatsCurrentBid from "./stats-current-bid/stats-current-bid";
import StatsBidsCounter from "./stats-bids-counter/stats-bids-counter";
import StatsViewsCounter from "./stats-views-counter/stats-views-counter";
import StatsSoldPrice from "./stats-sold-price/stats-sold-price";
import StatsSoldDate from "./stats-sold-date/stats-sold-date";

import classes from "./auction-header-bar.module.css";


const AuctionHeaderBar = () => {
    const {start_price, current_price, bids_history, views, end_date, status} = useSelector(state => state.detail.data);

    return (
        <div className={classes.auctionHeaderBar}>
            <div
                className={classes.bidStats}
                style={status === 'past' ? {width: '100%'} : null}
            >
                {
                    status === 'active'
                        ? <Fragment>
                            <StatsTimeLeft endDate={end_date}/>
                            <StatsCurrentBid bid={current_price} startPrice={start_price}/>
                        </Fragment>
                        : <Fragment>
                            <StatsSoldPrice price={current_price}/>
                            <StatsSoldDate endDate={end_date}/>
                        </Fragment>
                }
                <StatsBidsCounter bidHistory={bids_history}/>
                <StatsViewsCounter views={views}/>
            </div>
            {
                status === 'active'
                    ? <button className="btn btn-primary signInBtn">Place Bid</button>
                    : null
            }

        </div>
    )
}

export default AuctionHeaderBar;