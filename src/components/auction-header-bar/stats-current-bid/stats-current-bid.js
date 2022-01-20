const StatsCurrentBid = ({bid, startPrice}) => {
    return (
        <div>
            <span>Current bid: </span>
            ${bid || startPrice}
        </div>
    )
}

export default StatsCurrentBid;