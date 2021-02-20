import React, { Component } from "react";
import axios from 'axios';
import { authActions } from "../helpers/authActions";
import SideNavigation from "./SideNavigation";
import MainView from "./MainView";
import { withStyles, CssBaseline } from "@material-ui/core";

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
                <MainView>
                    <h1>Welcome, {`${user?.firstName} ${user?.lastName}`}!</h1>
                </MainView>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppContainer);
