import GalleryImagesItem from "./gallery-images-item";
import classes from "./image-gallery.module.css";

const GalleryImages = ({images, title}) => {
    const count = images.length;
    const filteredImages = images.splice(1, 6);

    return (
        <div className={classes.images}>
            {
                filteredImages.map((image, index) => (
                    <GalleryImagesItem key={index} image={image} title={title} count={count} index={index}/>
                ))
            }
        </div>
    )
}

export default GalleryImages