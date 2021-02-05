import React, { Fragment } from "react";
import { Form as FForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUpForm(props) {
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

  return (
    <Fragment>
      <FForm onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="emailAddress" component="input" placeholder="Email" />
            <Field
              name="password"
              component="input"
              placeholder="Password"
              type="password"
            />
            <input type="password" placeholder="Confirm Password" />
            <Field
              name="firstName"
              component="input"
              placeholder="First Name"
            />
            <Field name="lastName" component="input" placeholder="Last Name" />
            <Field
              name="birthDate"
              component="input"
              placeholder="Date of Birth"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </FForm>
      <div>
        Already have an account? <Link to="login">Login</Link>
      </div>
    </Fragment>
  );
}
