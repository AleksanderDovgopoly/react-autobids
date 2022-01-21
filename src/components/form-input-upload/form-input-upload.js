import {useEffect, useState} from "react";
import CustomButton from "../custom-button/custom-button";
import firebase, {storage} from "../../firebase/firebase.utils";

const InputUploadPhoto = ({setFormData, auctionId}) => {
    const [files, setFiles] = useState([]);
    const [uploadedPhoto, setUploadedPhoto] = useState([]);

    useEffect(() => {
        setFormData('photos', uploadedPhoto);
    }, [uploadedPhoto, setFormData])

    const handlePhotoChange = event => {
        for (let i = 0; i < event.target.files.length; i++) {
            const newFile = event.target.files[i];
            newFile["id"] = Math.random();
            // add an "id" property to each File object
            setFiles(prevState => [...prevState, newFile]);
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
        <>
            <label>Upload photos
                <input type='file' accept=".png, .jpg, .jpeg" name='photos' onChange={handlePhotoChange} required multiple/>
            </label>
            <CustomButton onClick={onUploadSubmission}>Upload files</CustomButton>
        </>
    )
}

export default InputUploadPhoto;