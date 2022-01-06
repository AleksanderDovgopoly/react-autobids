import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import firebase, {createNewAuctionDocument, storage} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import classes from "./sell-car-form.module.css";


const SellCarForm = () => {

    const currentUser = useSelector(state => state.user.currentUser);
    const [auctionId, setAuctionId] = useState('');
    const [files, setFiles] = useState([]);
    const [uploadedPhoto, setUploadedPhoto] = useState([]);
    const [newAuctionData, setNewAuctionData] = useState({
        id: '',
        title: '',
        short_description: '',
        start_price: 0,
        geo: '',
        photos: [],
    });

    useEffect(() => {
        setNewAuctionData({...newAuctionData, photos: uploadedPhoto});
    }, [uploadedPhoto]);

    const {title, short_description, start_price, geo} = newAuctionData;

    if (auctionId === '') {
        const date = Date.now();
        let newId = currentUser.uid + '-' + date;
        setAuctionId(newId);
        setNewAuctionData({...newAuctionData, id: newId})
    }

    // console.log('Current auction data: ', newAuctionData);
    // console.log(uploadedPhoto)


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


    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await createNewAuctionDocument(newAuctionData);

            setNewAuctionData({
                id: '',
                title: '',
                short_description: '',
                start_price: 0,
                geo: '',
                photos: [],
            })

        } catch (error) {
            console.log(error)
        }

    };


    const onUploadSubmission = e => {
        e.preventDefault();

        const promises = [];
        files.forEach(file => {
            const uploadTask =
                storage.ref().child(`${auctionId}/${file.name}`).put(file);
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
                handleChange={handlePhotoChange}
                label='Upload photos'
                required
                multiple
            />
            <CustomButton onClick={onUploadSubmission}>Upload files</CustomButton>
            <CustomButton type='submit' onClick={handleSubmit}> Submit </CustomButton>
        </form>
    )
}

export default SellCarForm;
