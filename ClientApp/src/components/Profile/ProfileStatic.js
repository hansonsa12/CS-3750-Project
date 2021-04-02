import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ProfilePicUploader from "../FileUploading/ProfilePicUploader";

export default function ProfileStatic(props) {
    const {
        user: { email, birthDay, biography, phoneNumber, address, profileLinks }
    } = useContext(AuthContext);

    const { addressOne, addressTwo, city, state, zipCode } = address
        ? address
        : {};

    return (
        <Grid container justify="center" spacing={2} style={{ maxWidth: 1200 }}>
            <Grid item container xs={12} sm={4} justify="center">
                <ProfilePicUploader />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Contact</Typography>
                        <Typography variant="body1">{`Email: ${email}`}</Typography>
                        <Typography
                            variant="body1"
                            style={{ marginBottom: 10 }}
                        >{`Phone: ${
                            phoneNumber ? phoneNumber : ""
                        }`}</Typography>
                        <Typography variant="h6">Birthday</Typography>
                        <Typography variant="body1">
                            {dayjs(birthDay).format("MMM DD, YYYY")}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Biography</Typography>
                        <Typography variant="body1">
                            {biography
                                ? biography
                                : "No biography has been added."}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Links</Typography>
                        <Grid container spacing={1}>
                            {profileLinks.length > 0 ? (
                                profileLinks.map(link => (
                                    <Grid
                                        item
                                        key={`link-${link.profileLinkId}`}
                                    >
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                window.open(link.link)
                                            }
                                        >
                                            {link.title || link.link}
                                        </Button>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item>No Links have been added</Grid>
                            )}
                        </Grid>
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
