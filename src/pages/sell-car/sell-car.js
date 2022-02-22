import SellCarHookForm from "../../components/sell-car-hook-form/sell-car-hook-form";
import classes from "./sell-car.module.css";

const SellCar = () => {
    return (
        <div className={classes.sellCarContainer}>
            <div className={classes.col}>
                <h1>Sell your Car on AutoBids</h1>
                <SellCarHookForm/>
            </div>
        </div>
    )
}

export default SellCar