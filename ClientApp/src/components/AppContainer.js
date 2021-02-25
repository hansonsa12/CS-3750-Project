import React, { Component } from "react";
import axios from 'axios';
import { authActions } from "../helpers/authActions";
import SideNavigation from "./SideNavigation";
import MainView from "./MainView";
import { withStyles, CssBaseline, CardContent, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const styles = theme => ({
    root: {
        display: 'flex'
    },
});

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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
                            <Card>
                                <CardContent>
                                    <Typography className={classes.title} variant="h5" color="textPrimary" gutterBottom>
                                        CS3550 Advanced Database Programming
                                    </Typography>
                                    <Typography>
                                        Instructor Name
                                    </Typography>
                                    <Typography>
                                        CA 141
                                    </Typography>
                                    <Typography>
                                        Meeting Time
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br></br>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} variant="h5" color="textPrimary" gutterBottom>
                                        CS3750 Software Engineering II
                                    </Typography>
                                    <Typography>
                                        Instructor Name
                                    </Typography>
                                    <Typography>
                                        CA 155
                                    </Typography>
                                    <Typography>
                                        Meeting Time
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br></br>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} variant="h5" color="textPrimary" gutterBottom>
                                        CS3540 Database Administration
                                    </Typography>
                                    <Typography>
                                        Instructor Name
                                    </Typography>
                                    <Typography>
                                        CA 175
                                    </Typography>
                                    <Typography>
                                        Meeting Time
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br></br>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} variant="h5" color="textPrimary" gutterBottom>
                                        CS3230 Object Oriented User Interface Development with Java
                                    </Typography>
                                    <Typography>
                                        Instructor Name
                                    </Typography>
                                    <Typography>
                                        CA 240
                                    </Typography>
                                    <Typography>
                                        Meeting Time
                                    </Typography>
                                </CardContent>
                            </Card>
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
