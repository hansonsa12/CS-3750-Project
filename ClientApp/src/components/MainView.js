import { Divider, makeStyles } from "@material-ui/core";
import React from "react";
import TopBar from "./TopBar/TopBar";

const useStyles = makeStyles((theme) => {
    return {
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        divider: {
            marginBottom: 15
        }
    };
});

export default function MainView(props) {
    const classes = useStyles();

    const {title, action, children} = props;

    return (
        <main className={classes.content}>
            <TopBar title={title} action={action} />
            <Divider className={classes.divider} />
            {children}
        </main>
    );
}
