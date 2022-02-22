import {useForm} from "react-hook-form";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getEndDateAuction} from "../../helpers/auction-functions";
import {createNewAuctionDocument} from "../../firebase/firebase.utils";
import FormSuccessAlert from "../form-success-alert/form-success-alert";
import AuctionInfoStep from "./steps/auction-info-step";
import CarInfoStep from "./steps/car-info-step";
import AuctionDetailStep from "./steps/auction-detail-step";
import {convertStateToHtml, useFormProgress} from "./form-utils";

import classes from "./sell-car-hook-form.module.css";


const SellCarHookForm = () => {
    const currentDate = new Date();
    const [auctionId, setAuctionId] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitSuccessful},
        control,
        trigger,
        getValues
    } = useForm({
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

    const steps = [
        <AuctionInfoStep auctionId={auctionId} setValue={setValue} register={register} errors={errors}/>,
        <CarInfoStep errors={errors} register={register}/>,
        <AuctionDetailStep control={control}/>,
    ];
    const [currentStep, goForward, goBack] = useFormProgress();
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    if (auctionId === '') {
        const date = Date.now();
        let newId = currentUser.uid + '-' + date;
        setAuctionId(newId);
        register('id', {value: newId});
    }

    const submitFormHandle = async (data) => {
        const descriptions = data.descriptions;
        const newDescriptions = convertStateToHtml(descriptions);
        const newData = {...data, descriptions: newDescriptions}

        await createNewAuctionDocument(newData);
    }


    async function submitBtnHandler(event) {
        if (!isLast) {
            const response = await trigger();
            if (response) {
                goForward(event);
            }
        }
    }

    return (
        <>
            {
                isSubmitSuccessful
                    ? <FormSuccessAlert/>
                    : <form onSubmit={handleSubmit(submitFormHandle)} className={classes.form}>
                        <div className={classes.formProgress}>
                            Step {currentStep + 1} of {steps.length}
                        </div>

                        {steps[currentStep]}

                        <div className={classes.progressNav}>
                            {!isFirst && <button onClick={(event) => goBack(event)} className="btn">Go Back</button>}

                            <button
                                type="submit"
                                onClick={submitBtnHandler}
                                className="btn btn-primary"
                            >
                                {isLast ? "Submit" : "Next"}
                            </button>
                        </div>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={() => {*/}
                        {/*        const values = getValues();*/}
                        {/*        console.log(values);*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Get Values*/}
                        {/*</button>*/}
                    </form>
            }
        </>
    )
}

export default SellCarHookForm;