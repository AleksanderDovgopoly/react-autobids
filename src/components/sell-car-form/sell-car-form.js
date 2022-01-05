import FormInput from "../form-input/form-input";

import classes from "./sell-car-form.module.css";
import {useState} from "react";
import CustomButton from "../custom-button/custom-button";
import firebase, {storage} from "../../firebase/firebase.utils";


const SellCarForm = () => {

    const [files, setFiles] = useState([]);
    const [uploadedPhoto, setUploadedPhoto] = useState([]);
    const [newAuctionData, setNewAuctionData] = useState({
        title: '',
        short_description: '',
        start_price: '',
        geo: '',
        photos: [],
    });

    console.log('Current auction data: ', newAuctionData);
    console.log(uploadedPhoto)

    const {title, short_description, start_price, geo, photos} = newAuctionData;


    const handleChange = event => {
        const {name, value} = event.target;
        setNewAuctionData({...newAuctionData, [name]: value})
    }

    const handlePhotoChange = event => {
        for (let i = 0; i < event.target.files.length; i++) {
            const newFile = event.target.files[i];
            newFile["id"] = Math.random();
            // add an "id" property to each File object
            setFiles(prevState => [...prevState, newFile]);
        }
    };

    //console.log(uploadedPhoto)


    const onUploadSubmission = e => {
        e.preventDefault();

        const promises = [];
        files.forEach(file => {
            const uploadTask =
                storage.ref().child(`testFolder/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                error => console.log(error.code),
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    setUploadedPhoto(prevState => [...prevState, downloadURL]);
                }
            );
        });
        Promise.all(promises)
            .then(() => {
                alert('All files uploaded')
            })
            .catch(err => console.log(err.code));
    }


    return (
        <form className={classes.form}>
            <FormInput
                type='text'
                name='title'
                value={title}
                handleChange={handleChange}
                label='Car full name'
                required
            />
            <FormInput
                type='text'
                name='short_description'
                value={short_description}
                handleChange={handleChange}
                label='Short description'
                required
            />
            <FormInput
                type='number'
                name='start_price'
                value={start_price}
                handleChange={handleChange}
                label='Start price, $'
                required
            />
            <FormInput
                type='text'
                name='geo'
                value={geo}
                handleChange={handleChange}
                label='Location'
                required
            />
            <FormInput
                type='file'
                accept=".png, .jpg, .jpeg"
                name='photos'
                value={photos}
                handleChange={handlePhotoChange}
                label='Upload photos'
                required
                multiple
            />
            <CustomButton onClick={onUploadSubmission}>Upload files</CustomButton>
        </form>
    )
}

export default SellCarForm;
