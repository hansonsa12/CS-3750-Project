import { Box, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import NotificationBadge from "./Notifications/NotificationBadge";

export default function TopBar({
    title = "",
    action,
    actionTooltip
}) {
    return (
        <Box display="flex">
            <Box>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Box>
            {action && (
                <Tooltip title={actionTooltip} placement="right">
                    <Box>{action}</Box>
                </Tooltip>
            )}
            <Box flexGrow={1} />
            <Box>
                <NotificationBadge />
            </Box>
        </Box>
    )
}
