import {
    Button,
    CssBaseline,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import dayjs from "dayjs";
import _ from "lodash";
import {
    KeyboardDatePicker,
    makeValidate,
    Radios,
    showErrorOnBlur,
    TextField
} from "mui-rff";
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthProvider";

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        padding: 20,
        maxWidth: "450px",
        height: "100vh",
        marginRight: "auto"
    }
}));

export default function SignUpForm(props) {
    const textFields = ["firstName", "lastName", "email"].map(name => (
        <TextField
            name={name}
            label={_.startCase(name)}
            variant="outlined"
            required={true}
            showError={showErrorOnBlur}
        />
    ));

    const passwordFields = ["password", "confirmPassword"].map(name => (
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

        <Divider />,

        <KeyboardDatePicker
            name="birthDay"
            disableToolbar={false}
            variant="inline"
            format="MM/dd/yyyy"
            placeholder="mm/dd/yyyy"
            label="Birth Date"
            inputVariant="outlined"
            required={true}
            showError={showErrorOnBlur}
        />,

        ...passwordFields,

        <Radios
            variant="inline"
            name="accountType"
            data={[
                { label: "Student", value: "student" },
                { label: "Instructor", value: "instructor" }
            ]}
            radioGroupProps={{ row: true }}
        />
    ];

    const { signup } = useContext(AuthContext);

    const onSubmit = values => {
        signup(values);
    };

    const classes = useStyles();

    const initialValues = {
        accountType: "student"
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Please enter a valid email"),
        birthDay: Yup.mixed()
            .required("Birth date is required. ")
            .test(
                "birthDay",
                "Must be at least 16 years old to register",
                value => {
                    return dayjs().diff(dayjs(value), "year") >= 16;
                }
            ),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Passwords must match"
        )
    });

    const validate = makeValidate(validationSchema);

    return (
        <div className={props.className}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
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
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </FForm>
                    <Grid item style={{ marginTop: 10 }}>
                        Already have an account? <Link to="login">Login</Link>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
