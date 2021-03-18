import React, { Component } from "react";
import SideNavigation from "./SideNavigation";
import MainView from "./MainView";
import Calendar from "./Calendar";
import { withStyles, CssBaseline, CardContent, Typography } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import Courses from './Courses/Courses';
import Registrations from './Registrations';
import Profile from './Profile/ProfileStatic';
import Dashboard from './Dashboard/Dashboard';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

class AppContainer extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            courses: undefined,
            registrations: undefined,
        };
    }

    componentDidMount() {
        const { isInstructor, authHeader } = this.context;
        if (isInstructor) {
            axios.get('api/courses', authHeader)
                .then(res => {
                    this.setState({ courses: res.data });
                })
                .catch(err => {
                    alert(err);
                    console.error(err);
                });
        }
    }

    render() {
        const { classes } = this.props;
        const { courses, registrations } = this.state;
        const { isInstructor } = this.context;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideNavigation />

                <Switch>
                    <Route exact path="/profile">
                        <MainView title="Profile">
                            <Profile />
                        </MainView>
                    </Route>
                    <Route exact path="/dashboard">
                        <MainView title="Dashboard">
                            <Dashboard courses={isInstructor ? courses : registrations} />
                        </MainView>
                    </Route>
                    <Route exact path="/calendar">
                        <MainView title="Calendar">
                            <Calendar className={classes.root} />
                        </MainView>
                    </Route>

                    <Route exact path="/courses">
                        <MainView title="Courses">
                            <Courses courses={courses} />
                        </MainView>
                    </Route>

                    <Route exact path="/registrations">
                        <MainView title="Registrations">
                            <Registrations registrations={registrations} />
                        </MainView>
                    </Route>

                    <Redirect to="/dashboard" />
                </Switch>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppContainer);
