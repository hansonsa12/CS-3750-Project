import React from "react";
import { Divider, makeStyles } from "@material-ui/core";
import TopBar from "./TopBar/TopBar";

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
            <TopBar title={props.title} />
            <Divider />
            {props.children}
        </main>
    );
}
