import classes from "./description-item.module.css";

const DescriptionItem = ({title, content}) => {
    return (
        <div className={classes.descriptionItem}>
            <h4>{title}</h4>
            <div className={classes.descriptionBody} dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    )
}

export default DescriptionItem;