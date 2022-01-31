import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {togglePopupAuth} from "../../redux/user/user.actions";
import StatsTimeLeft from "./stats-time-left/stats-time-left";
import StatsCurrentBid from "./stats-current-bid/stats-current-bid";
import StatsBidsCounter from "./stats-bids-counter/stats-bids-counter";
import StatsViewsCounter from "./stats-views-counter/stats-views-counter";
import StatsSoldPrice from "./stats-sold-price/stats-sold-price";
import StatsSoldDate from "./stats-sold-date/stats-sold-date";

import classes from "./auction-header-bar.module.css";


const AuctionHeaderBar = () => {
    const {start_price, current_price, views, end_date, status} = useSelector(state => state.detail.data);
    const {isLogin} = useSelector(state => state.user);
    const dispatch = useDispatch();

    function setNewBid() {
        if (!isLogin) {
            dispatch(togglePopupAuth())
            return;
        }
        console.log('Scroll to set bid block here');
    }

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
                <StatsBidsCounter/>
                <StatsViewsCounter views={views}/>
            </div>
            {
                status === 'active'
                    ? <button className="btn btn-primary signInBtn" onClick={() => setNewBid()}>Place Bid</button>
                    : null
            }
        </div>
    )
}

export default AuctionHeaderBar;