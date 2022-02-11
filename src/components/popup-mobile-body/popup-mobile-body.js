import classes from "./popup-mobile-body.module.css";

const PopupMobileBody = ({title, close, content}) => {
    return (
        <div className={classes.modalBody}>
            <button className={classes.close} onClick={() => {
                close()
            }}>
                <span aria-hidden="true">×</span>
            </button>
            <div className={classes.modalHeading}>
                <h6>{title}</h6>
            </div>
            {content}
        </div>
    )
}

export default PopupMobileBody;