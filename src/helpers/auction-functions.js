export const calculateLeftTime = (start_date) => {
    Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    let timeLeft = 0;
    const startDate = new Date(start_date.seconds * 1000);
    const endDate = startDate.addDays(5);
    const currentDate = new Date();
    timeLeft = new Date(endDate.getTime() - currentDate.getTime());

    return timeLeft;
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