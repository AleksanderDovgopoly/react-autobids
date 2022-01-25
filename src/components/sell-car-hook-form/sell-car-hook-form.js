import {useForm} from "react-hook-form";
import Input from "../form-input-hook/form-input-hook";
import InputUploadPhoto from "../form-input-upload/form-input-upload";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getEndDateAuction} from "../../helpers/auction-functions";
import {createNewAuctionDocument} from "../../firebase/firebase.utils";
import {convertToRaw} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import FormSuccessAlert from "../form-success-alert/form-success-alert";
import FormSelect from "../form-select-fetch/form-select-fetch";
import WYSIWYGEditor from "../WYSIWYGEditor/WYSIWYGEditor";

import classes from "./sell-car-hook-form.module.css";


const SellCarHookForm = () => {
    const currentDate = new Date();
    const [auctionId, setAuctionId] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);
    const {register, handleSubmit, setValue, formState: {errors, isSubmitSuccessful}, control, getValues} = useForm({
        defaultValues: {
            spec: {},
            descriptions: {},
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

    function convertStateToHtml(descriptions) {
        let newDescriptionsObj = {};
        Object.keys(descriptions).map((key) => {
            newDescriptionsObj[key] = draftToHtml(convertToRaw(descriptions[key].getCurrentContent()));
        })

        return newDescriptionsObj;
    }

    const submitFormHandle = async (data) => {
        const descriptions = data.descriptions;
        const newDescriptions = convertStateToHtml(descriptions);
        const newData = {...data, descriptions: newDescriptions}

        await createNewAuctionDocument(newData);
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
                            <FormSelect label="Transmission"
                                        name="spec.transmission"
                                        catSlug="transmission"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                            />
                            <Input label="Drivetrain" name="spec.drivetrain" register={register} errors={errors}
                                   isRequired={true}/>
                            <FormSelect label="Body style"
                                        name="spec.body_style"
                                        catSlug="body_style"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                            />
                            <Input label="VIN" name="spec.vin" register={register} errors={errors} isRequired={true}/>
                            <FormSelect label="Year release"
                                        name="year_release"
                                        catSlug="year_release"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                            />
                            <Input label="Mileage" name="spec.mileage" type={'number'} register={register} errors={errors}
                                   isRequired={true}/>
                            {
                                errors && errors.spec ?
                                    <p className={classes.warning}>All spec field are required!</p> : null
                            }
                        </fieldset>
                        <fieldset className={classes.fullwidth}>
                            <label>Highlights</label>
                            <WYSIWYGEditor editorName='highlights' control={control}/>
                            <label>Equipment</label>
                            <WYSIWYGEditor editorName='equip' control={control}/>
                            <label>Modifications</label>
                            <WYSIWYGEditor editorName='mods' control={control}/>
                            <label>Known Flaws</label>
                            <WYSIWYGEditor editorName='flaws' control={control}/>
                            <label>Recent Service History</label>
                            <WYSIWYGEditor editorName='service_history' control={control}/>
                            <label>Other Items Included in Sale</label>
                            <WYSIWYGEditor editorName='other_items' control={control}/>
                            <label>Ownership History</label>
                            <WYSIWYGEditor editorName='owner_history' control={control}/>
                        </fieldset>

                        <input type="submit"/>
                        <button
                            type="button"
                            onClick={() => {
                                const values = getValues();
                                console.log(values);
                            }}
                        >
                            Get Values
                        </button>
                    </form>
            }
        </>
    )
}

export default SellCarHookForm;