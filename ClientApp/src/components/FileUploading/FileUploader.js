import React, { useContext, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';

export default function FileUploader() {
    // https://www.geeksforgeeks.org/file-uploading-in-react-js/
    const { user, authHeader } = useContext(AuthContext);

    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onFileUpload = (e) => {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        axios.post("api/fileuploads/profilepic", formData, authHeader).then(() => {
            window.location.reload();
        });
    };


    return (
        <div>
            {user.profilePicName && <Avatar src={`/uploads/u${user.userId}/${user.profilePicName}`} 
                style={{ width: 200, height: 200 }}/>}
            <Button variant="contained" color="primary" component="label">
                SelectFile
                <input accept="image/*" type="file" onChange={onFileChange} hidden />
            </Button>

            <Button onClick={onFileUpload}>
                UploadFile
            </Button>
        </div>
    )
}
