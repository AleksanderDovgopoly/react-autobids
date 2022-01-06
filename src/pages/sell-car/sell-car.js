import SellCarForm from "../../components/sell-car-form/sell-car-form";

import classes from "./sell-car.module.css";


const SellCar = () => {

    return (
        <div className={classes.sellCarContainer}>
            <h3>Sell your Car on AutoBids</h3>
            <SellCarForm/>
        </div>
    )
}

export default SellCar