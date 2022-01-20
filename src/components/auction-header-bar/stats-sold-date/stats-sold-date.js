import moment from "moment";

const StatsSoldDate = ({endDate}) => {
    const endMoment = moment.unix(endDate.seconds);
    const showDate = endMoment.format('M/DD/YY');

    return (
        <div>
            <span>{showDate}</span>
        </div>
    )
}

export default StatsSoldDate