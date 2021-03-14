import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
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
        const body = {
            attachableId: user.id,
            attachableType: "User",
            file: selectedFile
        };
        axios.post("api/fileuploads", body, authHeader);
    };


    return (
        <div>
            <pre>{selectedFile?.name}</pre>
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
