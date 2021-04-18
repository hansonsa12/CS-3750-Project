import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import { Assignment, Close } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { getFormattedDateTime } from "../../helpers/helpers";

export default function TodoItem({ assignment, onDelete }) {
    const { courseNumber, courseId, assignmentId, title, dueDate } = assignment;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Assignment />
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Link to={`courses/${courseId}/details`}>{courseNumber}</Link>
                <br />
                <Link
                    to={`courses/${courseId}/assignments/${assignmentId}/details`}
                >
                    {title}
                </Link>
                <Typography variant="body1">
                    {getFormattedDateTime(dueDate)}
                </Typography>
            </ListItemText>
            <IconButton
                onClick={() => onDelete(assignmentId)}
                edge="end"
                aria-label="close"
            >
                <Close />
            </IconButton>
        </ListItem>
    );
}
