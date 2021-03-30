import { CssBaseline, IconButton, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Calendar from "./Calendar";
import CourseDetails from "./Courses/CourseDetails/CourseDetails";
import CourseForm from "./Courses/CourseForm";
import Courses from "./Courses/Courses";
import Dashboard from "./Dashboard/Dashboard";
import MainView from "./MainView";
import ProfileForm from "./Profile/ProfileForm";
import Profile from "./Profile/ProfileStatic";
import Registrations from "./Registrations";
import SideNavigation from "./SideNavigation";
import Tuition from "./Tuition/Tuition";

const styles = theme => ({
    root: {
        display: "flex",
    },
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
            axios
                .get("api/courses", authHeader)
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
        const { isInstructor, isStudent, user } = this.context;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideNavigation />

                <Switch>
                    <Route exact path="/profile">
                        <MainView
                            title={`${user.firstName} ${user.lastName}`}
                            action={<ProfileForm />}
                        >
                            <Profile />
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

                    {isInstructor && (
                        <Route exact path="/courses">
                            <MainView
                                title="Courses"
                                action={
                                    <CourseForm>
                                        <IconButton>
                                            <Add />
                                        </IconButton>
                                    </CourseForm>
                                }
                            >
                                <Courses />
                            </MainView>
                        </Route>
                    )}

                    <Route exact path="/courses/:id/details">
                        <CourseDetails />
                    </Route>

                    {isStudent && (
                        <Route exact path="/registrations">
                            <MainView title="Registrations">
                                <Registrations />
                            </MainView>
                        </Route>
                    )}

                    {isStudent && (
                        <Route exact path="/tuition">
                            <MainView title="Tuition">
                                <Tuition />
                            </MainView>
                        </Route>
                    )}

                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppContainer);
