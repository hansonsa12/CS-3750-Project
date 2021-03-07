import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function TodoItem({
    assignment
}) {
    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar>
                    <AssignmentIcon />
                </Avatar>
            </ListItemAvatar>
            <div>
                <ListItemText primary={assignment[0]} />
                <Link href="#Assignment" color="blue">
                    {assignment[1]}
                </Link>

                <ListItemText primary={assignment[2]} />
            </div>
            <IconButton edge="end" aria-label="close">
                <CloseIcon />
            </IconButton>
        </ListItem>
    )
}
