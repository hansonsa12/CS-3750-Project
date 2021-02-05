import React from "react";
import { Form as FForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const onSubmit = values => {
    axios
      .post("/auth/login", values)
      .then(res => {
        const token = res.data.token;
        if (token) {
          localStorage["authToken"] = res.data.token;
          window.location = "/";
        }
      })
      .catch(err => {
        window.alert(err.message);
        console.error(err.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
            <button type="submit">Submit</button>
          </form>
        )}
      </FForm>
      <div>
        Don't have an account? <Link to="signup">Sign Up</Link>
      </div>
    </div>
  );
}
