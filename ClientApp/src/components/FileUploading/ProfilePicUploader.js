import React, { useContext, useState } from 'react';
import { Avatar, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';

export default function ProfilePicUploader() {
    // https://www.geeksforgeeks.org/file-uploading-in-react-js/
    const { user, authHeader, updateUser } = useContext(AuthContext);

    const getFileUrl = () => {
        // user? makes sure user is not null before accessing profilePicName.
        // if it is null, user.profilePicName will throw an error without the ?
        // this is referred to as "optional chaining". (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
        return (user?.profilePicName) ? `/uploads/u${user.userId}/${user.profilePicName}` : null;
    };

    const [fileUrl, setFileUrl] = useState(getFileUrl());

    const uploadFile = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        axios.post("api/fileuploads/profilepic", formData, authHeader).then((res) => {
            const { data: { filePath, fileName } } = res;
            setFileUrl(filePath);
            updateUser({ ...user, profilePicName: fileName });
        });
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item>
                {<Avatar src={fileUrl} style={{ width: 150, height: 150 }} />}
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" component="label">
                    Upload
                <input accept={"image/*"} type="file" onChange={uploadFile} hidden />
                </Button>
            </Grid>
        </Grid>
    )
}