import React from "react";
import { Form as FForm } from "react-final-form";
import {
    KeyboardDatePicker,
    makeValidate,
    Radios,
    TextField,
    showErrorOnBlur,
} from "mui-rff";
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
import * as Yup from "yup";
import dayjs from "dayjs";
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
    const textFields = ["userName"].map(name => (
        <TextField
            name={name}
            label={_.startCase(name)}
            variant="outlined"
            required={true}
            showError={showErrorOnBlur}
        />
    ));

    const passwordFields = ["password"].map(name => (
        <TextField
            name={name}
            label={_.startCase(name)}
            variant="outlined"
            type="password"
            required={true}
            showError={showErrorOnBlur}
        />
    ));

    const formFields = [
        ...textFields,
        ...passwordFields,
    ];

    const onSubmit = values => {
        console.log(JSON.stringify(_.omit(values, "confirmPassword")));
        window.alert("ToDo: Send user info to sign up route");
    };

    const classes = useStyles();

    const initialValues = {
        accountType: "student",
    };

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("User name is required"),
        password: Yup.string().required("Password is required"),

    });

    const validate = makeValidate(validationSchema);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Typography variant="h3">Login</Typography>
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
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </FForm>
                    <Grid item style={{ marginTop: 10 }}>
                        Don't have an account? <Link to="signup">Sign Up</Link>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
