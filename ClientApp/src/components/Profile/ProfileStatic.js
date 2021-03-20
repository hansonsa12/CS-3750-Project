import {
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PublicIcon from "@material-ui/icons/Public";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ProfilePicUploader from '../FileUploading/ProfilePicUploader';

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
            address        
        },
    } = useContext(AuthContext);

    const { addressOne, addressTwo, city, state, zipCode } = address ? address : {};

    return (
        <>
            <Grid container justify="flex-start">
                <Grid item>
                    <ProfilePicUploader />
                </Grid>
                <Grid item>
                    <label>Bio:</label>
                    <textarea
                        style={{
                            height: "200px",
                            width: "500px",
                            backgroundColor: "transparent",
                        }}
                    >
                        {bio}
                    </textarea>
                </Grid>
                <Grid item>
                    <br />
                    <Button variant="outlined" color="primary">
                        Update Bio
                    </Button>
                    <Grid>
                        <Grid>
                            {/* TODO change text fiels to lables  */}
                            <TextField label="Email: " value={email} />
                            <TextField label="Phone: " value={phoneNumber} />
                            <TextField label="Birthday: " value={birthDay}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                
                                label="Address 1: "
                                value={addressOne}
                            />
                            <TextField
                                
                                label="Address 2: "
                                value={addressTwo}
                            />
                        </Grid>
                        <Grid>
                            <TextField  label="City: " value={city} />
                            <TextField  label="State: " value={state} />
                            <TextField  label="Zip: " value={zipCode} />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        onClick={btnGithubClick}
                    >
                        GitHub
          </Button>
                    <Button
                        variant="contained"
                        startIcon={<LinkedInIcon />}
                        onClick={btnLinkedInClick}
                    >
                        LinkedIn
          </Button>
                    <Button
                        variant="contained"
                        startIcon={<PublicIcon />}
                        onClick={btnOtherClick}
                    >
                        Other
          </Button>
                </Grid>
            </Grid>
        </>
    );
}
