import {Link} from "react-router-dom";

const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
            to='mailto'
            onClick={(e) => {
                window.location = `mailto:${mailto}`;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default ButtonMailto;