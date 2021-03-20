import { Box, Typography } from "@material-ui/core";
import React from "react";
import NotificationBadge from "./Notifications/NotificationBadge";

export default function TopBar({
    title = "",
    action = []
}) {
    return (
        <Box display="flex">
            <Box>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Box>
            <Box>{action}</Box>
            <Box flexGrow={1} />
            <Box>
                <NotificationBadge />
            </Box>
        </Box>
    )
}
