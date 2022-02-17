import {Item} from "react-photoswipe-gallery";
import classes from "./image-gallery.module.css";

const GalleryImagesItem = ({image, index, title, count}) => {
    return (
        <div>
            <Item
                key={index}
                original={image.image}
                thumbnail={image.image}
                width="1024"
                height="683"
            >
                {
                    ({ref, open}) => {
                        if (index === 5) {
                            return <>
                                <img ref={ref} src={image.image} alt={`${title}-${index + 1}`}/>
                                <div className={classes.all} onClick={open}>All Photos ({count})</div>
                            </>
                        } else {
                            return <img ref={ref} onClick={open} src={image.image} alt={`${title}-${index + 1}`}/>
                        }

                    }
                }
            </Item>
        </div>
    )
}

export default GalleryImagesItem;