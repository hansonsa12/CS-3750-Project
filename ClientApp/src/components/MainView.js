import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
            {props.children}
        </main>
    );
}
