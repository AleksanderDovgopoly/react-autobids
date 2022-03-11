import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import moment from "moment";
import {fetchCommentsByAuctionId, updateAuctionStatus} from "../../../firebase/firebase.utils";

import classes from "./listings.module.css";


const ListingsAuctionItem = ({auctionData}) => {
    const client = useQueryClient();
    const {id, title, photos, status, end_date, views, current_price} = auctionData;
    const [bidsCount, setBidsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    let mainPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_photo.png?alt=media&token=b48f8851-a485-4743-bf51-31d0749de73b';
    if (photos.length) {
        mainPhoto = photos[0];
    }

    const viewLink = `/auctions/${id}`;
    const formattedEndDate = moment.unix(end_date.seconds).format("MMMM D YYYY, h:mm a");
    const {data, isSuccess} = useQuery(['comments', id], () => fetchCommentsByAuctionId(id));

    useEffect(() => {
        if (isSuccess) {
            setBidsCount(data.filter(item => item.type === 'bid').length);
            setCommentsCount(data.filter(item => item.type === 'comment').length);
        }
    }, [isSuccess])

    const deactivateHandler = async () => {
        await updateAuctionStatus(id, 'past');
        await client.invalidateQueries('auctions');
    };


    return (
        <li className={classes.auctionsListItem}>
            <div className={classes.image} style={{backgroundImage: `url('${mainPhoto}')`}}/>
            <div className={classes.info}>
                <h4>{title}</h4>
                <div className={classes.date}>
                    <span>Ending: </span>
                    {formattedEndDate}
                </div>
                <div className={classes.stats}>
                    {
                        status === 'active'
                            ? <div className={classes.currentStep}>
                                <span>$</span>{current_price}
                            </div>
                            : null
                    }
                    <div className={classes.viewsIcon}>{views}</div>
                    <div className={classes.bidsIcon}>{bidsCount}</div>
                    <div className={classes.commentsIcon}>{commentsCount}</div>
                </div>
            </div>
            <div className={classes.actions}>
                {
                    status === 'active'
                        ? <button className="btn" onClick={deactivateHandler}>Deactivate</button>
                        : <div className={classes.soldPrice}>
                            Sold for<br/>
                            <span>${current_price}</span>
                        </div>
                }
                <Link to={viewLink} className="btn">View</Link>
            </div>
        </li>
    )
}

export default ListingsAuctionItem;