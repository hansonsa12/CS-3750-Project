import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import LoginForm from "./components/auth_components/LoginForm";
import SignUpForm from "./components/auth_components/SignUpForm";
import { AuthContext } from './context/AuthProvider';
import background from "./images/textbook.png";


const styles = theme => ({
    root: {
        width: "100%",
        backgroundImage: `url(${background})`,
        height: "100vh",
        /* Center and scale the image nicely */
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
});

class App extends Component {
    static contextType = AuthContext;

    render() {
        const { user } = this.context;
        const { classes } = this.props;

        return (
            <Switch>
                <Route exact path="/signup">
                    <SignUpForm className={classes.root} />
                </Route>

                <Route path="/">
                    {user ? <AppContainer /> : <LoginForm className={classes.root} />}
                </Route>

            </Switch>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
