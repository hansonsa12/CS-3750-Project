import React, { Component } from "react";
import SideNavigation from "./SideNavigation";
import MainView from "./MainView";
import Calendar from "./Calendar";
import { withStyles, CssBaseline, CardContent, Typography } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import Courses from './Courses';
import Registrations from './Registrations';
import Profile from './Profile_Static';
import Dashboard from './Dashboard/Dashboard';

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

class AppContainer extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideNavigation />
             
                <Switch>
                    <Route exact path="/profile">
                        <MainView title="Profile">
                            <Profile></Profile>
                        </MainView>
                    </Route>
                    <Route exact path="/dashboard">
                        <MainView title="Dashboard">
                            <Dashboard />
                        </MainView>
                    </Route>
                    <Route exact path="/calendar">
                        <MainView title="Calendar">
                            <Calendar className={classes.root} />
                        </MainView>
                    </Route>

                    <Route exact path="/courses">
                        <MainView title="Courses">
                            <Courses />
                        </MainView>
                    </Route>

                    <Route exact path="/registrations">
                        <MainView title="Registrations">
                            <Registrations />
                        </MainView>
                    </Route>

                    <Redirect to="/dashboard" />
                </Switch>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppContainer);
