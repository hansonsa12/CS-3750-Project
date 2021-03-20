import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PublicIcon from "@material-ui/icons/Public";
import dayjs from 'dayjs';
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ProfilePicUploader from '../FileUploading/ProfilePicUploader';
import { SectionHeaderItem } from '../FormComponents';

export default function ProfileStatic(props) {

    function btnGithubClick(e) {
        window.open("https://www.github.com");
    }

    function btnLinkedInClick(e) {
        window.open("https://www.linkedin.com");
    }
    function btnOtherClick(e) {
        window.open("https://www.google.com");
    }

    const {
        user: {
            email,
            birthDay,
            bio,
            phoneNumber,
            address,
            profileLinks
        },
    } = useContext(AuthContext);

    const { addressOne, addressTwo, city, state, zipCode } = address ? address : {};

    return (
        <Grid container justify="flex-start" spacing={2} style={{ width: 600 }}>
            <Grid item xs={12} sm={4}>
                <ProfilePicUploader />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Contact</Typography>
                        <Typography variant="body1">{`Email: ${email}`}</Typography>
                        <Typography variant="body1" style={{ marginBottom: 10 }}>{`Phone: ${phoneNumber}`}</Typography>
                        <Typography variant="h6">Birthday</Typography>
                        <Typography variant="body1">{dayjs(birthDay).format("MMM DD, YYYY")}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Biography</Typography>
                        <Typography variant="body1">{bio ? bio : "No biography has been added."}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Links</Typography>
                        {profileLinks.length > 0 ? profileLinks.map(link => (
                            <Typography variant="body1">{bio}</Typography>
                        )) : "No Links have been added"}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Address</Typography>
                        <Typography variant="body1">{addressOne}</Typography>
                        <Typography variant="body1">{addressTwo}</Typography>
                        <Typography variant="body1">{city}</Typography>
                        <Typography variant="body1">{state}</Typography>
                        <Typography variant="body1">{zipCode}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
