import React from "react";
import { Container, Divider, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
    return {
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    };
});

export default function MiniDrawer(props) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Grid container justify="space-between">
                <Typography variant="h4">
                    {props.title}
                </Typography>
                <IconButton>
                    <Notifications />
                </IconButton>
            </Grid>
            <Divider />
            {props.children}
        </main>
    );
}
