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