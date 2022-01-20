import SellCarHookForm from "../../components/sell-car-hook-form/sell-car-hook-form";

import classes from "./sell-car.module.css";


const SellCar = () => {

    return (
        <div className={classes.sellCarContainer}>
            <h3>Sell your Car on AutoBids</h3>
            <SellCarHookForm/>
        </div>
    )
}

export default SellCar