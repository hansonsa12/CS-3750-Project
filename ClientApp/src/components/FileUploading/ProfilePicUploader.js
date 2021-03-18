import React, { useContext, useState } from 'react';
import { Avatar, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { ProfilePic } from '../Profile/ProfilePic';

export default function ProfilePicUploader() {
    // https://www.geeksforgeeks.org/file-uploading-in-react-js/
    const { user, authHeader, updateUser } = useContext(AuthContext);

    const uploadFile = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        axios.post("api/fileuploads/profilepic", formData, authHeader).then((res) => {
            const { data: { fileName } } = res;
            updateUser({ ...user, profilePicName: fileName });
        });
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item>
                {<ProfilePic style={{ width: 150, height: 150 }} />}
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
