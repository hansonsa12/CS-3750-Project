import {
    Button,
    CssBaseline,
    Grid,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import _ from "lodash";
import { makeValidate, showErrorOnBlur, TextField } from "mui-rff";
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
    const textFields = ["email"].map(name => (
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

    const formFields = [...textFields, ...passwordFields];

    const { login } = useContext(AuthContext);

    const onSubmit = values => {
        login(values);
    };

    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Please enter a valid email"),
        password: Yup.string().required("Password is required")
    });

    const validate = makeValidate(validationSchema);

    return (
        <div className={props.className}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Typography variant="h3">Login</Typography>
                    </Grid>
                    <FForm onSubmit={onSubmit} validate={validate}>
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
