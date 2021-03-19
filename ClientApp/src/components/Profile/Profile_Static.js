import {
  Button,
  FormLabel,
  Grid,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import React, { Component, useContext } from "react";
import _ from "lodash";
import Create from "@material-ui/icons/Create";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PublicIcon from "@material-ui/icons/Public";
import { SettingsPowerRounded } from "@material-ui/icons";
import { Form as FForm } from "react-final-form";
import { KeyboardTimePicker, Checkboxes, showErrorOnBlur } from "mui-rff";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthProvider";
import ProfileForm from "./ProfileForm";

export default function Profile_Static(props) {


  const EditButton = () => (
    <IconButton>
      <Create />
    </IconButton>
  );

  const GitHubButton = () => (
    <IconButton>
      <GitHubIcon />
    </IconButton>
  );

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
    user: { firstName, lastName, email, birthDay, bio },
  } = useContext(AuthContext);

  return (
    <>
      <Grid>
        <div>
          <Avatar
            alt="Profile picture. This person looks Sharp!"
            src="C:\Users\Kronos\Documents\Programming\Web\React\CS-3750-Project\ClientApp\src\images\Profile_Pic.png"
          />
          <ProfileForm />
        </div>
        

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
            onClick={btnGithubClick}
          >
            GitHub
          </Button>
          <Button
            variant="contained"
            onClick={btnLinkedInClick}
          >
            LinkedIn
          </Button>
          <Button
            variant="contained"
            onClick={btnOtherClick}
          >
            Other
          </Button>
        </Grid>
      </Grid>
      
    </>
  );
}
