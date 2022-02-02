import {createSearchParams} from "react-router-dom";

export const isUserAlreadyVoted = (repArr, userId) => {
    if (typeof repArr !== 'object') return;
    let response = repArr.includes(userId);

    return response;
}

export const bidCountFromCommentsList = (commentsList) => {
    const bidsCount = commentsList.filter(item => {
        return item.type === 'bid'
    }).length;

    return bidsCount;
}

export const calculateLeftTime = (UNIX_timestamp) => {
    let response = '';

    const currentDate = new Date();
    const endDate = new Date(UNIX_timestamp.seconds * 1000);
    const leftDate = new Date(endDate - currentDate);

    let month = leftDate.getUTCMonth();
    let date = leftDate.getUTCDate();
    let hour = leftDate.getUTCHours();
    let min = addZero(leftDate.getUTCMinutes());
    let sec = addZero(leftDate.getUTCSeconds());

    if (month > 2) {
        return 'Sold';
    }

    if (date > 7) {
        return 'Start soon';
    }

    response = date + ' days';

    if (date === 1) {
        response = hour + ':' + min + ':' + sec;
    }

    return response;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

export const getEndDateAuction = (UNIX_timestamp) => {
    let days = 7;
    const startDate = new Date(UNIX_timestamp);
    let endDateUnicode = startDate.setTime(startDate.getTime() + (days * 24 * 60 * 60 * 1000));
    let endDate = new Date(endDateUnicode);

    return endDate;
}

export const getAuthorNameByCommentId = (commentId, comments, usersData) => {
    const replyComment = Object.values(comments).find(item => item.id === commentId);
    const replyCommentAuthor = Object.values(usersData).find(item => item.id === replyComment.author_id);
    return replyCommentAuthor.displayName;
}

export const appendSearchParams = (obj, searchParams) => {
    const sp = createSearchParams(searchParams);
    Object.entries(obj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            sp.delete(key);
            value.forEach((v) => sp.append(key, v));
        } else if (value === undefined || value === null) {
            sp.delete(key);
        } else {
            sp.set(key, value);
        }
    });
    return sp;
}

export const doSortAuctionsList = (auctionsArr, sortType) => {

    switch (sortType) {
        case 'highest_price':
            return auctionsArr.sort(function (x, y) {
                return y.current_price - x.current_price;
            });
        case 'lowest_price':
            return auctionsArr.sort(function (x, y) {
                return x.current_price - y.current_price;
            });

        case 'highest_mileage':
            return auctionsArr.sort(function (x, y) {
                return y.spec.mileage - x.spec.mileage;
            });
        case 'lowest_mileage':
            return auctionsArr.sort(function (x, y) {
                return x.spec.mileage - y.spec.mileage;
            });
        case 'recently_ended':
            return auctionsArr.sort(function (x, y) {
                return y.end_date - x.end_date;
            });

        default:
            return auctionsArr.sort(function (x, y) {
                return x.end_date - y.end_date;
            });
    }
}

export const doFilterAuctions = (auctionsArr, transmissionFilter, bodyFilter, startYear, endYear) => {
    if (transmissionFilter) {
        auctionsArr = auctionsArr.filter(auction => {
            return auction.spec.transmission.includes(transmissionFilter);
        });
    }

    if (bodyFilter) {
        auctionsArr = auctionsArr.filter(auction => {
            return auction.spec.body_style.includes(bodyFilter);
        });
    }

    if (startYear) {
        auctionsArr = auctionsArr.filter(auction => {
            return auction.year_release >= startYear;
        });
    }

    if (endYear) {
        auctionsArr = auctionsArr.filter(auction => {
            return auction.year_release <= endYear;
        });
    }

    return auctionsArr;
}