import {useEffect, useState} from "react";
import {getCategoriesListBySlug} from "../../firebase/firebase.utils";

import classes from "../form-input-hook/form-input-hook.module.css";

const FormSelect = ({label, catSlug, register, name, isRequired, errors}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [bodyStyleList, setBodyStyleList] = useState('');

    useEffect(async () => {
        if (!isFetching) {
            const fetchingData = await getCategoriesListBySlug(catSlug);
            setBodyStyleList(fetchingData);
            setIsFetching(true);
        }
    });

    return (
        <label>{label}
            <select {...register(name, {required: isRequired ? "This field is required!" : false})} >
                <option value="" selected disabled hidden>Choose here</option>
                {
                    isFetching
                        ? Object.entries(bodyStyleList).map(([key, value], index) => {
                            return (
                                <option value={key}>{value}</option>
                            )
                        })
                        : <option>Loading</option>
                }
            </select>
            {
                errors && errors[name]
                    ? <p className={classes.warning}>{errors[name].message || "Error!"}</p>
                    : null
            }
        </label>
    )
}

export default FormSelect;