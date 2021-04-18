import {
    Avatar,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import { Assignment, Close } from "@material-ui/icons";
import React from "react";

export default function TodoItem({ assignment, onDelete }) {
    const { courseNumber, title, dueDate } = assignment;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Assignment />
                </Avatar>
            </ListItemAvatar>
            <div>
                <Link
                    href={`/courses/${assignment.courseId}/details`}
                    color="primary"
                >
                    {assignment?.courseNumber}
                </Link>
                <br></br>
                <Link
                    href={`/courses/${assignment?.courseId}/assignments/${assignment?.courseId}/details`}
                    color="primary"
                >
                    {title}
                </Link>

                <ListItemText primary={dueDate} />
            </div>
            <IconButton
                onClick={() => onDelete(assignment.assignmentId)}
                edge="end"
                aria-label="close"
            >
                <Close />
            </IconButton>
        </ListItem>
    );
}
