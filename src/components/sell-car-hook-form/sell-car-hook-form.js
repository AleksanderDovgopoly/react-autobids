import {useForm} from "react-hook-form";
import Input from "../form-input-hook/form-input-hook";
import InputUploadPhoto from "../form-input-upload/form-input-upload";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getEndDateAuction} from "../../helpers/auction-functions";
import {createNewAuctionDocument} from "../../firebase/firebase.utils";

import classes from "./sell-car-hook-form.module.css";


const SellCarHookForm = () => {
    const currentDate = new Date();
    const [auctionId, setAuctionId] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);
    const { register, handleSubmit, setValue, formState: { isSubmitSuccessful } } = useForm({
        defaultValues: {
            spec: {},
            seller: {
                id: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
            },
            views: 0,
            start_date: currentDate,
            end_date: getEndDateAuction(currentDate),
            status: 'active'
            // ToDo: change status to 'pending'
        }
    });

    if (auctionId === '') {
        const date = Date.now();
        let newId = currentUser.uid + '-' + date;
        setAuctionId(newId);
        register('id', {value: newId});
    }

    const submitFormHandle = async (data) => {
        // console.log(data)
        await createNewAuctionDocument(data);
    }

    return (
        <form onSubmit={handleSubmit(submitFormHandle)} className={classes.form}>
            <fieldset>
                <Input label="Auction Title" name="title" register={register} required={true} />
                <Input label="Short description" name="short_description" register={register} required={true}  />
                <Input label="Start price, $" name="start_price" type='number' register={register} required={false}  />
                <Input label="Increase Bid step, $" name="bids_step" type='number' register={register} required={false}  />
                <Input label="Location" name="geo" register={register} required={true} />
                <InputUploadPhoto setFormData={setValue} auctionId={auctionId} />
            </fieldset>
            <hr/>
            <fieldset>
                <Input label="Make" name="spec.make" register={register} required={true} />
                <Input label="Model" name="spec.model" register={register} required={true} />
                <Input label="Interior" name="spec.interior" register={register} required={true} />
                <Input label="Exterior" name="spec.exterior" register={register} required={true} />
                <Input label="Engine" name="spec.engine" register={register} required={true} />
                <Input label="Transmission" name="spec.transmission" register={register} required={true} />
                <Input label="Body style" name="spec.body_style" register={register} required={true} />
                <Input label="Drivetrain" name="spec.drivetrain" register={register} required={true} />
                <Input label="VIN" name="spec.vin" register={register} required={true} />
                <Input label="Mileage" name="spec.mileage" register={register} required={true} />
            </fieldset>

            <input type="submit" />
            {
                isSubmitSuccessful ? <p>Submit Success</p> : null
            }
        </form>
    )
}

export default SellCarHookForm;