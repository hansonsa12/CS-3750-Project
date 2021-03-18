import {
    Button,
    Grid,

    TextField, Typography
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PublicIcon from "@material-ui/icons/Public";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ProfileForm from "./ProfileForm";
import { ProfilePic } from './ProfilePic';


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
        user: { userId, firstName, lastName, email, birthDay, bio, profilePicName },
    } = useContext(AuthContext);

    return (
        <>
            <Grid>
                <ProfilePic style={{ width: 150, height: 150 }} />
                <Grid item>
                    <Typography variant="h6">
                        {firstName} {lastName}
                    </Typography>

                    <label>Bio:</label>
                    <br />
                    <textarea
                        style={{
                            height: "200px",
                            width: "500px",
                            backgroundColor: "transparent",
                        }}
                    >
                        {bio}
                    </textarea>
                    <br />
                    <Button variant="outlined" color="primary">
                        Update Bio
          </Button>
                    <div>
                        <br />
                        <br />
                        <br />
                    </div>

                    <Grid>
                        <Grid>
                            <TextField id="standard-name" label="Email: " value={email} />
                            <TextField id="standard-name" label="Phone: " value="PHONENUM" />
                            <TextField
                                id="standard-name"
                                label="Birthday: "
                                value={birthDay}
                            />
                        </Grid>
                        <div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <Grid>
                            <TextField
                                id="standard-name"
                                label="Address 1: "
                                value="ADDRESS"
                            />
                            <TextField
                                id="standard-name"
                                label="Address 2: "
                                value="ADDRESS"
                            />
                        </Grid>
                        <div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <Grid>
                            <TextField id="standard-name" label="City: " value="CITY" />
                            <TextField id="standard-name" label="State: " value="STATE" />
                            <TextField id="standard-name" label="Zip: " value="ZIPCODE" />
                        </Grid>
                    </Grid>

                    <div>
                        <br />
                        <br />
                        <br />
                    </div>

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
            <ProfileForm />
        </>
    );
}
