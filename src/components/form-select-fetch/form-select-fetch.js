import {useEffect, useState} from "react";
import {getCategoriesListBySlug} from "../../firebase/firebase.utils";

import classes from "../form-input-hook/form-input-hook.module.css";

const FormSelect = ({label, catSlug, register, name, isRequired, errors}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [categoriesList, setCategoriesList] = useState('');

    useEffect(async () => {
        if (!isFetching) {
            const fetchingData = await getCategoriesListBySlug(catSlug);
            setCategoriesList(fetchingData);
            setIsFetching(true);
        }
    }, [isFetching, catSlug]);

    return (
        <label>{label}
            <select {...register(name, {required: isRequired ? "This field is required!" : false})} defaultValue=''>
                <option value="" disabled hidden>Choose here</option>
                {
                    isFetching
                        ? Object.entries(categoriesList).map(([key, value], index) => {
                            return (
                                <option key={index} value={key}>{value}</option>
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