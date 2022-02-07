import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import firebase, {storage, updateUserEditorData} from "../../firebase/firebase.utils";
import {setCurrentUser} from "../../redux/user/user.actions";

import classes from "./edit-account-form.module.css";

const userPhoto = 'https://firebasestorage.googleapis.com/v0/b/auto-bids.appspot.com/o/empty_user.jpg?alt=media&token=0148c2c3-1bc7-4315-97ad-02a36e0a517c';


const EditAccountForm = ({closePopup}) => {
    const dispatch = useDispatch();
    const {avatar, bio, uid} = useSelector(state => state.user.currentUser);
    const [userAvatar, setUserAvatar] = useState(userPhoto);

    useEffect(() => {
        if (avatar !== '') {
            setUserAvatar(avatar);
        }
    }, []);

    useEffect(() => {
        setValue('avatar', userAvatar);
    }, [userAvatar])

    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm({
        defaultValues: {
            avatar: userAvatar,
            bio: bio
        }
    });

    const onSubmit = async (data) => {
        let newUserData = await updateUserEditorData(uid, data);
        newUserData.uid = uid;
        dispatch(setCurrentUser(newUserData));
        reset();
        closePopup();
    }

    const handlePhotoChange = event => {
        event.preventDefault();
        const file = event.target.files[0];
        const uploadTask = storage.ref().child(`users/${uid}/${file.name}`).put(file);
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
                setUserAvatar(downloadURL);
                setValue('avatar', downloadURL)
            }
        );
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.editForm}>
            <div className={classes.editPhoto}>
                <div className={classes.preview}>
                    <img src={userAvatar} alt="user avatar preview"/>
                </div>
                <label
                    htmlFor="newFile"
                    className="btn btn-secondary"
                >Choose a profile photo
                    <input id="newFile" type="file" accept="image/*" onChange={handlePhotoChange}/>
                    <input id="avatar" type="file" accept="image/*" {...register("avatar")}/>
                </label>
            </div>
            <fieldset>
                <label htmlFor="bio">Bio</label>
                <textarea rows={4} {...register("bio")}/>
            </fieldset>
            <button type="submit" className="btn">Save</button>
        </form>
    )
}

export default EditAccountForm;