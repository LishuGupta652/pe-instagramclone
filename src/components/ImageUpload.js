import React, {useState} from 'react'
import {Button } from '@material-ui/core';
import {storage , db } from '../firebase';
import firebase from 'firebase';
import './ImageUpload.css'

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const [rand, setRand] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    React.useEffect(() => {
        const randNumber = Math.floor(Math.random() * 5000 );
        setRand(rand);
    }, [])

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progress funciton
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                setProgress(progress)
            },
            (error) => {
                // Error Function
                console.log(error);
                alert(error.message);
            },
            () => {
                // On Complete Function
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // Post Image inside the DB
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username,
                        photo: `https://avatars.dicebear.com/api/human/${rand}.svg`
                    })

                    setProgress(0)
                    setCaption("")
                    setImage(null)
                })
            }
        )
    }

    return (
        <div className="imageUpload"> 
            <progress value={progress} max="100" />
            <input type='text' placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} value={caption} />
            <input type='file' onChange={handleChange} />
            <Button className='imageUpload_button' onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
