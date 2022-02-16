import {Gallery} from 'react-photoswipe-gallery';
import GalleryMainItem from "./gallery-main-item";
import GalleryImages from "./gallery-images";

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import classes from "./image-gallery.module.css";


const ImageGallery = ({images, title}) => {
    return (
        <div className={classes.galleryWrapper}>
            <Gallery>
                <GalleryMainItem image={images[0]} title={title}/>
                <GalleryImages images={images} title={title}/>
            </Gallery>
        </div>
    )
}

export default ImageGallery