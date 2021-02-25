import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/auth_components/LoginForm";
import SignUpForm from "./components/auth_components/SignUpForm";
//import Calendar from "./components/Calendar";
import AppContainer from "./components/AppContainer";
import React, { Component } from "react";
import background from "./images/textbook.png";
import { withStyles } from "@material-ui/core";

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
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage['user'],
            loading: false,
        };
    }

    render() {
        const { loading, user } = this.state;
        const { classes } = this.props;

        return (
            !loading && (
                <Router>
                    <Switch>
                        <Route exact path="/signup">
                            <SignUpForm className={classes.root} />
                        </Route>

                        <Route path="/">
                            {user ? <AppContainer user={user} /> :
                                <LoginForm className={classes.root} />
                            }
                        </Route>
                    </Switch>
                </Router>
            )
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
