import {
    Avatar,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import { Assignment, Close } from "@material-ui/icons";
import React from "react";

export default function TodoItem({ assignment }) {
    const { courseNumber, title, dueDate } = assignment;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Assignment />
                </Avatar>
            </ListItemAvatar>
            <div>
                <ListItemText primary={assignment?.courseNumber} />
                <Link href="#Assignment" color="primary">
                    {title}
                </Link>

                <ListItemText primary={dueDate} />
            </div>
            <IconButton edge="end" aria-label="close">
                <Close />
            </IconButton>
        </ListItem>
    );
}
