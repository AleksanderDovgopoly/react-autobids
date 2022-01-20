const StatsBidsCounter = ({bidHistory}) => {
    return (
        <div>
            <span>#Bids: </span>
            {
                bidHistory
                    ? bidHistory.length
                    : 0
            }
        </div>
    )
}

export default StatsBidsCounter;