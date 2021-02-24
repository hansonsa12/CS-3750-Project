import React from "react";
import { Grid, Typography } from "@material-ui/core";
import NotificationBadge from "./Notifications/NotificationBadge";

export default function TopBar({
    title = ""
}) {
    return (
        <div>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <NotificationBadge />
                </Grid>
            </Grid>
        </div >
    )
}
