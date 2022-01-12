export const calculateLeftTime = (UNIX_timestamp) => {
    let days = 7;
    let timeLeft = 0;
    const startDate = new Date(UNIX_timestamp * 1000);
    let endDateUnicode = startDate.setTime(startDate.getTime() + (days * 24 * 60 * 60 * 1000));
    let endDate = new Date(endDateUnicode);

    const currentDate = new Date();
    timeLeft = new Date(endDate.getTime() - currentDate.getTime());
    let month = timeLeft.getMonth();
    let date = timeLeft.getDate();
    let hour = timeLeft.getHours();
    let min = timeLeft.getMinutes();
    let sec = timeLeft.getSeconds();
    // let time = date + ' ' + month + ' ' + hour + ':' + min + ':' + sec;
    let time = date + ' days ' + hour + ':' + min + ':' + sec;

    if (month > 2) {
        return 'Sold';
    }

    if (date > 7) {
        return 'Start soon';
    }

    return time;
}

export const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + hour + ':' + min + ':' + sec;
    return time;
}