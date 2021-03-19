import {
  Button,
  Grid,
  Typography,
  Avatar,
  TextField,
} from "@material-ui/core";

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ProfileForm from "./ProfileForm";

export default function Profile_Static(props) {


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
