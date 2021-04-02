import {
    Divider,
    IconButton,
    makeStyles,
    Popover,
    Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { Fragment } from "react";

const useStyles = makeStyles(theme => ({
    title: {
        margin: "5px 0px 5px 10px"
    }
}));

export default function NotificationList({ popoverProps, notifications = [] }) {
    const classes = useStyles();

    return (
        <Popover
            {...popoverProps}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
        >
            <Typography variant="h6" className={classes.title}>
                Notifications
            </Typography>
            <Divider />
            {notifications.map((notification, index) => (
                <Fragment key={`notification-${index}`}>
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        style={{ backgroundColor: "white" }}
                    >
                        {notification}
                    </Alert>
                    <Divider />
                </Fragment>
            ))}
        </Popover>
    );
}
