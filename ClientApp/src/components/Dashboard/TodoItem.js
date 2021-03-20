import {
    Avatar,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import { Assignment, Close } from '@material-ui/icons';
import React from 'react';

export default function TodoItem({
    assignment
}) {
    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar>
                    <Assignment />
                </Avatar>
            </ListItemAvatar>
            <div>
                <ListItemText primary={assignment[0]} />
                <Link href="#Assignment" color="primary">
                    {assignment[1]}
                </Link>

                <ListItemText primary={assignment[2]} />
            </div>
            <IconButton edge="end" aria-label="close">
                <Close />
            </IconButton>
        </ListItem>
    )
}
