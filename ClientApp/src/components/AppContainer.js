import React, { Component } from "react";
import axios from 'axios';
import { authActions } from "../helpers/authActions";
import SideNavigation from "./SideNavigation";
import MainView from "./MainView";
import { withStyles, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex'
    },
});

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const user = JSON.parse(localStorage["user"]);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideNavigation />
                <Switch>
                    <Route exact path="/profile">
                        <MainView title={`Profile`}>
                        </MainView>
                    </Route>
                    <Route exact path="/dashboard">
                        <MainView title={`Dashboard`}>
                        </MainView>
                    </Route>
                    <Route exact path="/calendar">
                        <MainView title={`Calendar`}>
                        </MainView>
                    </Route>

                    <Redirect to="/dashboard" />
                </Switch>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppContainer);
