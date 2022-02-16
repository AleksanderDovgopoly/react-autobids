import {Item} from "react-photoswipe-gallery";
import classes from "./image-gallery.module.css";

const GalleryMainItem = ({image, title}) => {
    return (
        <div className={classes.mainImage}>
            <Item
                original={image.image}
                thumbnail={image.image}
                width="1024"
                height="683"
            >
                {({ref, open}) => (
                    <img ref={ref} onClick={open} src={image.image} alt={`${title}-1`}/>
                )}
            </Item>
        </div>
    )
}

export default GalleryMainItem;