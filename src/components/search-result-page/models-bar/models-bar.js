import {useSelector} from "react-redux";
import ModelsBarItem from "../models-bar-item/models-bar-item";
import classes from "./models-bar.module.css";

const ModelsBar = ({currentMade}) => {
    const {brand_models} = useSelector(state => state.categories);
    const currentModelsList = brand_models[currentMade].models;

    return (
        <div className={classes.modelsBar}>
            <ul className={classes.modelsList}>
                {
                    Object.entries(currentModelsList).map(([key, itemName]) => {
                        return <ModelsBarItem key={key} itemName={itemName} itemSlug={key} currentBrand={currentMade}/>
                    })
                }
            </ul>
        </div>
    )
}

export default ModelsBar;