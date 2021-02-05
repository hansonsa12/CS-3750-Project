import React, { Fragment } from "react";
import { Form as FForm, Field } from "react-final-form";
import { KeyboardDatePicker, TextField } from "mui-rff";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Paper,
  Grid,
  makeStyles,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

import background from "../../images/textbooks.jpg";

export default function SignUpForm(props) {
  const textFields = ["firstName", "lastName", "email"].map(name => (
    <TextField name={name} label={_.startCase(name)} variant="outlined" />
  ));

  const passwordFields = ["password", "confirmPassword"].map(name => (
    <TextField
      name={name}
      label={_.startCase(name)}
      variant="outlined"
      type="password"
    />
  ));

  const formFields = [
    ...textFields,
    ...passwordFields,

    <KeyboardDatePicker
      name="birthDate"
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      dateFunsUtils={DateFnsUtils}
      placeholder="mm/dd/yyyy"
      label="Birth Date"
      inputVariant="outlined"
    />,
  ];

  const onSubmit = values => {
    axios
      .post("/auth/signup", values)
      .then(res => {
        localStorage["authToken"] = res.data.token;
        window.location = "/";
      })
      .catch(err => {
        alert(err.message);
        console.error(err.message);
      });
  };

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      backgroundImage: `url(${background})`,
      height: "100%",
      /* Full height */
      height: "100%",

      /* Center and scale the image nicely */
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      padding: 20,
      maxWidth: "450px",
      height: "100vh",
      marginRight: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
          justify="center"
          direction="row"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h3">Sign Up</Typography>
          </Grid>
          <FForm onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  direction="row"
                  alignItems="center"
                >
                  {formFields.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      {item}
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </FForm>
          <Grid item>
            Already have an account? <Link to="login">Login</Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
