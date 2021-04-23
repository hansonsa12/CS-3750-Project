import { Badge, IconButton } from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import React, { Component } from "react";
import NotificationList from "./NotificationList";

class NotificationBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [
                "Billy Jones submitted an assignment",
                "Alice Johson responded to your comment",
                "Fred Randall sent you a message"
            ],
            anchorEl: null
        };
    }

    componentDidMount() {
        // query for notifications
    }

    onOpen(e) {
        this.setState({ anchorEl: e.currentTarget });
    }

    onClose() {
        this.setState({ anchorEl: null });
    }

    render() {
        const { notifications, anchorEl } = this.state;

        return (
            <>
                <IconButton onClick={e => this.onOpen(e)}>
                    <Badge badgeContent={notifications.length} color="primary">
                        <Notifications />
                    </Badge>
                </IconButton>
                <NotificationList
                    popoverProps={{
                        open: Boolean(anchorEl),
                        keepMounted: true,
                        onClose: () => this.onClose(),
                        anchorEl
                    }}
                    notifications={notifications}
                />
            </>
        );
    }
}

export default NotificationBadge;
