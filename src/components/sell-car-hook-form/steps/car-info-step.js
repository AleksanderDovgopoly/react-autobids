import Input from "../../form-input-hook/form-input-hook";
import FormSelect from "../../form-select-fetch/form-select-fetch";
import classes from "../sell-car-hook-form.module.css";

const CarInfoStep = ({errors, register}) => {
  return (
      <fieldset>
          <h2>Car info</h2>
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
  )
}

export default CarInfoStep;