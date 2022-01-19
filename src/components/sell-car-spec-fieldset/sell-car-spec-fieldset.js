import {useState} from "react";
import FormInput from "../form-input/form-input";

const SpecFieldset = (props) => {
    const {setFormState} = props;
    const [specData, setSpecData] = useState({
            make: '',
            model: '',
            exterior: '',
            interior: '',
            transmission: '',
            engine: '',
            body_style: '',
            drivetrain: '',
            mileage: '',
            vin: '',
        }
    );

    const handleChange = event => {
        const {name, value} = event.target;
        setSpecData({...specData, [name]: value});
        setFormState(specData);
    }

    console.log('Spec: ', specData)

    return (
        <fieldset>
            <FormInput
                type='text'
                name='make'
                label='Make'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='model'
                label='Model'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='interior'
                label='Interior'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='exterior'
                label='Exterior'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='transmission'
                label='Transmission'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='engine'
                label='Engine'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='body_style'
                label='Body style'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='drivetrain'
                label='Drivetrain'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='vin'
                label='VIN'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
            <FormInput
                type='text'
                name='mileage'
                label='Mileage'
                onChange={handleChange}
                style={{margin: "20px 0"}}
                required
            />
        </fieldset>
    )
}

export default SpecFieldset