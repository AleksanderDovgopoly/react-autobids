import Input from "../../form-input-hook/form-input-hook";
import InputUploadPhoto from "../../form-input-upload/form-input-upload";

const AuctionInfoStep = ({auctionId, register, setValue, errors}) => {
    return (
        <fieldset>
            <h2>Auction info</h2>
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
    )
}

export default AuctionInfoStep;