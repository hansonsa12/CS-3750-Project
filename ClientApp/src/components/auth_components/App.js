import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import AppContainer from "./AppContainer";
import { Component } from "react";
import axios from "axios";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true,
    };

    if (localStorage["authToken"]) {
      this.getUser();
    } else {
      this.state.loading = false;
    }
  }

  getUser() {
    axios
      .get("user", {
        headers: {
          Authorization: `Bearer ${localStorage["authToken"]}`,
        },
      })
      .then(
        res => {
          this.setState({ user: res.data, loading: false });
        },
        err => {
          console.error(err.message);
        }
      );
  }

  render() {
    const { loading, user } = this.state;
    return (
      !loading && (
        <Router>
          <Switch>
            <Route exact path="/signup">
              <SignUpForm />
            </Route>

            <Route path="/">
              {user ? <AppContainer user={user} /> : <LoginForm />}
            </Route>
          </Switch>
        </Router>
      )
    );
  }
}
