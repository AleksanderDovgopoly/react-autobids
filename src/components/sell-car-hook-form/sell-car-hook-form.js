import {useForm} from "react-hook-form";
import Input from "../form-input-hook/form-input-hook";
import InputUploadPhoto from "../form-input-upload/form-input-upload";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getEndDateAuction} from "../../helpers/auction-functions";
import {createNewAuctionDocument} from "../../firebase/firebase.utils";
import FormSuccessAlert from "../form-success-alert/form-success-alert";

import classes from "./sell-car-hook-form.module.css";


const SellCarHookForm = () => {
    const currentDate = new Date();
    const [auctionId, setAuctionId] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);
    const {register, handleSubmit, setValue, setError, formState: {errors, isSubmitSuccessful}} = useForm({
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
        // console.log("Submit data: ", data)
        await createNewAuctionDocument(data);
    }


    return (
        <>
            {
                isSubmitSuccessful
                    ? <FormSuccessAlert/>
                    : <form onSubmit={handleSubmit(submitFormHandle)} className={classes.form}>
                        <fieldset>
                            <Input label="Auction Title" name="title" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Short description" name="short_description" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Start price, $" name="start_price" type='number' register={register}
                                   isRequired={false}/>
                            <Input label="Increase Bid step, $" name="bids_step" type='number' register={register}
                                   isRequired={false}/>
                            <Input label="Location" name="geo" register={register} errors={errors} isRequired={true}/>
                            <InputUploadPhoto setFormData={setValue} auctionId={auctionId}/>
                        </fieldset>
                        <hr/>
                        <fieldset>
                            <Input label="Make" name="spec.make" register={register} errors={errors} isRequired={true}/>
                            <Input label="Model" name="spec.model" register={register} errors={errors} isRequired={true}/>
                            <Input label="Interior" name="spec.interior" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Exterior" name="spec.exterior" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Engine" name="spec.engine" register={register} errors={errors} isRequired={true}/>
                            <Input label="Transmission" name="spec.transmission" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Body style" name="spec.body_style" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="Drivetrain" name="spec.drivetrain" register={register} errors={errors}
                                   isRequired={true}/>
                            <Input label="VIN" name="spec.vin" register={register} errors={errors} isRequired={true}/>
                            <Input label="Mileage" name="spec.mileage" register={register} errors={errors}
                                   isRequired={true}/>
                            {
                                errors && errors.spec ?
                                    <p className={classes.warning}>All spec field are required!</p> : null
                            }
                        </fieldset>

                        <input type="submit"/>
                    </form>
            }
        </>
    )
}

export default SellCarHookForm;