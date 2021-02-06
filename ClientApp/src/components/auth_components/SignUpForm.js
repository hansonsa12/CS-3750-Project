import React, { Fragment } from "react";
import { Form as FForm, Field } from "react-final-form";
import { KeyboardDatePicker, makeValidate, Radios, TextField } from "mui-rff";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Paper,
  Grid,
  makeStyles,
  CssBaseline,
  Typography,
  RadioGroup,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from "lodash";
import * as Yup from "yup";
import axios from "axios";

import background from "../../images/textbooks.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundImage: `url(${background})`,
    height: "100vh",
    /* Center and scale the image nicely */
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    padding: 20,
    maxWidth: "450px",
    height: "100vh",
    marginRight: "auto",
  },
}));

export default function SignUpForm(props) {
  const textFields = ["firstName", "lastName", "email"].map(name => (
    <TextField
      name={name}
      label={_.startCase(name)}
      variant="outlined"
      required={true}
    />
  ));

  const passwordFields = ["password", "confirmPassword"].map(name => (
    <TextField
      name={name}
      label={_.startCase(name)}
      variant="outlined"
      type="password"
      required={true}
    />
  ));

  const formFields = [
    ...textFields,

    <KeyboardDatePicker
      name="birthDay"
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      dateFunsUtils={DateFnsUtils}
      placeholder="mm/dd/yyyy"
      label="Birth Date"
      inputVariant="outlined"
      required={true}
    />,

    ...passwordFields,

    <Radios
      variant="inline"
      name="accountType"
      data={[
        { label: "Student", value: "student" },
        { label: "Instructor", value: "instructor" },
      ]}
      radioGroupProps={{ row: true }}
    />,
  ];

  const onSubmit = values => {
    console.log(JSON.stringify(values));
    window.alert("ToDo: Send user info to sign up route");
    // axios
    //   .post("/auth/signup", values)
    //   .then(res => {
    //     localStorage["authToken"] = res.data.token;
    //     window.location = "/";
    //   })
    //   .catch(err => {
    //     alert(err.message);
    //     console.error(err.message);
    //   });
  };

  const classes = useStyles();

  const initialValues = {
    accountType: "student",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email"),
    // birthDate: Yup.date().required("Please enter your birthday"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const validate = makeValidate(validationSchema);

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
          <FForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
          >
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
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
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
